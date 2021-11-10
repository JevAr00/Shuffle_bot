const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')
const {
    AudioPlayerStatus,
    StreamType,
    NoSubscriberBehavior,
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
} = require('@discordjs/voice');

const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['p'],
    async execute(client, message, command, args) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply({ content: 'Parece que no estas dentro de un canal de voz al que pueda unirme', ephemeral: true });

        const server_queue = queue.get(message.guild.id);

        let song = {};

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });

        if (ytdl.validateURL(args[0])) {
            const video = await ytdl.getInfo(args[0]);
            song = { title: video.videoDetails.title, url: video.videoDetails.video_url }
        } else {
            const search = async (query) => {
                const videoSearch = await ytSearch(query);
                return (videoSearch.videos.length > 1) ? videoSearch.videos[0] : null;
            }

            const video = await search(args.join(' '));
            if (video) {
                song = { title: video.title, url: video.url }
            } else {
                await message.reply({ content: 'Parece que ha ocurrido algo. Vuelve a intentarlo.', ephemeral: true });
            }
        }

        try {
            const stream = ytdl(song.url, { filter: 'audioonly' });
            const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
            const player = createAudioPlayer();

            player.play(resource);
            connection.subscribe(player);

            player.on(AudioPlayerStatus.Idle, () => connection.destroy());
        } catch (error) {
            await message.reply({ content: 'Avisa al admin\n player.error', ephemeral: true });
        }

    }
}