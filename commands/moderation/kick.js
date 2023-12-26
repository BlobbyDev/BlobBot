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
              content: "You can't kick that user because they're the server owner.",
              ephemeral: true
            });
            return;
        }

      } else {

        const targetUserRolePosition = targetUser.roles?.highest?.position; 
        const requestUserRolePosition = interaction.member.roles?.highest?.position;
        const botRolePosition = interaction.guild.members.me.roles?.highest?.position;

        if (targetUserRolePosition >= requestUserRolePosition) {
          await interaction.reply({content: "You can't kick that user because they have the same or higher role than you.", ephemeral: true});
          return;
        }
    
        if (targetUserRolePosition >= botRolePosition) {
          await interaction.reply({content: "I can't kick that user because they have the same or higher role than me.", ephemeral: true});
          return;
        }

      }
  
      

      const embed = new EmbedBuilder()
      .setTitle('Successfully Kicked')
      .setThumbnail(targetUser.user.displayAvatarURL({ dynamic: true, size:  1024 }))
      .addFields(
        {name: 'User', value: `${targetUser} (\`${targetUser.user?.tag}\`)`, inline: false},
        {name: 'Reason', value: `${reason}`, inline: false}
      )
      .setTimestamp()

      try {
        await targetUser.kick({ reason });
        await interaction.reply({embeds: [embed]});
      } catch (error) {
        console.log(`There was an error when kicking: ${error}`);
      }
    },
  
    name: 'kick',
    description: 'Kick a member from the server',
    options: [
      {
        name: 'target-user',
        description: 'Member to be kicked out',
        type: ApplicationCommandOptionType.User,
        required: true,
      },
      {
        name: 'reason',
        description: 'Reason to kick',
        type: ApplicationCommandOptionType.String,
      },
    ],
    permissionsRequired: [PermissionFlagsBits.KickMembers],
    botPermissions: [PermissionFlagsBits.KickMembers],
  };