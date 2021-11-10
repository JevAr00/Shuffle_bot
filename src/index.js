const { Client, Collection, Intents } = require('discord.js');
const dotenv = require('dotenv');


// Nueva instancia de cliente
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES] });
dotenv.config();

//Handlers
client.commands = new Collection();
client.events = new Collection();

['commandHandler', 'eventHandler'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.login(process.env.TOKEN);