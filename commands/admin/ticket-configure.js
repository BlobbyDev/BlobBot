const { ApplicationCommandOptionType, Client, Interaction, PermissionFlagsBits, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, GuildAuditLogsEntry } = require('discord.js');
const TicketSystem = require('../../models/ticketSystem');

module.exports = {
    /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

    callback: async(client, interaction) => {

        try {
            const title = interaction.options.getString('panel-title') || 'Ticket Panel';
            const msg = interaction.options.getString('panel-description') || 'Click 🎟️ to create a ticket';
            const buttonText = interaction.options.getString('panel-button-label') || 'Create Ticket';
            const guild = interaction.guild.id;
            const panel = interaction.options.getChannel('channel');
            const category = interaction.options.getChannel('category');
            const role = interaction.options.getRole('support-role');
            const logs = interaction.options.getChannel('ticket-logs');

            let ticketSystem = await TicketSystem.findOne({guildId: guild});

            if(ticketSystem) return await interaction.reply({content: 'Ticket system has already been configured for this server. To disable run `/ticket-disable` and set it up again by running `/ticket-configure`', ephemeral: true})

            else {
                ticketSystem = new TicketSystem({
                    guildId: guild,
                    channelId: panel.id,
                    categoryId: category.id,
                    roleId: role.id,
                    logs: logs.id,
                })

                await ticketSystem.save();

                const embed = new EmbedBuilder()
                .setTitle(`${title}`)
                .setDescription(`${msg}`)
                .setTimestamp()
                const button = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('ticket')
                    .setLabel(`${buttonText}`)
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji(`🎟️`)
                )

                const channel = client.channels.cache.get(panel.id);
                const message = await channel.send({embeds: [embed], components: [button]})
                await message.pin();
                await interaction.reply({content: `${interaction.user} Ticket system configured successfully, ticket panel in ${channel}`})

            }
        } catch (error) {
            console.log(error);
        }

    },

    name: 'ticket-configure',
    description: 'Configure ticket system for this server.',
    options: [
        {
        name: 'channel',
        description: 'Channel you want me to send the ticket panel to',
        type: ApplicationCommandOptionType.Channel,
        required: true,
        channelTypes: [ChannelType.GuildText],
        },
        {
            name: 'category',
            description: 'The category you want me to send the tickets in',
            type: ApplicationCommandOptionType.Channel,
            required: true,
            channelTypes: [ChannelType.GuildCategory],
        },
        {
            name: 'support-role',
            description: 'Support role [Role given to mods, helpers or support team]',
            type: ApplicationCommandOptionType.Role,
            required: true,
        },
        {
            name: 'ticket-logs',
            description: 'Channel you want me to post ticket logs',
            type: ApplicationCommandOptionType.Channel,
            required: true,
            channelTypes: [ChannelType.GuildText],
        },
        {
            name: 'panel-title',
            description: 'Title that you wanna give to your ticket panel',
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'panel-description',
            description: 'Description that you wanna give to your ticket panel',
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'panel-button-label',
            description: 'The desired label for the button on the ticket panel',
            type: ApplicationCommandOptionType.String,
        },

    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.ManageChannels],
}