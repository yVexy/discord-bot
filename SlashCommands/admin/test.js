const { ApplicationCommandOptionType } = require("discord.js")

module.exports = {
    name: "test",
    description: "example command",
    ownerOnly: true,
    options: [
        {
            name: "ephemeral",
            description: "Wanna hide this message?",
            type: ApplicationCommandOptionType.Boolean,
            required: true
        }
    ],
    run: async(client, interaction) => {

        let hideOrNot = interaction.options.getBoolean("ephemeral");

        interaction.reply({
            content: `This is a developer-only command!!!`,
            ephemeral: hideOrNot
        })

    }
}