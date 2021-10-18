const { Client, Collection, Intents } = require('discord.js');
const { token } = require('../config.json');

// Nueva instancia de cliente
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES] });


//Handlers
client.commands = new Collection();
client.events = new Collection();

['commandHandler', 'eventHandler'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
})

client.login(token);