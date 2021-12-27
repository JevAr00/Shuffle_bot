module.exports = async (client, message) => {
    //console.log(message);
    const prefix = "!";
	if(!message.content.startsWith(prefix) || message.author.bot) return;
	
	
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
    const commandList = client.commands.get(command) || client.commands.find(c => c.aliases && c.aliases.includes(command));

	try{
		await commandList.execute(client, message, command, args);
	} catch (error) {
		console.error(error);
		await message.reply({ content: 'Oh no! Algo ha pasado tratando de ejecutar el comando ', ephemeral: true});
	}
}