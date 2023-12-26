const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const User = require('../../models/user');
const Blacklist = require('../../models/blacklist');
const emoji = require('../../utils/emojis.json');

module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async (client, interaction) => {

        const senderId = interaction.member.id;
        const receiverId = interaction.options.get('receiver')?.value;
        const amount = interaction.options.get('amount')?.value;
        const note = interaction.options.getString('note');
        const blacklist = await Blacklist.findOne({ userId: receiverId });

        let senderUser = await User.findOne({ userId: senderId });
        let receiverUser = await User.findOne({ userId: receiverId });

        if (interaction.guild.members.cache.get(receiverId)?.user.bot) {
            await interaction.reply({ content: "Bots do not have an account", ephemeral: true })
            return;
        }

        if (!senderUser) {
            await interaction.reply({ content: "You don't have an account [Run **/daily** to open an account]", ephemeral: true });
            return;
        }

        if (blacklist) {
            interaction.reply({content: `You can't transfer ${emoji.coin} to a blacklisted user`, ephemeral: true})
            return;
        }

        if (!receiverUser) {
            receiverUser = new User({
                userId: receiverId, 
                balance: 0 
            });
            await receiverUser.save();
        }

        if (senderId === receiverId) {
            await interaction.reply({ content: `You cannot send ${emoji.coin} to yourself`, ephemeral: true });
            return;
        }

        if (amount === 0 || amount < 0) {
            await interaction.reply({ content: `Minimum of ${emoji.coin} 1 must be involved`, ephemeral: true });
            return;
        }

        if (senderUser.balance < amount) {
            await interaction.reply({ content: "Insufficient balance", ephemeral: true });
            return;
        }

        senderUser.balance -= amount;
        receiverUser.balance += amount;

        await senderUser.save();
        await receiverUser.save();

        const sender = await client.users.fetch(senderId);
        const receiver = await client.users.fetch(receiverId);

        const embed = new EmbedBuilder()
        .setTitle('Transfer Successful')
        .addFields(
            {name: 'Amount', value: `${emoji.coin} ${amount}`, inline: false},
            {name: 'Sender', value: `${sender} (\`${sender.username}\`)`, inline: true},
            {name: "Sender's Balance", value: `${emoji.coin} ${senderUser.balance}`, inline: true},
        )
        if (note) {
            embed.addFields({ name: `Transfer Note`, value: `${note}`})
        } else {
            embed.addFields( {name: "\u200B", value: "\u200B"})
        }
        embed.addFields(
            {name: 'Receiver', value: `${receiver} (\`${receiver.username}\`)`, inline: true},
            {name: "Receiver's Balance", value: `${emoji.coin} ${receiverUser.balance}`, inline: true}
        )

        await interaction.reply({embeds: [embed]});
    },

    name: 'transfer-coins',
    description: "Transfer coins to another user",
    options: [
        {
            name: 'receiver',
            description: 'User to transfer coins to',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'amount',
            description: 'Amount of coins to transfer',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
        {
            name: 'note',
            description: 'Transfer note',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
    ],
};
