const { Client, GuildMember, EmbedBuilder } = require('discord.js');
const LeaveLog = require('../../models/leaveLog');

/**
 *
 * @param {Client} client
 * @param {GuildMember} member
 */

 module.exports = async (client, member) => {
    try {
      let guild = member.guild;
      if (!guild) return;
  
      const data = await LeaveLog.findOne({ guildId: guild.id });
      if (!data) return;

      let channel = data.channelId;
      let msg = data.message;
      
      const { user } = member;
      const leaveChannel = member.guild.channels.cache.get(channel);
      const roles = member.roles.cache.map(role => role).join(", ");

      const embed = new EmbedBuilder()
      .setTitle(`Left`)
      .setAuthor({name: `${member.user.tag}`})
      .setDescription(`${msg}`)
      .addFields(
        {name: 'Creation Date', value: `<t:${(member.user.createdTimestamp/1000).toFixed(0)}:f>\n(<t:${(member.user.createdTimestamp/1000).toFixed(0)}:R>)`, inline: false},
        {name: 'Joined Server', value: `<t:${(member.joinedTimestamp/1000).toFixed(0)}:f>\n(<t:${(member.joinedTimestamp/1000).toFixed(0)}:R>)`, inline: false},
        {name: 'Roles', value: roles, inline: false}
      )
      .setFooter({text: `Member Count: ${guild.memberCount}`})
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setTimestamp()
      await leaveChannel.send({content: `${member}`, embeds: [embed]});
    } catch (error) {
      console.log(`Error in leave-log system: ${error}`);
    }
  };