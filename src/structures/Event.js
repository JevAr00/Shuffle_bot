const { Client, Message, Interaction } = require('discord.js');

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
 * @param { Client } client
 * @param { Message | Interaction } event
 */
function executeEvent(client, event) {}

module.exports = Event;