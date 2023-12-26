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

        callback: async (client, interaction) => {
        
        const role = interaction.options.getRole('role');
        const permissions = await role.permissions.toArray().join(", ") || 'No Permissions';
        const iconURL = role.iconURL({size: 1024, dynamic: true})
        const icon = iconURL || '`No Icon`';
        
        const embed = new EmbedBuilder()
        .setTitle(`Role Information`)
        .addFields(
            {name: 'Name', value: `${role} (\`${role.name}\`)`, inline: true},
            {name: 'ID', value: `\`${role.id}\``, inline: true},
            {name: 'Role Color', value: `\`${role.hexColor}\``, inline: true},
            {name: 'Creation Date', value: `<t:${(role.createdTimestamp/1000).toFixed(0)}:f>\n(<t:${(role.createdTimestamp/1000).toFixed(0)}:R>)`, inline: true},
            {name: 'Hoisted', value: role.hoist ? "`Yes`" : "`No`", inline: true},
            {name: 'Role Mentionable', value: role.mentionable ? "`Yes`" : '`No`', inline: true},
            {name: 'Permissions', value: `\`\`\`${permissions}\`\`\``}
        )
        .setThumbnail(iconURL || null)
        .setTimestamp()
        await interaction.reply({embeds: [embed]})
    },

    name: 'roleinfo',
    description: "Gives the detailed info of a role",
    options: [
        {
          name: 'role',
          description: 'Role you wanna give to the new members',
          type: ApplicationCommandOptionType.Role,
          required: true,
        },
      ],
}
