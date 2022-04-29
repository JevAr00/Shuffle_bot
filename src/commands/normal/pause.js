const Command = require('../../structures/Command');
const {
	playerStatus,
	getPlayer,
} = require('../../helpers/player');


module.exports = new Command({
	name: 'pause',

	async execute(client, message, command, args) {
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return message.reply({ content: 'Parece que no estas dentro de un canal de voz al que pueda unirme', ephemeral: true });

		const player = getPlayer();
		const status = player.state.status;

		if (status === playerStatus.Idle) return message.reply({ content: 'No hay ninguna canción sonando', ephemeral: true });
		if (status === playerStatus.Playing) return player.pause();
	},
});