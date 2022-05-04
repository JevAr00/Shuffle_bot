const { Client, Message, Interaction } = require('discord.js');

class Event {
	/**
	 * @typedef {{name: string, once: boolean, execute: executeEvent}} Eventparams
	 * @param {Eventparams} params
	 */
	constructor(params) {
		this.name = params.name;
		this.once = params.once ?? false;
		this.execute = params.execute;
	}
}

/**
 * @param { Client } client
 * @param { Message | Interaction } event
 */
function executeEvent(client, event) {
	// reference of constructor(params.execute)
}

module.exports = Event;