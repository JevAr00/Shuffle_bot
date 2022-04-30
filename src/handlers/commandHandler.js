const fs = require('fs');

module.exports = (client) => {
	const commandFiles = fs.readdirSync('src/commands/normal/').filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`../commands/normal/${file}`);
		client.commands.set(command.name, command);
	}
};