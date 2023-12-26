const { Client, Interaction, EmbedBuilder } = require('discord.js');
const User = require('../../models/user');
const emoji = require('../../utils/emojis.json');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {

    try {

      await interaction.guild.members.fetch();
      const topUsers  = await User.find({}).sort({ balance: -1 }).limit(10);

      const guildTopUsers = topUsers.filter(user => {
        const member = interaction.guild.members.cache.get(user.userId);
        return member !== undefined;
      });

      if (!guildTopUsers) {
        interaction.reply({content: `Nobody in this server have an account. [Run **/daily** to open an account and earn coins]`, ephemeral: true})
      }

      const leaderboardEmbed = new EmbedBuilder()
      .setTitle(`${interaction.guild.name}'s Leaderboard [Coins]`)
      .setThumbnail(interaction.guild.iconURL({dynamic: true, size: 1024}))
      .setTimestamp()
      .setDescription(`Top 10 members based on number of ${emoji.coin}`)
      .addFields(guildTopUsers.map((user, index) => ({
        name: `${index + 1}. ${client.users.cache.get(user.userId)?.tag || 'Unknown User'} (${client.users.cache.get(user.userId)?.id || 'Unknown User'})`,
        value: `**Balance:** ${emoji.coin} ${user.balance}`,
        inline: false,
      })));
        

      interaction.reply({ embeds: [leaderboardEmbed] });
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      interaction.reply('An error occurred while fetching the leaderboard.');
    }
  },

  name: 'richest',
  description: 'See the top 10 richest users in the server',
};
