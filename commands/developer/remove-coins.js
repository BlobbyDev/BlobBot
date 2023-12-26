const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const User = require('../../models/user');
const config = require('../../config.json');
const emoji = require('../../utils/emojis.json');

module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async (client, interaction) => {

        if (!config.devCommandsAccess.includes(interaction.user.id)) {
            return interaction.reply({ content: "This is a developer only command", ephemeral: true });
        }

        const receiverId = interaction.options.get('user')?.value;
        const amount = interaction.options.get('amount')?.value;

        const receiverUser = await User.findOne({ userId: receiverId });

        if (interaction.guild.members.cache.get(receiverId)?.user.bot) {
            await interaction.reply({ content: "Bots do not have an account", ephemeral: true })
        }

        if (!receiverUser) {
            await interaction.reply({ content: "The receiver don't have an account [Run **/daily** to open an account]", ephemeral: true });
            return;
        }
 
        receiverUser.balance -= amount;
        await receiverUser.save();

        const receiver = await client.users.fetch(receiverId);

        const embed = new EmbedBuilder()
        .setTitle('Removed Coins')
        .addFields(
            {name: 'Amount', value: `${emoji.coin} ${amount}`, inline: false},
            {name: 'User', value: `${receiver} (\`${receiver.username}\`)`, inline: true},
            {name: "User's Balance", value: `${emoji.coin} ${receiverUser.balance}`, inline: true}
        )

        await interaction.reply({embeds: [embed]});
    },

    name: 'remove-coins',
    description: "Removes coins from a user (Developer only)",
    options: [
        {
            name: 'user',
            description: 'User to remove coins from',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'amount',
            description: 'Amount of coins to be removed',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
    ],
};