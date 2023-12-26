const { ApplicationCommandOptionType, ChannelType, Message, EmbedBuilder, Client, Interaction, PermissionFlagsBits } = require('discord.js');
const WelcomeLog = require('../../models/welcomeLog');

module.exports = {
    /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

    callback: async(client, interaction) => {

        const welcomeChannel = interaction.options.getChannel("channel");
        const welcomeMessage = interaction.options.getString("welcome-message");

        if (welcomeMessage.length > 1024) {
          return interaction.reply({content: `Please keep \`welcome-message\` under **1024** characters`, ephemeral: true})
        }

        const embed = new EmbedBuilder()
        .setTitle('Welcome-Logs configured successfully')
        .addFields(
            {name: 'Channel', value: `${welcomeChannel} (${welcomeChannel.id})`, inline: false},
            {name: 'Welcome Message', value: `${welcomeMessage}`, inline: false},
            {name: 'Configured Admin', value: `${interaction.user} (${interaction.user.id})`, inline: false}
        )
        .setFooter({text: 'To change the channel run "/welcome-disable" and run "/welcome-configure" again'})
        .setTimestamp()
        
        try {

            let welcomeLog = await WelcomeLog.findOne({ guildId: interaction.guild.id });
      
            if (welcomeLog) {
              if (welcomeLog.guildId === interaction.guild.id) {
                interaction.reply({
                  content: 'Welcome-logs has already been configured for this server. To disable run `/welcome-disable` and set it up again by running `/welcome-configure`',
                  ephemeral: true
                });
                
                return;
              }
      
            } else {
              welcomeLog = new WelcomeLog({
                guildId: interaction.guild.id,
                channelId: welcomeChannel.id,
                message: welcomeMessage,
              });
            }
      
            await welcomeLog.save();
            await interaction.reply({embeds: [embed]})
            
            
          } catch (error) {
            console.log(error);
        }
    },

    name: 'welcome-configure',
    description: 'Configure welcome-log system for this server.',
    options: [
        {
            name: 'channel',
            description: 'Channel you want the welcome messages',
            type: ApplicationCommandOptionType.Channel,
            required: true,
            channelTypes: [ChannelType.GuildText],
        },
        {
            name: 'welcome-message',
            description: 'Message that you want to send in welcome embed',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.SendMessages],

}