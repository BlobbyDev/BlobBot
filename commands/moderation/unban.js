const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    EmbedBuilder,
    PermissionFlagsBits,
} = require('discord.js');

module.exports = {

    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async (client, interaction) => {

        const targetUserId = interaction.options.get('target-user').value;
        const reason = interaction.options.getString('reason') || 'No reason provided';

        try {

            const banList = await interaction.guild.bans.fetch();

            const bannedUser = banList.get(targetUserId);

            if (interaction.guild.members.cache.has(targetUserId)) {
                await interaction.reply({ content: `User is still a member in this server <@${targetUserId}>`, ephemeral: true });
                return;
            }

            if (!bannedUser) {
                await interaction.reply({ content: "User is not banned", ephemeral: true });
                return;
            }

            await interaction.guild.members.unban(targetUserId, reason);

            const unbannedUser = await client.users.fetch(targetUserId);

            const embed = new EmbedBuilder()
                .setTitle('Successfully Unbanned')
                .setThumbnail(unbannedUser.displayAvatarURL({ dynamic: true, size:  1024 }))
                .addFields(
                    { name: 'User', value: `${unbannedUser} (\`${unbannedUser.tag}\`)`, inline: false},
                    { name: 'Reason', value: `${reason}`, inline: false }
                )
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(`There was an error when unbanning: ${error}`);
            await interaction.reply({ content: 'An error occurred while unbanning', ephemeral: true });
        }
    },

    name: 'unban',
    description: 'Unbans a member from the server',
    options: [
        {
            name: 'target-user',
            description: 'User to be unbanned (provide their ID)',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'reason',
            description: 'Reason for unbanning',
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.BanMembers],
    botPermissions: [PermissionFlagsBits.BanMembers],
};
