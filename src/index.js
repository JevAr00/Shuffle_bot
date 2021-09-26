const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('../config.json');
const prefix = "-";


// Nueva instancia de cliente
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });


//Command handler
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
};

/*
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if(!command) return;

	try{
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Oh no! Algo ha pasado tratando de ejecturar ', ephemeral: true});
	}
});
*/

client.on('messageCreate', async message => {
	//console.log(message);
	if(!message.content.startsWith(prefix)) return;
	
	const args = message.content.slice(prefix.length).split(/ +/);


})

client.login(token);