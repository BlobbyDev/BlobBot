const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const User = require('../../models/user');
const emoji = require('../../utils/emojis.json');

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {

    const targetUserId = interaction.options.get('user')?.value || interaction.member.id;
    const targetUserObj = await interaction.guild.members.fetch(targetUserId);

    if (targetUserObj.user.bot) {
      interaction.reply ({
        content: 'Bots cannot open an account so no balance available',
        ephemeral: true
      })
      return;
    }

    
    const user = await User.findOne({ userId: targetUserId });

    if (!user) {
      interaction.reply({content: "User don't have an account [Run **/daily** to open an account]", ephemeral: true});
      return;
    }

    const embed = new EmbedBuilder()
    .setThumbnail(targetUserObj.user.displayAvatarURL({ dynamic: true, size:  1024 }))
    .setTitle(`${targetUserObj.user.displayName} - Balance`)
    .addFields(
      {name: 'Amount', value:`${emoji.coin} ${user.balance}`}
    )
    .setTimestamp()

    await interaction.reply({embeds: [embed]});
  },

  name: 'balance',
  description: "See yours/someone else's balance",
  options: [
    {
      name: 'user',
      description: 'The user whose balance you want to get.',
      type: ApplicationCommandOptionType.User,
    },
  ],
};