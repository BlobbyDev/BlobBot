const { Client, Guild } = require('discord.js');

/**
 * @param {Client} client
 * @param {Guild} guild 
 */

module.exports = async (client, guild) => {
    const logChannel = client.channels.cache.get('1181971385443172383');
    await logChannel.send(`__**Added**__\n**Name:** ${guild.name} (${guild.id})\n**Member Count:** ${guild.memberCount} Members\n**Guild Count:** ${client.guilds.cache.size} Servers`)
};