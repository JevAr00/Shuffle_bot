/** @typedef {import ('discord.js').Client} Client */
/** @typedef {import ('discord.js').Message} Message */
/** @typedef {import ('discord.js').Interaction} Interaction */

class Event {
	/**
 	* @callback executeEvent
 	* @param { Client } client
	* @param { Message | Interaction } event
	* @returns { void }
 	*/

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

module.exports = Event;