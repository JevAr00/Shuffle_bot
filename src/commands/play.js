module.exports = {
    name: 'play',
    async execute(message){
        await message.channel.send('comando por mensaje funcionando');
    }
}