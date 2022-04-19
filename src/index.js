const Client = require('./structures/Client');
const dotenv = require('dotenv');

// Nueva instancia de cliente
const client = new Client();
dotenv.config();

// Handlers
['commandHandler', 'eventHandler'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.login(process.env.TOKEN);