const Discord = require("discord.js")

module.exports = {
    name: "ping",
    description: "example command",
    run: async(client, message) => {

        message.reply({
            content: `Pong! ${client.ws.ping}ms`
        })

    }
}