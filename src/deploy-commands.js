const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9')
const { clientId, guildId, token } = require('../config.json');
const fs = require('fs');

//command handler
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
};

const rest = new REST({version: '9'}).setToken(token);
(async () => {
    try{
        console.log('Proceso iniciado. Buscando y actualizando comandos (/).');
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
        console.log('Genial, tienes nuevos comandos (/). Pruebalos!');
    } catch (error){
        console.error(error);
    }
})();