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

        const senderId = interaction.member.id;
        const receiverId = interaction.options.get('receiver')?.value;
        const amount = interaction.options.get('amount')?.value;

        let receiverUser = await User.findOne({ userId: receiverId });

        if (interaction.guild.members.cache.get(receiverId)?.user.bot) {
            await interaction.reply({ content: "Bots do not have an account", ephemeral: true })
        }

        if (!receiverUser) {
            receiverUser = new User({
                userId: receiverId, 
                balance: 0 
            });
            await receiverUser.save();
        }
 
        receiverUser.balance += amount;
        await receiverUser.save();

        const receiver = await client.users.fetch(receiverId);

        const embed = new EmbedBuilder()
        .setTitle('Generated Coins')
        .addFields(
            {name: 'Amount', value: `${emoji.coin} ${amount}`, inline: false},
            {name: 'Receiver', value: `${receiver} (\`${receiver.username}\`)`, inline: true},
            {name: "Receiver's Balance", value: `${emoji.coin} ${receiverUser.balance}`, inline: true}
        )

        await interaction.reply({embeds: [embed]});
    },

    name: 'generate-coins',
    description: "Generate coins and transfer it to a user (Developer only)",
    options: [
        {
            name: 'receiver',
            description: 'User to transfer coins to',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'amount',
            description: 'Amount of coins to be generated',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
    ],
};