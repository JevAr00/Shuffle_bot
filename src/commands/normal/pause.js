const Command = require('../../structures/Command');
const {
	playerStatus,
	getPlayerState,
	pausePlayer,
} = require('../../helpers/player');


module.exports = new Command({
	name: 'pause',

	async execute(client, args, message) {
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return message.reply('No estás dentro de un canal de voz al que pueda unirme');

		const state = getPlayerState();

		const isIdle = state === playerStatus.Idle;
		const isPlaying = state === playerStatus.Playing;

		if (isIdle) return message.reply('No hay ninguna canción sonando');
		if (isPlaying) return pausePlayer();
	},
});