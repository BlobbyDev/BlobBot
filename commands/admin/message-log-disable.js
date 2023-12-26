const { Client, Interaction, PermissionFlagsBits } = require('discord.js');
const MessageLog = require('../../models/messageLog');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    try {

      if (!(await MessageLog.exists({ guildId: interaction.guild.id }))) {
        interaction.reply({content: 'Message-log was not been configured for this server. Run **`/message-log-configure`** to set it up.', ephemeral: true});
        return;
      }

      
      await MessageLog.findOneAndDelete({ guildId: interaction.guild.id });
      interaction.reply('Message-log has been disabled for this server. Run **`/message-log-configure`** to set it up again.');
    } catch (error) {
      console.log(error);
    }
  },

  name: 'message-log-disable',
  description: 'Disable the message-log system in this server',
  permissionsRequired: [PermissionFlagsBits.Administrator],
};