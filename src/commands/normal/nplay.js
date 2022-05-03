const Command = require('../../structures/Command');
const {
	playerStatus,
	joinVoice,
	getPlayer,
	searchSong,
	startPlayer,
} = require('../../helpers/player');
const { getQueue, setNewQueue } = require('../../helpers/playerQueue');

module.exports = new Command({
	name: 'nplay',
	aliases: 'p',

	async execute(client, args, message) {
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return message.reply('Parece que no estas dentro de un canal de voz al que pueda unirme');

		const player = getPlayer();
		const isPaused = player.state.status === playerStatus.Paused;

		if (!args.length) {
			if (isPaused) {
				player.unpause();
				return message.channel.send(`${player.state.resource.metadata.title} esta sonando`);
			}
			else {
				return message.reply('Nombre o URL de cancion no encontrado');
			}
		}

		const serverQueue = getQueue(message.guildId);

		const song = await searchSong(args);
		const connection = joinVoice(voiceChannel, message.guild);

		if (!serverQueue) {
			const queue = setNewQueue(message, connection);

			queue.songList.push(song);
			startPlayer(message.guildId);
		}
		else {
			serverQueue.songList.push(song);
			return message.channel.send(`${song.title} agregada a la cola`);
		}
	},
});