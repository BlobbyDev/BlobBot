const { Client, Interaction, EmbedBuilder } = require('discord.js');
const User = require('../../models/user');
const moment = require('moment');
const emoji = require('../../utils/emojis.json');

const dailyAmount = 2000;

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {

    try {
      const userId = interaction.member.id;
      const query = {
        userId: userId
      };

      let user = await User.findOne(query);

      if (user) {
        if (!user.lastDaily) {
          user.lastDaily = new Date();
        } else {
          const lastDailyDate = moment(user.lastDaily);
          const currentDate = moment();

          if (lastDailyDate.isSame(currentDate, 'day')) {
            const timeLeft = moment.duration(lastDailyDate.add(1, 'days').diff(currentDate));
            const hoursLeft = timeLeft.hours();
            const minutesLeft = timeLeft.minutes();

            await interaction.reply({
              content: `You have already claimed your dailies today. Come back after \`${hoursLeft}\` hours \`${minutesLeft}\` minutes.`,
              ephemeral: true,
            });
            return;
          }
          
          user.lastDaily = new Date();
        }
      } else {
        user = new User({
          ...query,
          lastDaily: new Date(),
          balance: 0,
        });
      }

      const embed = new EmbedBuilder()
      .setTitle('Successfully Deposited')
      .addFields(
        {name: 'Amount Added', value: `${emoji.coin} ${dailyAmount}`},
        {name: 'Balance', value: `${emoji.coin} ${user.balance + dailyAmount}`}
      )
      .setTimestamp()

      user.balance += dailyAmount;
      await user.save();

      await interaction.reply({content: `Successfully deposited ${emoji.coin} **${dailyAmount}**.`});
    } catch (error) {
      console.log(`Error with /daily: ${error}`);
    }
  },

  name: 'daily',
  description: 'Collect your dailies!',
};
