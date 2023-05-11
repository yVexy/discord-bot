const { InteractionType,ChannelType } = require("discord.js")
const { ownerId } = require("../../config.json")
module.exports = {
    name: 'interactionCreate',

    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
 
        if (interaction.type !== InteractionType.ApplicationCommand) return;
        
        const command = client.slash.get(interaction.commandName);
        if (!command) return interaction.reply({ content: '❌ An error occurred when executing the command!', ephemeral: true });
        
        if (command.ownerOnly) {
            if (interaction.user.id !== ownerId) {
                return interaction.reply({ content: "❌ This command is only for my developer", ephemeral: true });
            }
        }
        if (interaction.channel.type === ChannelType.DM) {
            return interaction.reply({ content: `❌ Use meus comandos apenas em servidores`, ephemeral: true })
        }
        
        const args = [];
        
        for (let option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                if (option.name) args.push(option.name);
                option.options?.forEach(x => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        
        try {
            command.run(client, interaction, args)
        } catch (e) {
            console.log(e)
        }
    }
}