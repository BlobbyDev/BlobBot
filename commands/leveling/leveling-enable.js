const { Client, Interaction, PermissionFlagsBits } = require('discord.js');
const LevelingEnable = require('../../models/levelingEnabledGuild');

module.exports = {
    /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
    callback: async (client, interaction) => {
        
        try {

            let levelingEnable = await LevelingEnable.findOne({ guildId: interaction.guild.id });
      
            if (levelingEnable) {
              if (levelingEnable.guildId === interaction.guild.id) {
                interaction.reply({
                  content: 'Leveling has already been enabled in this server [Run **`/leveling-disable`** to disable it]',
                  ephemeral: true
                });
                
                return;
              }
      
            } else {

              levelingEnable = new LevelingEnable({
                guildId: interaction.guild.id,
              });
              
            }
      
            await levelingEnable.save();
            await interaction.reply({content: 'Leveling has been **enabled** in this server [Run **`/leveling-disable`** to disable it]'})
            
            
          } catch (error) {
            console.log(error);
        }
    },

    name: 'leveling-enable',
    description: 'Enable levelling for this server.',
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.SendMessages],
}