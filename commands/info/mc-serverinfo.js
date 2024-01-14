const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {
        await interaction.deferReply();

        const ip = interaction.options.getString('ip');

        try {
            var apiData = await fetch(`https://mcapi.us/server/status?ip=${ip}`);
            var mc = await apiData.json();

            if (mc.status == 'error') {
                await interaction.editReply({ content: 'Either the server is offline or non-existent.', ephemeral: true });
            }

            if (mc.status == 'success') {
                const embed = new EmbedBuilder()
                    .setTitle('Minecraft Server Information')
                    .addFields(
                        { name: 'Description', value: `${mc.motd}` || '`None`', inline: false},
                        { name: 'IP', value: `${ip.toLowerCase()}`, inline: true },
                        { name: 'Version Required', value: `${mc.server.name}`, inline: true },
                        { name: 'Server Protocol', value: `${mc.server.protocol}`, inline: true},
                    )
                    .setImage(`https://mcapi.us/server/image?ip=${ip}&theme=dark`)
                    .setTimestamp();

                await interaction.editReply({ embeds: [embed] });
            }
        } catch (error) {
            console.error('Error fetching Minecraft server information:', error);
            await interaction.editReply({ content: 'An error occurred while fetching server information.', ephemeral: true });
        }
    },

    name: 'mc-serverinfo',
    description: 'Provides information of a Minecraft server',
    options: [
        {
            name: 'ip',
            description: 'IP / server address',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
};
