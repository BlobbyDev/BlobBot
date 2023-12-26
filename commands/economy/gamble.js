const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const User = require('../../models/user');
const cooldowns = new Map();
const emoji = require('../../utils/emojis.json');

module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async (client, interaction) => {

        const userId = interaction.member.id;
        const amount = interaction.options.get('amount')?.value;

        const user = await User.findOne({ userId });

        if (!user) {
            await interaction.reply({ content: `You don't have an account [Run **/daily** to open an account]`, ephemeral: true });
            return;
        }

        if (amount < 300) {
            await interaction.reply({ content: `Minimum of ${emoji.coin} 300 is required`, ephemeral: true });
            return;
        }

        if (user.balance < amount) {
            await interaction.reply({ content: "Insufficient balance", ephemeral: true });
            return;
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

        const isWin = Math.random() < 0.2;

        const embed = new EmbedBuilder()
        .setTitle('Result')
        .setFooter({text: `Requested by ${interaction.user.username}`})
        .setTimestamp()
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size:  1024 }))

        function generateRandomNumber() {
            const baseProbability = Math.random();
            
            if (baseProbability <= 0.001) {
                return Math.floor(Math.random() * 6) + 5;
            } else {
                return Math.floor(Math.random() * 4) + 1;
            }
        }
        

        const winMultiplier = generateRandomNumber();

        if (isWin) {
            user.balance += (amount*winMultiplier);
            embed.setDescription(`Congratulations! You won ${emoji.coin} **${amount*winMultiplier}** (${winMultiplier}x the amount)`);
            embed.addFields(
                { name: 'Amount won', value: `${emoji.coin} ${amount*winMultiplier}`, inline: false },
                { name: 'Balance', value: `${emoji.coin} ${user.balance}`, inline: false },
            )
        } else {
            user.balance -= amount;
            embed.setDescription(`You lost, Better luck next time!`);
            embed.addFields(
                { name: 'Amount lost', value: `${emoji.coin} ${amount}`, inline: false },
                { name: 'Balance', value: `${emoji.coin} ${user.balance}`, inline: false },
            )
        }

        await user.save();

        const cooldownTime = 10 * 1000;
        const expirationTime = Date.now() + cooldownTime;
        cooldowns.set(userId, expirationTime);

        await interaction.reply({ embeds: [embed] });
    },

    name: 'gamble',
    description: "Gamble your coins for a chance to win or lose",
    options: [
        {
            name: 'amount',
            description: 'Amount of coins to gamble',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
    ],
};
