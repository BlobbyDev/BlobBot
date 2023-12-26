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

        const mentionedUserId = interaction.options.get('target-user')?.value;
        const targetUserId = mentionedUserId || interaction.member.id;
        const targetUserObj = await interaction.guild.members.fetch(targetUserId);
        const avatar = targetUserObj.user.displayAvatarURL({ dynamic: true, size:  1024 });
        const permissions = await targetUserObj.permissions.toArray().join(", ") || 'No Permissions';
        const roles = targetUserObj.roles.cache.map(role => role).join(", ");

        if(!targetUserId) {
          await interaction.reply({content: "User does't exist in this server", ephemeral: true})
          return;
        }

        const embed = new EmbedBuilder()
        .setThumbnail(avatar)
        .setTitle(`**${targetUserObj.displayName}**'s Info`)
        .addFields(
            {name: 'Username', value: `\`${targetUserObj.user.tag}\``, inline: true},
            {name: 'ID', value: `\`${targetUserObj.user.id}\``, incline: true, inline: true},
            {name: 'Display Name', value: `\`${targetUserObj.user.displayName}\``, inline: true},
            {name: 'Joined Server', value: `<t:${(targetUserObj.joinedTimestamp/1000).toFixed(0)}:f>\n(<t:${(targetUserObj.joinedTimestamp/1000).toFixed(0)}:R>)`, inline: true},
            {name: 'Account Created', value: `<t:${(targetUserObj.user.createdTimestamp/1000).toFixed(0)}:f>\n(<t:${(targetUserObj.user.createdTimestamp/1000).toFixed(0)}:R>)`, inline: true},
            {name: 'Highest Role', value: `${targetUserObj.roles.highest}`, inline: true},
            {name: 'Permissions', value: `\`\`\`${permissions}\`\`\``, inline: false}
        )
        .setTimestamp()


        await interaction.reply({embeds: [embed]})
    },

    name: 'whois',
    description: "Provides the user information about you or mentioned user's",
    options: [
      {
        name: 'target-user',
        description: 'User you want the information of',
        type: ApplicationCommandOptionType.User,
      },
    ],
}