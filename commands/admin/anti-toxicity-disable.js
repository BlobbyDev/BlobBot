const { Client, Interaction, PermissionFlagsBits } = require('discord.js');
const AntiToxicity = require('../../models/antiToxicity');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    try {

      if (!(await AntiToxicity.exists({ guildId: interaction.guild.id }))) {
        interaction.reply({content: 'Anti-toxicity was not been configured for this server. Run **`/anti-toxicity-configure`** to set it up.', ephemeral: true});
        return;
      }

      await AntiToxicity.findOneAndDelete({ guildId: interaction.guild.id });
      interaction.reply('Anti-toxicity has been disabled for this server. Run **`/anti-toxicity-configure`** to set it up again.');
    } catch (error) {
      console.log(error);
    }
  },

  name: 'anti-toxicity-disable',
  description: 'Disable the anti-toxicity system in this server',
  permissionsRequired: [PermissionFlagsBits.Administrator],
};