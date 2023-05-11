const { ApplicationCommandOptionType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Gets a user avatar",
    options: [
        {
        name: "user",
        description: "Mention or ID",
        type: ApplicationCommandOptionType.User,
        required: false
        },
        {
            name: "ephemeral",
            description: "Wanna hide this message?",
            type: ApplicationCommandOptionType.Boolean,
            required: false
        }
    ], run: async(client, interaction) => {

        const user = interaction.options.getUser("user") || interaction.user;
        let hideOrNot = interaction.options.getBoolean("ephemeral");

        const avatar_embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`${user.tag} avatar`)
            .setImage(user.displayAvatarURL({ dynamic: true }))
            .setFooter({
                text: `Command executed by: ${interaction.user.tag}`,
                iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`
            });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setURL(user.displayAvatarURL({ dynamic: true }))
                .setLabel("Download")
        )

        await interaction.reply({
            embeds: [avatar_embed],
            components: [row],
            ephemeral: hideOrNot
        })

    }
}