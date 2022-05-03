const queue = new Map();

function getQueue(messageGuildId) {
	return queue.get(messageGuildId);
}

function setNewQueue(message, connection) {
	const queueParams = {
		message: message,
		connection: connection,
		songList: [],
	};
	queue.set(message.guildId, queueParams);

	return queueParams;
}

function deleteQueue(messageGuildId) {
	queue.delete(messageGuildId);
}

module.exports = {
	getQueue,
	setNewQueue,
	deleteQueue,
};