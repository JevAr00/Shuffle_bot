const Event = require('../structures/Event');

module.exports = new Event({
	name: 'messageCreate',

	execute(client, message) {
		const prefix = client.prefix;
		if (!message.content.startsWith(prefix) || message.author.bot) return;

		const args = message.content.slice(prefix.length).split(/ +/);
		const commandName = args.shift().toLowerCase();
		const command = client.commands.get(commandName) || client.commands.find(c => c.aliases && c.aliases.includes(commandName));

		try {
			command.execute(client, args, message);
		}
		catch (error) {
			console.log(error);
			message.reply('Error al ejecutar\nEl comando ha tenido un problema o no existe');
		}
	},
});