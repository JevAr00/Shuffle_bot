/** @typedef {import ('discord.js').Client} Client */
/** @typedef {import ('discord.js').Message} Message */

class Command {
	/**
	 * @typedef {{name: string, aliases: string[] | string, description: string, execute: executeCommand}} Commandparams
	 * @param {Commandparams} params
	 */
	constructor(params) {
		this.name = params.name;
		this.aliases = params.aliases ?? null;
		this.description = params.description ?? null;
		this.execute = params.execute;
	}
}

/**
 * @param {Client} client
 * @param {string[]} args
 * @param {Message} message
 */
function executeCommand(client, args, message) {
	// reference of constructor(params.execute)
}

module.exports = Command;