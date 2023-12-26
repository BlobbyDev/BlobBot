const { Client, GuildMember, EmbedBuilder } = require('discord.js');
const WelcomeLog = require('../../models/welcomeLog');

/**
 *
 * @param {Client} client
 * @param {GuildMember} member
 */

 module.exports = async (client, member) => {
    try {
      let guild = member.guild;
      if (!guild) return;
  
      const data = await WelcomeLog.findOne({ guildId: guild.id });
      if (!data) return;

      let channel = data.channelId;
      let msg = data.message;
      
      const { user } = member;
      const welcomeChannel = member.guild.channels.cache.get(channel);

      const embed = new EmbedBuilder()
      .setTitle(`Joined`)
      .setAuthor({name: `${member.user.tag}`})
      .setDescription(`${msg}`)
      .addFields(
        {name: 'Creation Date', value: `<t:${(member.user.createdTimestamp/1000).toFixed(0)}:f>\n(<t:${(member.user.createdTimestamp/1000).toFixed(0)}:R>)`, inline: false}
      )
      .setFooter({text: `Member Count: ${guild.memberCount}`})
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setTimestamp()
      await welcomeChannel.send({content: `${member}`, embeds: [embed]});
    } catch (error) {
      console.log(`Error in welcome-log system: ${error}`);
    }
  };