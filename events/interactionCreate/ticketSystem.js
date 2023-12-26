const { ApplicationCommandOptionType, Client, Interaction, PermissionFlagsBits, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, GuildAuditLogsEntry } = require('discord.js');
const  TicketSystem = require('../../models/ticketSystem');
/**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   * @param {Channel} channel
   */

module.exports = async(client, interaction, channel) => {
    try {
        if (interaction.isButton()) {
            if(interaction.customId === 'ticket') {
                let data = await TicketSystem.findOne({
                    guildId: interaction.guild.id,
                });
                if (!data) return await interaction.reply({content: `Ticket system was not configured in this server or an admin might have disabled the ticket system you can configure it by running **\`/ticket-configure\`**`, ephemeral: true})

                const role = interaction.guild.roles.cache.get(data.roleId);
                const category = data.categoryId; 
                const posChannel = interaction.guild.channels.cache.find(c => c.topic && c.topic.includes(`Ticket by: ${interaction.user.id}`))

                if (posChannel) {
                    return await interaction.reply({content: `You have already opened a ticket in <#${posChannel.id}> or the support team might not have deleted that channel`, ephemeral: true})
                }

                await interaction.guild.channels.create({
                    name: `ticket-${interaction.user.username}`,
                    parent: category,
                    type: ChannelType.GuildText,
                    topic: `Ticket by: ${interaction.user.id}`,
                    permissionOverwrites: [

                        {
                            id: interaction.guild.id,
                            deny: ["ViewChannel"]
                        },
                        {
                            id: role,
                            allow: ["ViewChannel", "SendMessages", "ReadMessageHistory"]
                        },
                        {
                            id: interaction.user.id,
                            allow: ["ViewChannel", "SendMessages", "ReadMessageHistory"]
                        },
                        {
                            id: client.user.id,
                            allow: ["ViewChannel", "SendMessages", "ReadMessageHistory"]
                        }
                    ]
                }).then(async (channel) => {

                    let data = await TicketSystem.findOne({guildId: interaction.guild.id});

                    const openEmbed = new EmbedBuilder()
                    .setTitle('Ticket Opened')
                    .setDescription(`Welcome to your ticket **${interaction.user.username}**\nReact 🔒 to close the ticket`)
                    .setTimestamp()
                    .setFooter({text: `${interaction.guild.name}'s Ticket`})

                    const closeButton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId('closeticket')
                        .setLabel('Close')
                        .setStyle(ButtonStyle.Danger)
                        .setEmoji('🔒')
                    )

                    const openLogsEmbed = new EmbedBuilder()
                    .setTitle(`Ticket Opened`)
                    .addFields(
                        {name: 'Opened by', value: `${interaction.user.username} (${interaction.user.id})`},
                        {name: 'Opened Channel', value: `${channel.name} (${channel.id})`}
                    )
                    .setTimestamp()

                    const message = await channel.send({content: `${interaction.user} ${role}`, embeds: [openEmbed], components: [closeButton]})
                    await message.pin();
                    await interaction.reply({content: `Ticket created in <#${channel.id}>`, ephemeral: true})
                    await interaction.guild.channels.cache.get(data.logs).send({embeds: [openLogsEmbed]})
                    
                })
            }

            if (interaction.customId === 'closeticket') {
                const closingEmbed = new EmbedBuilder()
                .setDescription(`Are you sure you want to close this ticket?`)
                .setColor('Red')

                const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('yesclose')
                    .setLabel('Yes')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('✅'),

                    new ButtonBuilder()
                    .setCustomId('nodont')
                    .setLabel('No')
                    .setStyle(ButtonStyle.Secondary)
                    .setEmoji('❌')
                )


                await interaction.reply({embeds: [closingEmbed], components: [buttons]})
            }

            if(interaction.customId === 'yesclose') {
                let data = await TicketSystem.findOne({guildId: interaction.guild.id});

                const messages = await interaction.channel.messages.fetch();
                const sortedMessages = messages.sort((a, b) => a.createdTimestamp - b.createdTimestamp);
                const transcript = sortedMessages.map(message => `[${message.createdAt.toUTCString()}] ${message.author.tag} (${message.author.id}): ${message.content}`).join('\n');

                const closeLogsEmbed = new EmbedBuilder()
                .setTitle(`Ticket Closed`)
                .setDescription('A transcript of the conversation has been attached')
                .addFields(
                    { name: 'Closed by', value: `${interaction.user.username} (${interaction.user.id})` },
                    { name: 'Closed Channel', value: `${interaction.channel.name} (${interaction.channel.id})` }
                )
                .setTimestamp();
                
                if (interaction.member.roles.cache.has(data.roleId) || interaction.guild.ownerId === interaction.user.id || interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {

                    await interaction.reply('Deleting channel in 10 seconds ...');
                    setTimeout(() => {
                        interaction.channel.delete();
                    }, 10000);

                    await interaction.guild.channels.cache.get(data.logs).send({ embeds: [closeLogsEmbed], files: [{ name: 'transcript.txt', attachment: Buffer.from(transcript, 'utf-8') }] });

                } else {
            
                    await interaction.channel.permissionOverwrites.edit(interaction.user.id, {
                        ViewChannel: false,
                        SendMessages: false,
                        ReadMessageHistory: false
                    });

                    await interaction.reply(`${interaction.user} (\`${interaction.user.username}\`) has closed the ticket, click **"✅ Yes"** in above the message to delete this channel`)
            
                }
            
            }

            if(interaction.customId === 'nodont') {
                await interaction.reply('Ticket closing cancelled')
            }
        }
    } catch (error) {
      console.log(`Error in ticket system: ${error}`);
    }
}
