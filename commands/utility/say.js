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
        
        const message = interaction.options.getString('text')
        if (!message) {
            interaction.reply({content: "You must type something", ephemeral: true})
        }
        interaction.reply({content: `${message}`, allowedMentions: { parse: []}})
    },

    name: 'say',
    description: "Repeats whatever you text",
    options: [
        {
          name: 'text',
          description: 'Text you want me to type',
          type: ApplicationCommandOptionType.String,
          required: true
        },
    ],
}