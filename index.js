const { Client, IntentsBitField, Options, Collection } = require('discord.js');
const Discord = require('discord.js')
const mongoose = require('mongoose');

const eventHandler = require('./handlers/eventHandler');
require('dotenv').config()

const client = new Client({
  partials: ['message', 'channel', 'reaction', 'guild', 'interaction', 'member', 'role'], 
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  makeCache: Options.cacheWithLimits(Options.DefaultMakeCacheSettings),
  disableMentions: 'all',
});

client.commands = new Collection();
client.events = new Collection();

(async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Mongo DB');

    eventHandler(client, Discord);
    client.login(process.env.TOKEN);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();