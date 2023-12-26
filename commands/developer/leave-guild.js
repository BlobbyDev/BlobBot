const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const config = require('../../config.json');
const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async(client, interaction) => {

        if (!config.devCommandsAccess.includes(interaction.user.id)) {
            return interaction.reply({ content: "This is a developer only command", ephemeral: true });
        }

        const guildId = interaction.options.getString('guild-id');

        if (!rgx.test(guildId)) return interaction.reply({ content: `Couldn't find the guild`, ephemeral: true })

        const guild = client.guilds.cache.get(guildId);

        if (!guild) return interaction.reply({ content: `Couldn't find the guild`, ephemeral: true })
        await guild.leave();

        await interaction.reply({ content: `Left the guild **${guild.name}** with **${guild.memberCount}** Users`, ephemeral: true })

    },

    name: 'leave-guild',
    description: 'Leaves the server (Developer only)',
    options: [
        {
            name: 'guild-id',
            description: 'Guild you want me to leave',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
}