const Discord = require("discord.js")

module.exports = {
    name: "test",
    description: "developer-only example command",
    ownerOnly: true,
    run: async(client, message) => {

        message.reply({
            content: "This is a developer-only command!!!"
        })

    }
}