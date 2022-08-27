const Command = require('../../structures/Command');
const {
	playerStatus,
	getPlayerState,
	joinVoice,
	searchSong,
	startPlayer,
	unpausePlayer,
	getPlayerMetadata,
} = require('../../helpers/player');
const { getQueue, setNewQueue } = require('../../helpers/playerQueue');

module.exports = new Command({
	name: 'play',
	aliases: 'p',

	async execute(client, args, message) {
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return message.reply('No estás dentro de un canal de voz al que pueda unirme');

		const state = getPlayerState();
		const isPaused = state === playerStatus.Paused;
		const emptyArgs = !args.length;

		if (emptyArgs) {
			if (isPaused) {
				unpausePlayer();
				const playerData = getPlayerMetadata();
				return message.channel.send(`${playerData.title} está volviendo a sonar`);
			}
			else {
				return message.reply('Nombre o URL de canción no encontrado');
			}
		}

		const messageGuildId = message.guildId;
		const serverQueue = getQueue(messageGuildId);

		const song = await searchSong(args);
		const connection = joinVoice(voiceChannel, message.guild);

		try {
			if (!serverQueue) {
				const queue = setNewQueue(message, connection);

				queue.songList.push(song);
				startPlayer(messageGuildId);
			}
			else {
				serverQueue.songList.push(song);
				message.channel.send(`${song.title} agregada a la cola`);
			}
		}
		catch {
			message.channel.send(`${args.join(' ')} no ha podido ser agregada a la cola`);
		}
	},
});