const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    EmbedBuilder
} = require('discord.js');
const config = require('../../config.json');

module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async (client, interaction) => {
        try {
            const bug = interaction.options.getString('bug');
            const channel = client.channels.cache.get(config.bugReportChannel);

            if (bug.length > 3000) {
                return interaction.reply({ content: `Please specify the bug under **3000** characters.`, ephemeral: true });
            }

            const embed = new EmbedBuilder()
            .setAuthor({ name: `${interaction.user.tag} (${interaction.user.id})`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`, url: `https://discordapp.com/users/${interaction.user.id}` })
            .setDescription(`${bug}`)
            .addFields(
                { name: `Guild`, value: `${interaction.guild.name} (${interaction.guild.id})`, inline: false }
            );

            await channel.send({ embeds: [embed] });
            await interaction.reply({ content: `✅ Your bug report has been sent to the developers.`, ephemeral: true });

        } catch (error) {

            console.error("Error in reporting bug:", error);

        }
    },

    name: 'report-bug',
    description: "Report bugs to the developer team",
    options: [
        {
            name: 'bug',
            description: 'The bug you want to report (please give a detailed explanation)',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
};
