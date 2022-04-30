const Event = require('../structures/Event');

module.exports = new Event({
	name: 'messageCreate',
	once: false,

	async execute(client, message) {
		const prefix = '!';
		if (!message.content.startsWith(prefix) || message.author.bot) return;

		const args = message.content.slice(prefix.length).split(/ +/);
		const command = args.shift().toLowerCase();
		const commandList = client.commands.get(command) || client.commands.find(c => c.aliases && c.aliases.includes(command));

		try {
			await commandList.execute(client, message, command, args);
		}
		catch (error) {
			await message.reply('Error al ejecutar\nEl comando ha tenido un problema o no existe');
		}
	},
});