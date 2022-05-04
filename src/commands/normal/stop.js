const Command = require('../../structures/Command');
const { playerStatus, getPlayer, closeVoiceConnection } = require('../../helpers/player');
const { deleteQueue } = require('../../helpers/playerQueue');

module.exports = new Command({
	name: 'stop',

	execute(client, args, message) {
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return message.reply('Parece que no estas dentro de un canal de voz al que pueda unirme');

		const player = getPlayer();
		const isWorking = player.state.status !== playerStatus.Idle;

		if (isWorking) {
			player.stop();
			closeVoiceConnection(message.guildId);
			deleteQueue(message.guildId);
		}
	},
});