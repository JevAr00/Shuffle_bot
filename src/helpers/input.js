function cleanInput(prefix, messageContent) {
	const rawInput = messageContent.slice(prefix.length).split(/ +/);
	const command = prefix + rawInput[0];
	const newInput = [];

	rawInput.forEach(element => {
		if (!newInput.includes(command)) {
			if (element !== command) {
				newInput.push(element);
			}
		}
	});
	return newInput;
}

module.exports = { cleanInput };