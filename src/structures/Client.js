const { Client, Intents, Collection } = require('discord.js');
const Command = require('./Command');

const intents = [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_VOICE_STATES,
	Intents.FLAGS.GUILD_MESSAGES,
];

class cClient extends Client {
	constructor() {
		super({ intents });

		/**
     * @type {Collection<string, Command>}
     */
		this.commands = new Collection();

		this.prefix = '-';
	}
}

module.exports = cClient;