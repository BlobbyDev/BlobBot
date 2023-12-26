const { ActivityType } = require('discord.js')

module.exports = async (client) => {
    client.user.setPresence({
        activities: [{ name: `/help | @${client.user.username}`, type: ActivityType.Listening }],
        status: 'online',
    });
}