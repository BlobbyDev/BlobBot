const { Client, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const fs = require('fs').promises;
const path = require('path');
const MessageLog = require('../../models/messageLog');

/**
 * @param {Client} client
 * @param {Collection<string, Message>} messages
 */

module.exports = async (client, messages) => {
  try {
    const guild = messages.first()?.guild;
    if (!guild) return;

    if (!messages) return;

    const data = await MessageLog.findOne({ guildId: guild.id });
    if (!data) return;

    const channel = data.channelId;
    const ignoreChannels = data.ignoredChannelId ? data.ignoredChannelId.split(',') : [];
    const loggingChannel = guild.channels.cache.get(channel);

    if (ignoreChannels.includes(messages.first().channel.id)) return;

    const deletedMessages = messages.sort((a, b) => a.createdTimestamp - b.createdTimestamp);
    const transcript = deletedMessages.map(message => `[${message.createdAt.toUTCString()}] ${message.author.tag} (${message.author.id}): ${message.content}`).join('\n');

    const embed = new EmbedBuilder()
      .setTitle(`Bulk Message Deletion`)
      .setDescription(`Deleted ${messages.size} messages`)
      .addFields(
        { name: 'Channel', value: `${messages.first().channel} (${messages.first().channel.id})` },
        { name: '‎', value: `A transcript of the deleted messages has been attached`}
      )
      .setTimestamp();

    await loggingChannel.send({ embeds: [embed], files: [{ name: 'deletedMessages.txt', attachment: Buffer.from(transcript, 'utf-8') }] });
  } catch (error) {
    console.log(`Error in message-log system: ${error}`);
  }
};