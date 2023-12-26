const { EmbedBuilder } = require('@discordjs/builders');
const { ApplicationCommandOptionType, Client, Interaction, PermissionFlagsBits } = require('discord.js');
const AutoRole = require('../../models/autoRole');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {

    const targetRoleId = interaction.options.get('role').value;

    const embed = new EmbedBuilder()
    .setTitle('Auto-Role configured successfully')
    .addFields(
      {name: 'Role', value: `<@&${targetRoleId}> (${targetRoleId})`},
      {name: 'Configured Admin', value: `${interaction.user} (${interaction.user.id})`}
    )
    .setFooter({text: 'To change the role run "/autorole-disable" and run "/autorole-configure" again'})
    .setTimestamp()

    try {

      let autoRole = await AutoRole.findOne({ guildId: interaction.guild.id });

      if (autoRole) {
        if (autoRole) {
          interaction.reply({
            content: `Auto-role was already been configured for the role <@&${autoRole.roleId}> in this server. To change run \`/autorole-disable\` and set it up again by running \`/autorole-configure\``,
            ephemeral: true,
            allowedMentions: { parse: []}
          });
          
          return;
        }

        autoRole.roleId = targetRoleId;
      } else {
        autoRole = new AutoRole({
          guildId: interaction.guild.id,
          roleId: targetRoleId,
        });
      }

      await autoRole.save();
      interaction.reply({embeds: [embed]});
    } catch (error) {
      console.log(error);
    }
  },

  name: 'autorole-configure',
  description: 'Configure auto-role system for this server.',
  options: [
    {
      name: 'role',
      description: 'Role you wanna give to the new members',
      type: ApplicationCommandOptionType.Role,
      required: true,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.ManageRoles],
};