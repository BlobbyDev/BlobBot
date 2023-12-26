const { Client, EmbedBuilder, Message } = require('discord.js');
const MessageLog = require('../../models/messageLog');

/**
 *
 * @param {Client} client
 * @param {Message} oldMessage
 * @param {Message} newMessage
 */

module.exports = async (client, oldMessage, newMessage) => {
  try {
    let guild = oldMessage.guild;
    if (!guild) return;
    
    if(!oldMessage.content) return;

    const data = await MessageLog.findOne({ guildId: guild.id });
    if (!data) return;

    let channel = data.channelId;
    let loggingChannel = guild.channels.cache.get(channel);
    let ignoreChannels = data.ignoredChannelId ? data.ignoredChannelId.split(',') : [];

    if (ignoreChannels.includes(oldMessage.channel.id)) return;

    if (oldMessage.content === newMessage?.content) return;

    if (oldMessage.content.length > 1024 || (newMessage?.content && newMessage?.content.length > 1024)) {

      const transcriptContent = `From:\n${oldMessage.content}\n\nTo:\n${newMessage?.content}`;
      const transcriptEmbed = new EmbedBuilder()
      .setTitle('Message Edited')
      .setDescription('A transcript has been created since the message is too long to be displayed here')
      .addFields(
        { name: 'Channel', value: `${oldMessage.channel} (${oldMessage.channel.id})`, inline: false },
        { name: 'Message Link', value: `https://discord.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id} (<https://discord.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id}>)`, inline: false }
      )
      .setAuthor({ name: `${oldMessage.author.tag} (${oldMessage.author.id})`, iconURL: oldMessage.author.displayAvatarURL({ dynamic: true }) })
      .setTimestamp();

      await loggingChannel.send({ embeds: [transcriptEmbed], files: [{ name: 'editedMessage.txt', attachment: Buffer.from(transcriptContent, 'utf-8') }] });

    } else {

      const embed = new EmbedBuilder()
      .setTitle('Message Edited')
      .addFields(
        { name: 'From', value: `${oldMessage.content}`, inline: false },
        { name: 'To', value: `${newMessage?.content}`, inline: false },
        { name: 'Channel', value: `${oldMessage.channel} (${oldMessage.channel.id})`, inline: false },
        { name: 'Message Link', value: `https://discord.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id} (<https://discord.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id}>)`, inline: false }
      )
      .setAuthor({ name: `${oldMessage.author.tag} (${oldMessage.author.id})`, iconURL: oldMessage.author.displayAvatarURL({ dynamic: true }) })
      .setTimestamp();

      await loggingChannel.send({ embeds: [embed] });

    }
  } catch (error) {
    console.error(`Error in message-log system: ${error}`);
  }
};
