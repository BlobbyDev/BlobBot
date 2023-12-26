const { Client, Message } = require('discord.js');
const calculateLevelXp = require('../../utils/calculateLevelXp');
const Level = require('../../models/level');
const LevelUpChannel = require('../../models/levelUp');
const LevelingEnable = require('../../models/levelingEnabledGuild');
const cooldowns = new Set();

function getRandomXp(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = async (client, message) => {
  if (message.author.bot || cooldowns.has(message.author.id)) return;

  try {
    let guild = message.guild;
    if (!guild) return;

    const levelingEnableGuild = await LevelingEnable.findOne({ guildId: message.guild.id });
    if (!levelingEnableGuild) return;

    const xpToGive = getRandomXp(5, 15);

    const query = {
      userId: message.author.id,
      guildId: message.guild.id,
    };

    const level = await Level.findOne(query);

    if (level) {
      level.xp += xpToGive;

      if (level.xp > calculateLevelXp(level.level)) {
        level.xp = 0;
        level.level += 1;

        const levelUpChannel = await LevelUpChannel.findOne({ guildId: guild.id });
        if (levelUpChannel) {
          const channel = message.guild.channels.cache.get(levelUpChannel.channelId);
    
          if (channel) {
            await channel.send({ content: `Congratulations ${message.author} (${message.author.tag}). You've reached level **${level.level}**.`, allowedMentions: { parse: [] } })
          }
        }
      }

      await level.save().catch((e) => {
        console.log(`Error saving updated level ${e}`);
        return;
      });
      cooldowns.add(message.author.id);
      setTimeout(() => {
        cooldowns.delete(message.author.id);
      }, 10000);
    }

    else {

      const newLevel = new Level({
        userId: message.author.id,
        guildId: message.guild.id,
        xp: xpToGive,
      });

      await newLevel.save();
      cooldowns.add(message.author.id);
      setTimeout(() => {
        cooldowns.delete(message.author.id);
      }, 60000);
    }
  } catch (error) {
    console.log(`Error giving xp: ${error}`);
  }
};