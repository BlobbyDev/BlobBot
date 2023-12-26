const { Client, Interaction, PermissionFlagsBits } = require('discord.js');
const WelcomeLog = require('../../models/welcomeLog');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    try {

      if (!(await WelcomeLog.exists({ guildId: interaction.guild.id }))) {
        interaction.reply({content: 'Welcome-log was not been configured for this server. Run **`/welcome-configure`** to set it up.', ephemeral: true});
        return;
      }

      await WelcomeLog.findOneAndDelete({ guildId: interaction.guild.id });
      interaction.reply('Welcome-log has been disabled for this server. Run **`/welcome-configure`** to set it up again.');
    } catch (error) {
      console.log(error);
    }
  },

  name: 'welcome-disable',
  description: 'Disable the welcome-log system in this server',
  permissionsRequired: [PermissionFlagsBits.Administrator],
};