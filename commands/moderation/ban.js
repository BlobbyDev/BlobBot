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
      const reason = interaction.options.get('reason')?.value || 'No reason provided';
      const targetUser = await interaction.guild.members.fetch(targetUserId);
  
      if (!targetUser) {
        await interaction.reply({content: "That user doesn't exist in this server.", ephemeral: true});
        return;
      }

      if (interaction.user.id === interaction.guild.ownerId) {

        if (targetUser.id === interaction.guild.ownerId) {
            await interaction.reply({
              content: "You can't ban that user because they're the server owner.",
              ephemeral: true
            });
            return;
        }

      } else {

        const targetUserRolePosition = targetUser.roles?.highest?.position; 
        const requestUserRolePosition = interaction.member.roles?.highest?.position;
        const botRolePosition = interaction.guild.members.me.roles?.highest?.position;

        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.reply({
              content: "You can't ban that user because they have the same or higher role than you.",
              ephemeral: true
            });
            return;
        }

        if (targetUserRolePosition >= botRolePosition) {
            await interaction.reply({
              content: "I can't ban that user because they have the same or higher role than me.",
              ephemeral: true
           });
            return;
        }

      }

      const embed = new EmbedBuilder()
        .setTitle('Successfully Banned')
        .setThumbnail(targetUser.user?.displayAvatarURL({ dynamic: true, size:  1024 }))
        .addFields(
            {name: 'User', value: `${targetUser} (\`${targetUser.user?.tag}\`)`, inline: false},
            {name: 'Reason', value: `${reason}`, inline: false}
        )
        .setTimestamp()
  
      try {
        await targetUser.ban({ reason });
        await interaction.reply({embeds: [embed]});
      } catch (error) {
        console.log(`There was an error when banning: ${error}`);
      }
    },
  
    name: 'ban',
    description: 'Bans a member from the server',
    options: [
      {
        name: 'target-user',
        description: 'Member to be banned',
        type: ApplicationCommandOptionType.User,
        required: true,
      },
      {
        name: 'reason',
        description: 'Reason to ban',
        type: ApplicationCommandOptionType.String,
      },
    ],
    permissionsRequired: [PermissionFlagsBits.BanMembers],
    botPermissions: [PermissionFlagsBits.BanMembers],
  };