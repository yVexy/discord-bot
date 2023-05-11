const { ApplicationCommandOptionType } = require("discord.js")

module.exports = {
    name: "ping",
    description: "example command",
    options: [
        {
            name: "ephemeral",
            description: "Wanna hide this message?",
            type: ApplicationCommandOptionType.Boolean,
            required: false
        }
    ],
    run: async(client, interaction) => {

        let hideOrNot = interaction.options.getBoolean("ephemeral");

        interaction.reply({
            content: `Pong! ${client.ws.ping}ms`,
            ephemeral: hideOrNot
        })

    }
}