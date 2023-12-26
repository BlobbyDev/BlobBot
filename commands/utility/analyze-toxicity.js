const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const Perspective = require('perspective-api-client');

require('dotenv').config();

module.exports = {
    /**
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {

        await interaction.deferReply({ ephemeral: true });

        try {
            const text = interaction.options.getString('text');
            const perspective = new Perspective({ apiKey: process.env.GOOGLE_KEY });
            const result = await perspective.analyze(text);

            if (result && result.attributeScores && result.attributeScores.TOXICITY && result.attributeScores.TOXICITY.summaryScore) {
                const toxicityScore = result.attributeScores.TOXICITY.summaryScore.value * 100;

                const embed = new EmbedBuilder()
                    .setTitle('Toxic Analyzer')
                    .setDescription(`Your text is \`${toxicityScore}\`% Toxic`)
                    .setTimestamp();

                await interaction.editReply({ embeds: [embed] });
            } else {
                throw new Error('Invalid response from Perspective API');
            }

        } catch (e) {
            console.error(`There was an error in the Perspective API: ${e}`);
            await interaction.followUp('Error analyzing toxicity. Please try again.');
        }

    },

    name: 'analyze-toxicity',
    description: 'Analyzes toxicity % of the given text',
    options: [
        {
            name: 'text',
            description: 'Text that you want to analyze',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
};
