const { Client, Interaction, PermissionFlagsBits } = require('discord.js');
const AutoRole = require('../../models/autoRole');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    try {

      if (!(await AutoRole.exists({ guildId: interaction.guild.id }))) {
        interaction.reply({content: 'Auto-role has not been configured for this server. Run **`/autorole-configure`** to set it up.', ephemeral: true});
        return;
      }

      await AutoRole.findOneAndDelete({ guildId: interaction.guild.id });
      interaction.reply('Auto-role has been disabled for this server. Run **`/autorole-configure`** to set it up again.');
    } catch (error) {
      console.log(error);
    }
  },

  name: 'autorole-disable',
  description: 'Disable the auto-role system in this server',
  permissionsRequired: [PermissionFlagsBits.Administrator],
};