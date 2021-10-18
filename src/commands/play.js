const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')

module.exports = {
    name: 'play',
    async execute(client, message, command, args){
        //await message.channel.send('comando por mensaje funcionando');
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.reply({ content: 'Parece que no estas dentro de un canal de voz al que pueda unirme', ephemeral: true});

        const {
            AudioPlayerStatus,
            StreamType,
            createAudioPlayer,
            createAudioResource,
            joinVoiceChannel,
        } = require('@discordjs/voice');
        
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });
        
        const stream = ytdl(args, { filter: 'audioonly' });
        const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
        const player = createAudioPlayer();
        
        player.play(resource);
        connection.subscribe(player);
        
        player.on(AudioPlayerStatus.Idle, () => connection.destroy());
        
    }
}
