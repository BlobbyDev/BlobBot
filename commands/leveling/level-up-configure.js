const { ApplicationCommandOptionType, ChannelType, EmbedBuilder, Client, Interaction, PermissionFlagsBits } = require('discord.js');
const LevelUp = require('../../models/levelUp');
const LevelingEnable = require('../../models/levelingEnabledGuild');

module.exports = {
    /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

    callback: async(client, interaction) => {
      
        const levelUpChannel = interaction.options.getChannel("channel");

        const embed = new EmbedBuilder()
        .setTitle('Level up channel configured successfully')
        .addFields(
            {name: 'Channel', value: `${levelUpChannel} (${levelUpChannel.id})`},
            {name: 'Configured Admin', value: `${interaction.user} (${interaction.user.id})`}
        )
        .setFooter({text: 'To change the channel run "/level-up-disable" and run "/level-up-configure" again'})
        .setTimestamp()
        
        try {

          if (!(await LevelingEnable.exists({ guildId: interaction.guild.id }))) {
            interaction.reply({ content: 'Leveling was not enabled for this server. Run **`/leveling-enable`** to set it up.', ephemeral: true });
            return;
          }

            let levelUp = await LevelUp.findOne({ guildId: interaction.guild.id });
      
            if (levelUp) {
              if (levelUp.guildId === interaction.guild.id) {
                interaction.reply({
                  content: 'Level up channel has already been configured for this server. To disable run `/level-up-disable` and set it up again by running `/level-up-configure`',
                  ephemeral: true
                });
                
                return;
              }
      
            } else {
              levelUp = new LevelUp({
                guildId: interaction.guild.id,
                channelId: levelUpChannel.id,
              });
            }
      
            await levelUp.save();
            await interaction.reply({embeds: [embed]})
            
            
          } catch (error) {
            console.log(error);
        }
    },

    name: 'level-up-configure',
    description: 'Configure channel for me to send level up messages for this server.',
    options: [
        {
            name: 'channel',
            description: 'Channel you want the level up messages to be in',
            type: ApplicationCommandOptionType.Channel,
            required: true,
            channelTypes: [ChannelType.GuildText],
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.SendMessages],

}