const { Client, Interaction } = require('discord.js');
const User = require('../../models/user');
const emoji = require('../../utils/emojis.json');
const cooldowns = new Map();

module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async (client, interaction) => {

        const userId = interaction.member.id;

        let user = await User.findOne({ userId });

        if (!user) {
            user = new User({
                userId: receiverId, 
                balance: 0 
            });
            await user.save();
        }

        if (cooldowns.has(userId)) {
            const expirationTime = cooldowns.get(userId);
            const currentTime = Date.now();

            if (currentTime < expirationTime) {
                const remainingTime = (expirationTime - currentTime) / 1000;
                await interaction.reply({ content: `Wait for \`${remainingTime.toFixed(1)}\` seconds to run this command again`, ephemeral: true });
                return;
            }
        }

        const successRate = 0.30;
        const minAmount = 10;
        const maxAmount = 1500;

        const isSuccess = Math.random() < successRate;
        const amountEarned = isSuccess ? Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount : 0;

        if (isSuccess) {
            user.balance += amountEarned;
            await user.save();
        }

        const cooldownTime = 30 * 1000;
        const expirationTime = Date.now() + cooldownTime;
        cooldowns.set(userId, expirationTime);

        await interaction.reply(isSuccess ? `Aww someone gave you ${emoji.coin} **${amountEarned}**` : "You got no coins from anyone, lol");
    },

    name: 'beg',
    description: "Beg for coins",
};

