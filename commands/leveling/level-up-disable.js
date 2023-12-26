const { Client, Interaction, PermissionFlagsBits } = require('discord.js');
const LevelUp = require('../../models/levelUp');
const LevelingEnable = require('../../models/levelingEnabledGuild');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    try {

      if (!(await LevelingEnable.exists({ guildId: interaction.guild.id }))) {
        interaction.reply({ content: 'Leveling was not enabled for this server. Run **`/leveling-enable`** to set it up.', ephemeral: true });
        return;
      }

      if (!(await LevelUp.exists({ guildId: interaction.guild.id }))) {
        interaction.reply({content: 'Level up channel  was not been configured for this server. Run **`/level-up-configure`** to set it up.', ephemeral: true});
        return;
      }

      
      await LevelUp.findOneAndDelete({ guildId: interaction.guild.id });
      interaction.reply('Level up messages has been disabled for this server. Run **`/level-up-configure`** to set it up again.');
    } catch (error) {
      console.log(error);
    }
  },

  name: 'level-up-disable',
  description: 'Disable the level up messages in this server',
  permissionsRequired: [PermissionFlagsBits.Administrator],
};