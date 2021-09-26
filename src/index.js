const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('../config.json');
const prefix = "-";


// Nueva instancia de cliente
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES] });


//Command handler
client.commands = new Collection();
client.events = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
};


client.once('ready', () => {
	console.log('Listo')
})

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
	if(!message.content.startsWith(prefix) || message.author.bot) return;
	
	
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	try{
		await command.execute(message);
	} catch (error) {
		console.error(error);
		await message.reply({ content: 'Oh no! Algo ha pasado tratando de ejecturar ', ephemeral: true});
	}

});

client.login(token);