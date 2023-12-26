const { Client, Interaction, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const User = require('../../models/user');
const Inventory = require('../../models/inventory');
const emoji = require('../../utils/emojis.json');

module.exports = {
  /**
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    try {
      if (!(await User.exists({ userId: interaction.user.id }))) {
        interaction.reply({ content: 'You dont have an account. Run **`/daily`** to create an account.', ephemeral: true });
        return;
      }

      const inventoryExists = await Inventory.exists({ userId: interaction.user.id });

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

      await interaction.reply({ content: `Are you sure you want to remove all your ${emoji.coin} & items and delete your economy account?`, components: [buttons], ephemeral: true});

      const collector = interaction.channel.createMessageComponentCollector({
        filter: i => i.isButton(),
        time: 120000,
      });

      collector.on('collect', async i => {
        try {
          if (i.customId === 'yes') {
            if (inventoryExists) {
                await Inventory.findOneAndDelete({ userId: interaction.user.id });
            }
            await User.findOneAndDelete({ userId: interaction.user.id });
        await interaction.editReply({ content: `All your ${emoji.coin} & items has been cleared and your economy account has been deleted. [If you want to create an account again run **/daily**]`, components: [], ephemeral: true });
          } else if (i.customId === 'no') {
            await interaction.editReply({ content: 'Process cancelled', components: [], ephemeral: true });
          }
        } finally {
          collector.stop();
        }
      });

      collector.on('end', collected => {
        if (collected.size === 0) {
          interaction.editReply({ content: 'Interaction timed out. Run **`/delete-account`** again to restart the process', components: [], ephemeral: true });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },

  name: 'delete-account',
  description: 'Delete your economy account'
};