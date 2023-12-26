const { ApplicationCommandOptionType, ChannelType, Message, EmbedBuilder, Client, Interaction, PermissionFlagsBits } = require('discord.js');
const LeaveLog = require('../../models/leaveLog');

module.exports = {
    /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

    callback: async(client, interaction) => {

        const leaveChannel = interaction.options.getChannel("channel");
        const leaveMessage = interaction.options.getString("leave-message");

        if (leaveMessage.length > 1024) {
          return interaction.reply({content: `Please keep \`leave-message\` under **1024** characters`, ephemeral: true})
        }

        const embed = new EmbedBuilder()
        .setTitle('Leave-Logs configured successfully')
        .addFields(
            {name: 'Channel', value: `${leaveChannel} (${leaveChannel.id})`, inline: false},
            {name: 'Leave Message', value: `${leaveMessage}`, inline: false},
            {name: 'Configured Admin', value: `${interaction.user} (${interaction.user.id})`, inline: false},
        )
        .setFooter({text: 'To change the channel run "/leave-disable" and run "/leave-configure" again'})
        .setTimestamp()
        
        try {

            let leaveLog = await LeaveLog.findOne({ guildId: interaction.guild.id });
      
            if (leaveLog) {
              if (leaveLog.guildId === interaction.guild.id) {
                interaction.reply({
                  content: 'Leave-logs has already been configured for this server. To disable run `/leave-disable` and set it up again by running `/leave-configure`',
                  ephemeral: true
                });
                
                return;
              }
      
            } else {
              leaveLog = new LeaveLog({
                guildId: interaction.guild.id,
                channelId: leaveChannel.id,
                message: leaveMessage,
              });
            }
      
            await leaveLog.save();
            await interaction.reply({embeds: [embed]})
            
            
          } catch (error) {
            console.log(error);
        }
    },

    name: 'leave-configure',
    description: 'Configure member leave-log system for this server.',
    options: [
        {
            name: 'channel',
            description: 'Channel you want the leave messages to be in',
            type: ApplicationCommandOptionType.Channel,
            required: true,
            channelTypes: [ChannelType.GuildText],
        },
        {
            name: 'leave-message',
            description: 'Message that you want to send in leave-log embed',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.SendMessages],

}