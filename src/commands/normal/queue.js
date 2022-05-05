const Command = require('../../structures/Command');
const { getQueue } = require('../../helpers/playerQueue');

module.exports = new Command({
	name: 'queue',
	aliases: 'q',

	execute(client, args, message) {
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return message.reply('No estás dentro de un canal de voz al que pueda unirme');

		const serverQueue = getQueue(message.guildId);
		if (!serverQueue) return message.reply('No hay cola de reproduccion. No se puede mostrar');

		const songList = serverQueue.songList.map((song, index) => {
			return `${index + 1}.\t${song.title}`;
		});

		message.channel.send(`Canciones en cola\n\n${songList.join('\n')}`);
	},
});