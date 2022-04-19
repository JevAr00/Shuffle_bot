const { Client, Message, Interaction } = require('discord.js');

class Command {
	/**
	 * @typedef {{name: string, description: string, execute: executeCommand}} Commandparams
	 * @param {Commandparams} params
	 */
	constructor(params) {
		this.name = params.name;
		this.description = params.description;
		this.execute = params.execute;
	}
}

/**
 * @param {Client | Interaction} client
 * @param {Message} message
 * @param {Command.name} command
 * @param {string[]} args
 */
function executeCommand(client, message, command, args) {}

module.exports = Command;