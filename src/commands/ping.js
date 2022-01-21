const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Manda un ping'),
	async execute(interaction) {
		await interaction.reply('pong hijo de use madre');
	},
};