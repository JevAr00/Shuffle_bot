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
	name: 'play',
	aliases: 'p',

	async execute(client, args, message) {
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return message.reply('No estás dentro de un canal de voz al que pueda unirme');

		const player = getPlayer();
		const isPaused = player.state.status === playerStatus.Paused;
		const emptyArgs = !args.length;

		if (emptyArgs) {
			if (isPaused) {
				player.unpause();
				return message.channel.send(`${player.state.resource.metadata.title} está sonando`);
			}
			else {
				return message.reply('Nombre o URL de canción no encontrado');
			}
		}

		const messageGuildId = message.guildId;
		const serverQueue = getQueue(messageGuildId);

		const song = await searchSong(args);
		const connection = joinVoice(voiceChannel, message.guild);

		if (!serverQueue) {
			const queue = setNewQueue(message, connection);

			queue.songList.push(song);
			startPlayer(messageGuildId);
		}
		else {
			serverQueue.songList.push(song);
			message.channel.send(`${song.title} agregada a la cola`);
		}
	},
});