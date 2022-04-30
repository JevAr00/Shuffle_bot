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
 * @param {Client | Interaction} client
 * @param {Message} message
 * @param {string} command
 * @param {string[]} args
 */
function executeCommand(client, message, command, args) {}

module.exports = Command;