const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    AttachmentBuilder,
} = require('discord.js');
const canvacord = require('canvacord');
const calculateLevelXp = require('../../utils/calculateLevelXp');
const Level = require('../../models/level');
const LevelingEnable = require('../../models/levelingEnabledGuild');
  
 module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {
  
      const mentionedUserId = interaction.options.get('target-user')?.value;
      const targetUserId = mentionedUserId || interaction.member.id;
      const targetUserObj = await interaction.guild.members.fetch(targetUserId);

      if (!(await LevelingEnable.exists({ guildId: interaction.guild.id }))) {
        interaction.reply({ content: 'Leveling was not enabled for this server. Run **`/leveling-enable`** to set it up.', ephemeral: true });
        return;
      }
  
      const fetchedLevel = await Level.findOne({
        userId: targetUserId,
        guildId: interaction.guild.id,
      });

      if (targetUserObj.user.bot) {
        interaction.reply({
          content: "Bots do not have a profile",
          ephemeral: true
        })
        return;
      }
  
      if (!fetchedLevel) {
        interaction.reply({
          content: mentionedUserId ? `**${targetUserObj} (${targetUserObj.user.id})** doesn't have any levels in this server yet, try again when they chat a little more in this server` : "You don't have any levels yet in this server, chat a little more in this server and try again.", ephemeral: true});
        return;
      }
  
      let allLevels = await Level.find({ guildId: interaction.guild.id }).select(
        '-_id userId level xp'
      );
  
      allLevels.sort((a, b) => {
        if (a.level === b.level) {
          return b.xp - a.xp;
        } else {
          return b.level - a.level;
        }
      });
  
      let currentRank = allLevels.findIndex((lvl) => lvl.userId === targetUserId) + 1;
  
      const rank = new canvacord.Rank()
      .setAvatar(targetUserObj.user.displayAvatarURL({ size: 256 }))
      .setRank(currentRank)
      .setLevel(fetchedLevel.level)
      .setCurrentXP(fetchedLevel.xp)
      .setRequiredXP(calculateLevelXp(fetchedLevel.level))
      .setProgressBar('#FFC300', 'COLOR')
      .setUsername(targetUserObj.user.username)
  
      const data = await rank.build();
      const attachment = new AttachmentBuilder(data);
      await interaction.reply({ files: [attachment] });
    },
  
    name: 'rank',
    description: "Shows your or someone's rank.",
    options: [
      {
        name: 'target-user',
        description: 'The user whose rank you want to see.',
        type: ApplicationCommandOptionType.User,
      },
    ],
  };