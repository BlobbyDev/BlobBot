const path = require('path');
const getAllFiles = require('../utils/getAllFiles');
const Discord = require('discord.js');

module.exports = async (client, Discord, guild, ban) => {
  const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

  for (const eventFolder of eventFolders) {
    let eventFiles = getAllFiles(eventFolder);
    eventFiles.sort();

    const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();

    client.on(eventName, async (...args) => {
      for (const eventFile of eventFiles) {
        const eventFunction = require(eventFile);
        await eventFunction(client, ...args, guild, Discord, ban);
      }
    });
  }
};
