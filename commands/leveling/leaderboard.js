const { EmbedBuilder } = require('@discordjs/builders');
const {
    Client,
    Interaction
} = require('discord.js');
const Level = require('../../models/level');
const LevelingEnable = require('../../models/levelingEnabledGuild');

module.exports = {
    /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

    callback: async(client, interaction) => {
        
        try {
            const guildId = interaction.guild.id;
          
            const leaderboard = await Level.find({ guildId }).sort({ level: -1, xp: -1 }).limit(10);
            const guildMembers = await interaction.guild.members.fetch();
          
            const embed = new EmbedBuilder()
            .setTitle(`${interaction.guild.name} Leaderboard [Levels]`)
            .setDescription('Top 10 members based on level and XP')
            .setThumbnail(interaction.guild.iconURL({dynamic: true, size: 1024}))
            .setTimestamp()

            if (!(await LevelingEnable.exists({ guildId: interaction.guild.id }))) {
                interaction.reply({ content: 'Leveling was not enabled for this server. Run **`/leveling-enable`** to set it up.', ephemeral: true });
                return;
            }
          
            leaderboard.forEach((user, index) => {
        
                const member = guildMembers.get(user.userId);
                const username = member ? member.user.username : 'Unknown User';
        
                embed.addFields({ name: `${index + 1}. ${username} (${user.userId})`, value: `Level: ${user.level} | XP: ${user.xp}` });
            });
        
            interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            interaction.reply('An error occurred while fetching the leaderboard.');
        }
    },
    name: 'leaderboard',
    description: "Shows top 10 users with highest levels in this server",
}