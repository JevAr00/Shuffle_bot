/** @typedef {import ('discord.js').Client} Client */
/** @typedef {import ('discord.js').Message} Message */
/** @typedef {import ('discord.js').Interaction} Interaction */

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