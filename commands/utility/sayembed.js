const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    EmbedBuilder
} = require('discord.js');

module.exports = {
     /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async(client, interaction) => {

        const title = interaction.options.getString('title')
        const text = interaction.options.getString('description')
        if (!title) {
            interaction.reply({content: "You must type something", ephemeral: true})
        }
        if (!text) {
            interaction.reply({content: "You must type something", ephemeral: true})
        }

        const embed = new EmbedBuilder()
        .setAuthor({name: interaction.user.displayName + ` [${interaction.user.id}]`, iconURL: interaction.user.displayAvatarURL({dynamic: true})})
        .setTitle(title)
        .setDescription(text)
        .setTimestamp()
        interaction.reply({embeds: [embed]})
    },

    name: 'sayembed',
    description: "Repeats whatever you text in embed format",
    options: [
        {
          name: 'title',
          description: 'Title for your embed',
          type: ApplicationCommandOptionType.String,
          required: true,
        },

        {
            name: 'description',
            description: 'Description for your embed',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
}