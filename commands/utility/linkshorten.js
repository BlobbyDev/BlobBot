const shorten = require('isgd');
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

        const link = interaction.options.getString('link');
        const vanity = interaction.options.getString('vanity');

        try {
            shorten.custom(link, vanity, function(res) {
                interaction.reply({content: res, ephemeral: true})
            })
        } catch (error) {
            await interaction.reply({content: `Cannot shorten this link`, ephemeral: true});
        }
    },
    name: 'linkshorten',
    description: "Shorten links to isgd format with custome vanity",
    options: [
        {
          name: 'link',
          description: 'Link you want to shorten',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
            name: 'vanity',
            description: 'The vanity that you want',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
}