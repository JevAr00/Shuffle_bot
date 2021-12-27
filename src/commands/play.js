const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')
const {
    AudioPlayerStatus,
    StreamType,
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
} = require('@discordjs/voice');

const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['p', 'skip','stop'],
    async execute(client, message, command, args) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply({ content: 'Parece que no estas dentro de un canal de voz al que pueda unirme', ephemeral: true });

        const serverQueue = queue.get(message.guild.id);
        if (command === this.aliases[0] || command === 'play') {
            let song = {};

            /**
             * Inicia la conexion en una canal de voz
             */
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            });

            /**
             * Valida si se recibe una URL o lenguaje natural para buscar cancion
             */
            if (ytdl.validateURL(args[0])) {
                const video = await ytdl.getInfo(args[0]);
                song = { title: video.videoDetails.title, url: video.videoDetails.video_url };
            } else {
                const search = async (query) => {
                    const videoSearch = await ytSearch(query);
                    return (videoSearch.videos.length > 1) ? videoSearch.videos[0] : null;
                }

                const video = await search(args.join(' '));
                if (video) {
                    song = { title: video.title, url: video.url };
                } else {
                    await message.reply({ content: 'Parece que ha ocurrido algo. Vuelve a intentarlo.', ephemeral: true });
                }
            }

            /**
             * Cola global de canciones
             */
            if (!serverQueue) {
                const queueConstructor = {
                    Message: message,
                    Connection: connection,
                    Songs: []
                }

                queue.set(message.guild.id, queueConstructor);
                queueConstructor.Songs.push(song);

                try {
                    songPlayer(message.guild, queueConstructor.Songs[0]);
                } catch (error) {
                    queue.delete(message.guild.id);
                    await message.reply({ content: `Avisa al admin\nserverQueue.songPlayer error\n\n ${error}`, ephemeral: true });
                }
            } else {
                serverQueue.Songs.push(song);
                return message.channel.send(`${song.title} agregada a la cola`);
            }
        }
        else if (command === this.aliases[1]) songSkip(serverQueue);
        else if (command === this.aliases[2]) songStop(serverQueue);
    }
}

/**
 * @param {*} guild Identificador de la cola global
 * @param {*} song URL de la cancion a reproducir
 * @returns Una cancion en el chat de voz en el que se encuentra unido
 */
const songPlayer = async (guild, song) => {
    const songQueue = queue.get(guild.id);

    if (!song) {
        //setTimeout(()=>songQueue.Connection.destroy(), 20_000);
        songQueue.Connection.destroy();
        queue.delete(guild.id);
        return;
    }

    try {
        const stream = ytdl(song.url, { filter: 'audioonly', Quality: 'highestaudio', highWaterMark: 1 << 25 });
        const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
        const player = createAudioPlayer();

        player.play(resource);
        await songQueue.Connection.subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => {
            songQueue.Songs.shift();
            songPlayer(guild, songQueue.Songs[0]);
        });
        await songQueue.Message.channel.send(`${song.title} esta sonando`);

    } catch (error) {
        await songQueue.Message.reply({ content: `Avisa al admin\nsongPlayer.player error\n\n${error}`, ephemeral: true });
    }
}

/**
 * Pasa a la siguiente cancion en la cola
 */
const songSkip = (serverQueue) => {
    if(!serverQueue) return songQueue.Message.channel.send('No hay canciones en la cola');

    serverQueue.connection.dispatcher.end();
}

const songStop = (serverQueue) => {
    serverQueue.Songs = [];
    serverQueue.connection.dispatcher.end();
    return songQueue.Message.channel.send('Se ha detenido la reproduccion y se ha limpiado la lista de caciones');
}