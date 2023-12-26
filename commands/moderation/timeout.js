const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {
  
    const mentionable = interaction.options.get('target-user').value;
    const duration = interaction.options.get('duration').value; 
    const reason = interaction.options.get('reason')?.value || 'No reason provided';

    const targetUser = await interaction.guild.members.fetch(mentionable);
    if (!targetUser) {
      await interaction.reply({content: "That user doesn't exist in this server.", ephemeral: true});
      return;
    }

    if (targetUser.user.bot) {
      await interaction.reply({content: "I can't timeout a bot.", ephemeral: true});
      return;
    }

    const msDuration = ms(duration);
    if (isNaN(msDuration)) {
      await interaction.reply({content: 'Please provide a valid timeout duration., ephemeral: true'});
      return;
    }

    if (msDuration < 5000 || msDuration > 21600000) {
      await interaction.reply({content: 'Timeout duration cannot be less than 5 seconds or more than 28 days.', ephemeral: true});
      return;
    }

    if (interaction.user.id = interaction.guild.ownerId) {

      if (targetUser.id === interaction.guild.ownerId) {
        await interaction.reply({
          content: "You can't timeout that user because they're the server owner.",
          ephemeral: true
        });
        return;
      }

    } else {

      const targetUserRolePosition = targetUser.roles.highest.position;
      const requestUserRolePosition = interaction.member.roles.highest.position; 
      const botRolePosition = interaction.guild.members.me.roles.highest.position; 

      if (targetUserRolePosition >= requestUserRolePosition) {
        await interaction.reply({content: "You can't timeout that user because they have the same or higher role than you.", ephemeral: true});
        return;
      }
  
      if (targetUserRolePosition >= botRolePosition) {
        await interaction.reply({content: "I can't timeout that user because they have the same or higher role than me.", ephemeral: true});
        return;
      }

    }

    const { default: prettyMs } = await import('pretty-ms');
    const embed = new EmbedBuilder()
    .setTitle('Successfully Timed Out')
    .setThumbnail(targetUser.user.displayAvatarURL({ dynamic: true, size:  1024 }))
    .addFields(
      {name: 'User', value: `${targetUser} (\`${targetUser.user?.tag}\`)`, inline: false},
      {name: 'Duration', value: `${prettyMs(msDuration, { verbose: true })}`, inline: false},
      {name: 'Reason', value: `${reason}`, inline: false}
    )
    .setTimestamp()
    
    const embedUpdate = new EmbedBuilder()
    .setTitle('Timeout Updated')
    .setThumbnail(targetUser.user.displayAvatarURL({ dynamic: true, size:  1024 }))
    .addFields(
      {name: 'User', value: `${targetUser} (\`${targetUser.user?.tag}\`)`, inline: false},
      {name: 'Duration', value: `${prettyMs(msDuration, { verbose: true })}`, inline: false},
      {name: 'Reason', value: `${reason}`, inline: false}
    )
    .setTimestamp()
    
    try {

      if (targetUser.isCommunicationDisabled()) {
        await targetUser.timeout(msDuration, reason);
        await interaction.reply({embeds: [embedUpdate]});
        return;
      }

      await targetUser.timeout(msDuration, reason);
      await interaction.reply({embeds: [embed]});
    } catch (error) {
      console.log(`There was an error when timing out: ${error}`);
    }
  },

  name: 'timeout',
  description: 'Timeout a user.',
  options: [
    {
      name: 'target-user',
      description: 'The user you want to timeout.',
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: 'duration',
      description: 'Timeout duration (30m, 1h, 1 day).',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'reason',
      description: 'The reason for the timeout.',
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.MuteMembers],
  botPermissions: [PermissionFlagsBits.MuteMembers],
};