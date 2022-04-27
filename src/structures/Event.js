const { Client } = require('discord.js');

class Event {
	/**
	 * @typedef {{name: string, once: boolean, execute: executeEvent}} Eventparams
	 * @param {Eventparams} params
	 */
	constructor(params) {
		this.name = params.name;
		this.once = params.once;
		this.execute = params.execute;
	}
}

/**
 * @param {Client} client
 */
function executeEvent(client) {}

module.exports = Event;