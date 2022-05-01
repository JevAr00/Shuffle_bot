const Command = require('../../structures/Command');
const {
	playerStatus,
	joinVoice,
	getPlayer,
	createPlayerResource,
	searchSong,
} = require('../../helpers/player');

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

		const song = await searchSong(args);
		const resource = createPlayerResource(song);
		const connection = joinVoice(voiceChannel, message.guild);

		player.play(resource);
		connection.subscribe(player);

		player.once(playerStatus.Playing, () => {
			message.channel.send(`${song.title} esta sonando`);
		});

		player.on(playerStatus.Idle, () => {
			connection.destroy();
		});
	},
});