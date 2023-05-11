const { ChannelType } = require("discord.js")

module.exports = {
    name: 'messageCreate',

    /**
     * @param {Message} message 
     * @param {Client} client 
     */
    async execute(message, client) {
        if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(client.config.botPrefix)) return;
        const [cmd, ...args] = message.content.slice(client.config.botPrefix.length).trim().split(" ");
        const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
        
        if (!command) return; // If someone puts <prefix> something, and the command doesn't exist, it won't return anything
        
        if (command.ownerOnly) {
            if (message.author.id !== client.config.ownerId) {
                return; // If any PrefixCommand is executed and the command is unique to the developer, the bot just won't respond
            }
        }
        if (message.channel.type === ChannelType.DM) { return } // Does not allow PrefixCommands to be executed via private message
        
        await command.run(client, message, args);
    }
}