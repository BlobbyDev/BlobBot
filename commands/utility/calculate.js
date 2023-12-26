const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    EmbedBuilder
} = require('discord.js');
const math = require('mathjs');

module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async(client, interaction) => {
        try {
            const resp = await math.evaluate(interaction.options.getString('expression'))
            const embed = new EmbedBuilder()
            .setTitle('Calculator')
            .addFields(
                {name: 'Question', value: `\`\`\`\n${interaction.options.getString('expression')}\`\`\``},
                {name: 'Answer', value: `\`\`\`\n${resp}\`\`\``}
            )
            .setTimestamp()

            await interaction.reply({embeds: [embed]})
        } catch (e) {
            return await interaction.reply({content: `Please provide a valid question **[No variables]**`, ephemeral: true})
            
        }

    },
    name: 'calculate',
    description: "A simple discord calculator",
    options: [
        {
          name: 'expression',
          description: 'Expression that you want me to solve',
          type: ApplicationCommandOptionType.String,
          required: true
        },
    ],
}