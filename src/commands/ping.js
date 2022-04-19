const Command = require('./../structures/Command');

module.exports = new Command({
	name: 'ping',
	description: 'ping in miliseconds to the discord server',

	async execute(client, message) {
		await message.reply(`Ping ${client.ws.ping} ms`);
	},
});