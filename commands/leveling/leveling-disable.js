const { Client, Interaction, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const LevelingEnable = require('../../models/levelingEnabledGuild');
const Level = require('../../models/level');
const LevelUpChannel = require('../../models/levelUp');

module.exports = {
  /**
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    try {
      if (!(await LevelingEnable.exists({ guildId: interaction.guild.id }))) {
        interaction.reply({ content: 'Leveling was not enabled for this server. Run **`/leveling-enable`** to set it up.', ephemeral: true });
        return;
      }

      const levelExists = await Level.exists({ guildId: interaction.guild.id });
      const LevelUpChannelExists = await LevelUpChannel.exists({ guildId: interaction.guild.id });

      const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setCustomId('yes')
        .setLabel('Yes')
        .setStyle(ButtonStyle.Danger)
        .setEmoji('✅'),

        new ButtonBuilder()
        .setCustomId('no')
        .setLabel('No')
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('❌')
      );

      await interaction.reply({ content: `Are you sure you want to delete all the level data and disable leveling from this server?`, components: [buttons], ephemeral: true});

      const collector = interaction.channel.createMessageComponentCollector({
        filter: i => i.isButton(),
        time: 120000,
      });

      collector.on('collect', async i => {
        try {
          if (i.customId === 'yes') {
            if (levelExists) {
                await Level.deleteMany({ guildId: interaction.guild.id });
            }
            if (LevelUpChannelExists) {
                await LevelUpChannel.deleteMany({ guildId: interaction.guild.id });
            }
            await LevelingEnable.findOneAndDelete({ guildId: interaction.guild.id });
            await interaction.editReply({ content: 'All level data has been cleared from this server, and leveling has been disabled for this server.', components: [], ephemeral: true });
          } else if (i.customId === 'no') {
            await interaction.editReply({ content: 'Process cancelled', components: [], ephemeral: true });
          }
        } finally {
          collector.stop();
        }
      });

      collector.on('end', collected => {
        if (collected.size === 0) {
          interaction.editReply({ content: 'Interaction timed out. Run **`/leveling-disable`** again to restart the process', components: [], ephemeral: true });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  name: 'leveling-disable',
  description: 'Disable leveling in this server',
  permissionsRequired: [PermissionFlagsBits.Administrator],
};