const { Client, Interaction, PermissionFlagsBits } = require('discord.js');
const LeaveLog = require('../../models/leaveLog');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    try {

      if (!(await LeaveLog.exists({ guildId: interaction.guild.id }))) {
        interaction.reply({content: 'Leave-log was not been configured for this server. Run **`/leave-configure`** to set it up.', ephemeral: true});
        return;
      }

      
      await LeaveLog.findOneAndDelete({ guildId: interaction.guild.id });
      interaction.reply('Leave-log has been disabled for this server. Run **`/leave-configure`** to set it up again.');
    } catch (error) {
      console.log(error);
    }
  },

  name: 'leave-disable',
  description: 'Disable the leave-log system in this server',
  permissionsRequired: [PermissionFlagsBits.Administrator],
};