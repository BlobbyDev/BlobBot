const { ApplicationCommandOptionType, ChannelType, EmbedBuilder, Client, Interaction, PermissionFlagsBits } = require('discord.js');
const AntiToxicity = require('../../models/antiToxicity');

module.exports = {

  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

    callback: async (client, interaction) => {

        const set = interaction.options.getNumber('tolerance')
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

        if (set < 1 || set > 100) {
          return interaction.reply({content: `The severity scale must be in between 1 and 100 [70 is advised]`, ephemeral: true})
        }

        const bypassRole = interaction.options.get('bypass-role')?.value || "None";

        const embed = new EmbedBuilder()
            .setTitle('Anti toxicity configured successfully')
            .addFields(
                { name: "Severity", value: `${set}%`, inline: false},
                { name: 'Channel', value: `${messageChannel} (${messageChannel.id})`, inline: false},
                { name: 'Configured Admin', value: `${interaction.user} (${interaction.user.id})`, inline: false},
                { name: 'Bypass Role', value: `<@&${bypassRole}>`, inline: false},
                { name: 'Ignored Channels', value: `${ignoreChannels}`, inline: true }
            )
            .setFooter({ text: 'To edit run "/anti-toxicity-disable" and run "/anti-toxicity-configure" again' })
            .setTimestamp()

            try {
              let antiToxicity = await AntiToxicity.findOne({ guildId: interaction.guild.id });
            
              if (antiToxicity) {
                if (antiToxicity.guildId === interaction.guild.id) {
                  interaction.reply({
                    content: 'Anti-toxicity has already been configured for this server. To disable run `/anti-toxicity-disable` and set it up again by running `/anti-toxicity-configure`',
                    ephemeral: true
                  });
            
                  return;
                }
              } else {
            
                antiToxicity = new AntiToxicity({
                  guildId: interaction.guild.id,
                  channelId: messageChannel.id,
                  severity: set,
                  ignoredChannelId: ignoreChannelIds,
                  bypassRoleId: bypassRole
                });
            
                await antiToxicity.save();
                await interaction.reply({ embeds: [embed] });
              }
            } catch (error) {
              console.log(error);
            }

    },

    name: 'anti-toxicity-configure',
    description: 'Configure anti-toxicity system for this server.',
    options: [
        {
          name: 'tolerance',
          description: "On a scale of 1 to 100 of toxicity how much does this server can tolerate? [I'd advice 70]",
          type: ApplicationCommandOptionType.Number,
          required: true,
          channelTypes: [ChannelType.GuildText],
        },
        {
          name: 'log-channel',
          description: 'Channel you want me to log the reports',
          type: ApplicationCommandOptionType.Channel,
          required: true,
          channelTypes: [ChannelType.GuildText],
        },
        {
          name: 'bypass-role',
          description: 'People will this role can bypass the system',
          type: ApplicationCommandOptionType.Role,
          required: false,
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
    botPermissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.ManageMessages],
};