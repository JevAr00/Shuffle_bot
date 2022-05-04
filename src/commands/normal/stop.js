const Command = require('../../structures/Command');
const { playerStatus, getPlayer, closeVoiceConnection } = require('../../helpers/player');
const { deleteQueue } = require('../../helpers/playerQueue');

module.exports = new Command({
	name: 'stop',

	execute(client, args, message) {
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return message.reply('No estás dentro de un canal de voz al que pueda unirme');

		const messageGuildId = message.guildId;
		const player = getPlayer();
		const isWorking = player.state.status !== playerStatus.Idle;

		if (isWorking) {
			player.stop();
			closeVoiceConnection(messageGuildId);
			deleteQueue(messageGuildId);
		}
		else {
			message.reply('No es posible detener la música');
		}
	},
});