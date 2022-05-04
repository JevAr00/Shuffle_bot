const Command = require('../../structures/Command');
const { playerStatus, getPlayer, startPlayer } = require('../../helpers/player');
const { getQueue } = require('../../helpers/playerQueue');

module.exports = new Command({
	name: 'skip',
	aliases: 'sk',

	execute(client, args, message) {
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return message.reply('No estás dentro de un canal de voz al que pueda unirme');

		const messageGuildId = message.guildId;
		const serverQueue = getQueue(messageGuildId);

		const player = getPlayer();
		const isPlaying = player.state.status === playerStatus.Playing;
		const isPaused = player.state.status === playerStatus.Paused;

		if (serverQueue && isPlaying || serverQueue && isPaused) {
			if (serverQueue.songList.length > 1) {
				serverQueue.songList.shift();
				startPlayer(messageGuildId);
			}
			else {
				message.reply('No hay más canciones en la cola');
			}
		}
		else {
			message.reply('No estoy reproduciendo música. No es posible pasar a la siguiente canción');
		}
	},
});