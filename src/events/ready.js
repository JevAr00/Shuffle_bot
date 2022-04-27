const Event = require('../structures/Event');

module.exports = new Event({
	name: 'ready',
	once: true,

	execute(client) {
		console.log(`${client.user.tag} ready to go`);
	},
});