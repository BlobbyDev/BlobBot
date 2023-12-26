const { ApplicationCommandOptionType, ChannelType, EmbedBuilder, Client, Interaction, PermissionFlagsBits } = require('discord.js');
const MessageLog = require('../../models/messageLog');

module.exports = {

  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

    callback: async (client, interaction) => {

        const messageChannel = interaction.options.getChannel("log-channel");
        const ignoreChannels = [];
        for (let i = 1; i <= 15; i++) {
        const ignoreChannelOption = interaction.options.getChannel(`ignore-channel-${i}`) || "‎";
        if (ignoreChannelOption) {
          ignoreChannels.push(ignoreChannelOption);
        }
        }

        let ignoreChannelIds = ignoreChannels.map(channel => channel.id).join(',');

        if (ignoreChannels.length === 0) {
          ignoreChannelIds = '';
        }

        const embed = new EmbedBuilder()
            .setTitle('Message-Logs configured successfully')
            .addFields(
                { name: 'Channel', value: `${messageChannel} (${messageChannel.id})` },
                { name: 'Configured Admin', value: `${interaction.user} (${interaction.user.id})` },
                { name: 'Ignored Channels', value: `${ignoreChannels}`, inline: true }
            )
            .setFooter({ text: 'To edit run "/message-log-disable" and run "/message-log-configure" again' })
            .setTimestamp();

            try {
              let messageLog = await MessageLog.findOne({ guildId: interaction.guild.id });
            
              if (messageLog) {
                if (messageLog.guildId === interaction.guild.id) {
                  interaction.reply({
                    content: 'Message-logs has already been configured for this server. To disable run `/message-log-disable` and set it up again by running `/message-log-configure`',
                    ephemeral: true
                  });
            
                  return;
                }
              } else {
            
                messageLog = new MessageLog({
                  guildId: interaction.guild.id,
                  channelId: messageChannel.id,
                  ignoredChannelId: ignoreChannelIds,
                });
            
                await messageLog.save();
                await interaction.reply({ embeds: [embed] });
              }
            } catch (error) {
              console.log(error);
            }

    },

    name: 'message-log-configure',
    description: 'Configure message-log system for this server.',
    options: [
        {
            name: 'log-channel',
            description: 'Channel you want me to log the reports',
            type: ApplicationCommandOptionType.Channel,
            required: true,
            channelTypes: [ChannelType.GuildText],
        },
        {
          name: 'ignore-channel-1',
          description: 'Channel you dont want me to read',
          type: ApplicationCommandOptionType.Channel,
          required: false,
          channelTypes: [ChannelType.GuildText],
        },
        {
          name: 'ignore-channel-2',
          description: 'Channel you dont want me to read',
          type: ApplicationCommandOptionType.Channel,
          required: false,
          channelTypes: [ChannelType.GuildText],
        },
        {
          name: 'ignore-channel-3',
          description: 'Channel you dont want me to read',
          type: ApplicationCommandOptionType.Channel,
          required: false,
          channelTypes: [ChannelType.GuildText],
        },
        {
          name: 'ignore-channel-4',
          description: 'Channel you dont want me to read',
          type: ApplicationCommandOptionType.Channel,
          required: false,
          channelTypes: [ChannelType.GuildText],
        },
        {
          name: 'ignore-channel-5',
          description: 'Channel you dont want me to read',
          type: ApplicationCommandOptionType.Channel,
          required: false,
          channelTypes: [ChannelType.GuildText],
        },
        {
          name: 'ignore-channel-6',
          description: 'Channel you dont want me to read',
          type: ApplicationCommandOptionType.Channel,
          required: false,
          channelTypes: [ChannelType.GuildText],
        },
        {
          name: 'ignore-channel-7',
          description: 'Channel you dont want me to read',
          type: ApplicationCommandOptionType.Channel,
          required: false,
          channelTypes: [ChannelType.GuildText],
        },
        {
          name: 'ignore-channel-8',
          description: 'Channel you dont want me to read',
          type: ApplicationCommandOptionType.Channel,
          required: false,
          channelTypes: [ChannelType.GuildText],
        },
        {
          name: 'ignore-channel-9',
          description: 'Channel you dont want me to read',
          type: ApplicationCommandOptionType.Channel,
          required: false,
          channelTypes: [ChannelType.GuildText],
        },
        {
          name: 'ignore-channel-10',
          description: 'Channel you dont want me to read',
          type: ApplicationCommandOptionType.Channel,
          required: false,
          channelTypes: [ChannelType.GuildText],
        },
        {
          name: 'ignore-channel-11',
          description: 'Channel you dont want me to read',
          type: ApplicationCommandOptionType.Channel,
          required: false,
          channelTypes: [ChannelType.GuildText],
        },
        {
          name: 'ignore-channel-12',
          description: 'Channel you dont want me to read',
          type: ApplicationCommandOptionType.Channel,
          required: false,
          channelTypes: [ChannelType.GuildText],
        },
        {
          name: 'ignore-channel-13',
          description: 'Channel you dont want me to read',
          type: ApplicationCommandOptionType.Channel,
          required: false,
          channelTypes: [ChannelType.GuildText],
        },
        {
          name: 'ignore-channel-14',
          description: 'Channel you dont want me to read',
          type: ApplicationCommandOptionType.Channel,
          required: false,
          channelTypes: [ChannelType.GuildText],
        },
        {
          name: 'ignore-channel-15',
          description: 'Channel you dont want me to read',
          type: ApplicationCommandOptionType.Channel,
          required: false,
          channelTypes: [ChannelType.GuildText],
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
};
