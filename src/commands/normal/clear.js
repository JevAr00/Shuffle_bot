const Command = require('../../structures/Command');
const { getQueue } = require('../../helpers/playerQueue');

module.exports = new Command({
	name: 'clear',
	aliases: 'c',

	execute(client, args, message) {
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return message.reply('No estás dentro de un canal de voz al que pueda unirme');

		const messageGuildId = message.guildId;

		const serverQueue = getQueue(messageGuildId);
		if (!serverQueue) return message.reply('No hay cola de reproduccion. No se puede lipiar');

		const songListSize = serverQueue.songList.length;

		for (let i = 1; i < songListSize; i++) {
			serverQueue.songList.pop();
		}

		message.channel.send('Se ha limpiado la cola de reproduccion');
	},
});