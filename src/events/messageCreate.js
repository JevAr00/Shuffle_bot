module.exports = async (client, message) => {
    //console.log(message);
    const prefix = "!";
	if(!message.content.startsWith(prefix) || message.author.bot) return;
	
	
	const args = message.content.slice(prefix.length).split(/ +/);
	const theCommand = args.shift().toLowerCase();
    const command = client.commands.get(theCommand);

	try{
		await command.execute(message);
	} catch (error) {
		console.error(error);
		await message.reply({ content: 'Oh no! Algo ha pasado tratando de ejecutar el comando ', ephemeral: true});
	}
}