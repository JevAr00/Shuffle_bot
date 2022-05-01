const { Client, Message, Interaction } = require('discord.js');

class Command {
	/**
	 * @typedef {{name: string, aliases: string[] | string, description: string, execute: executeCommand}} Commandparams
	 * @param {Commandparams} params
	 */
	constructor(params) {
		this.name = params.name;
		this.aliases = params.aliases || null;
		this.description = params.description || null;
		this.execute = params.execute;
	}
}

/**
 * @param {Client} client
 * @param {string[]} args
 * @param {Message} event
 */
function executeCommand(client, args, event) {
	// reference of constructor(params.execute)
}

module.exports = Command;