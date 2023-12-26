const { Client, Interaction, PermissionFlagsBits } = require('discord.js');
const TicketSystem = require('../../models/ticketSystem');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction, messages) => {
    try {

      if (!(await TicketSystem.exists({ guildId: interaction.guild.id }))) {
        interaction.reply({content: 'Ticket was not been configured for this server. Run **`/ticket-configure`** to set it up.', ephemeral: true});
        return;
      }

      await TicketSystem.findOneAndDelete({ guildId: interaction.guild.id });
      interaction.reply('Ticket system has been disabled for this server. Run **`/ticket-configure`** to set it up again.');
    } catch (error) {
      console.log(error);
    }
  },

  name: 'ticket-disable',
  description: 'Disable the ticket system in this server',
  permissionsRequired: [PermissionFlagsBits.Administrator],
};