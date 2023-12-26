const { Client, GuildMember, EmbedBuilder } = require('discord.js');
const MessageLog = require('../../models/messageLog');

/**
 *
 * @param {Client} client
 */

   module.exports = async (client, message) => {

    try {
      let guild = message.guild;
      if (!guild) return;
  
      const data = await MessageLog.findOne({ guildId: guild.id });
      if (!data) return;

      let channel = data.channelId;
      let ignoreChannels = data.ignoredChannelId ? data.ignoredChannelId.split(',') : [];
      loggingChannel = guild.channels.cache.get(channel);

      if (ignoreChannels.includes(message.channel.id)) return;

      if (message.content.length > 2500) {
        const transcriptContent = `Deleted Message Content:\n\n${message.content}`;

        const embed = new EmbedBuilder()
        .setTitle(`Message Deleted`)
        .setDescription('A transcript has been attached since the message was too long to display.')
        .addFields(
          { name: 'Channel', value: `${message.channel} (${message.channel.id})`, inline: false },
          { name: 'Message Link', value: `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id} (https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`, inline: false }
        )
        .setAuthor({ name: `${message.author.tag} (${message.author.id})`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
        .setTimestamp();

        if (message.attachments.size > 0) {
          const attachmentLinks = Array.from(message.attachments.values()).map(attachment => `[${attachment.name}](${attachment.url})`).join('\n');
          embed.addFields({name: 'Attachment', value: attachmentLinks});
        }

        await loggingChannel.send({ embeds: [embed], files: [{ name: `deletedMessage_${message.id}.txt`, attachment: Buffer.from(transcriptContent, 'utf-8') }] });
      } else {
        const embed = new EmbedBuilder()
        .setTitle(`Message Deleted`)
        .setDescription(`${message.content || "‎"}`)
        .addFields(
          {name: 'Channel', value: `${message.channel} (${message.channel.id})`, inline: false},
          {name: 'Message Link', value: `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id} (<https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}>)`, inline: false }
        )
        .setAuthor({ name: `${message.author.tag} (${message.author.id})`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}` })
        .setTimestamp()

        if (message.attachments.size > 0) {
          const attachmentLinks = Array.from(message.attachments.values()).map(attachment => `[${attachment.name}](${attachment.url})`).join('\n');
          embed.addFields({name: 'Attachment', value: attachmentLinks});
        }

        await loggingChannel.send({ embeds: [embed] });
      }  
      
    } catch (error) {
      console.log(`Error in message-log system: ${error}`);
    }

  };