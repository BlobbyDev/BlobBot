const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    EmbedBuilder,
    PermissionFlagsBits,
    ChannelType
} = require('discord.js');

module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

     callback: async (client, interaction) => {
        const channel = interaction.options.getChannel('channel') || interaction.channel;
        const duration = interaction.options.getNumber('duration');


        if (duration > 21600) {
            return interaction.reply({
              content: 'Slowmode duration must be below 6 hours.',
              ephemeral: true,
            });
        }

        const embed = new EmbedBuilder()
        .setTitle('Slowmode configured sucessfully')
        .addFields(
            {name: 'Channel', value: `${channel}`, inline: false},
            {name: 'Duration', value: `\`${duration}\` Seconds`, inline: false}
        )
        .setTimestamp()

        await channel.setRateLimitPerUser(duration)
        await interaction.reply({embeds: [embed]})
    },
    name: 'slowmode',
    description: 'Sets up the slowmode in any time you want in any channel',
    options: [
      {
        name: 'duration',
        description: 'Time you want me to slowmode [in seconds]',
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
      {
        name: 'channel',
        description: 'Channel you want to slowmode',
        type: ApplicationCommandOptionType.Channel,
        channelTypes: [ChannelType.GuildText],
        required: false,
      },
    ],
    permissionsRequired: [PermissionFlagsBits.ManageChannels],
    botPermissions: [PermissionFlagsBits.ManageChannels],
}