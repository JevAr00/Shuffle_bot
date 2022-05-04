const Command = require('../../structures/Command');
const {
	playerStatus,
	getPlayer,
} = require('../../helpers/player');


module.exports = new Command({
	name: 'pause',

	async execute(client, args, message) {
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return message.reply('No estás dentro de un canal de voz al que pueda unirme');

		const player = getPlayer();

		const isIdle = player.state.status === playerStatus.Idle;
		const isPlaying = player.state.status === playerStatus.Playing;

		if (isIdle) return message.reply('No hay ninguna canción sonando');
		if (isPlaying) return player.pause();
	},
});