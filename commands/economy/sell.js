const {
    Client,
    Interaction,
    EmbedBuilder,
    ApplicationCommandOptionType
} = require('discord.js');
const User = require('../../models/user');
const Inventory = require('../../models/inventory');
const price = require('../../utils/itemPrice.json');
const emoji = require('../../utils/emojis.json');

function getItemName(itemNumber) {
    switch (itemNumber) {
        case 1:
            return 'Diamond';
        case 2:
            return 'Gold';
        case 3:
            return 'Iron';
        case 4:
            return 'Wood';
        case 5:
            return 'Shit';
        default:
            return '';
    }
}

module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async (client, interaction) => {

        try {

            const userId = interaction.user.id;
            const user = await User.findOne({ userId: userId });
            const userInventory = await Inventory.findOne({ userId: userId });

            if (!user) {
                await interaction.reply({ content: "You don't have an account [Run **/daily** to open an account]", ephemeral: true })
                return;
            }

            if (!userInventory) {
                await interaction.reply({ content: "You don't have an inventory [Run **/buy** to purchase items and create an inventory]", ephemeral: true })
            }

            const itemNumber = interaction.options.getInteger('item');
            const quantity = interaction.options.getInteger('quantity') || 1;

            const itemName = getItemName(itemNumber);

            if (!itemName) {
                await interaction.reply('Invalid item');
                return;
            }

            const userBalance = user.balance;
            const userItemQuantity = userInventory[itemName.toLowerCase()];

            if (userItemQuantity < quantity) {
                await interaction.reply({content: `You do not have enough **${itemName}** to sell.`, ephemeral: true});
                return;
            }

            const originalItemPrice = price[itemName];
            const sellingPrice = Math.floor(0.6 * originalItemPrice * quantity);

            user.balance += sellingPrice;
            userInventory[itemName.toLowerCase()] -= quantity;

            await userInventory.save();
            await user.save();

            await interaction.reply(`Sale successful! You sold **${quantity}**x **${itemName}** for ${emoji.coin} **${sellingPrice}**.`);

        } catch (error) {
            console.error('Error handling sell command:', error);
            await interaction.reply({ content: 'An error occurred while processing the sell command.', ephemeral: true });
        }

    },

    name: 'sell',
    description: "Sell items to the market",
    options: [
        {
            name: 'item',
            description: 'The item of the item you want to sell',
            type: ApplicationCommandOptionType.Integer,
            required: true,
            choices: [
                { name: 'Diamond', value: 1 },
                { name: 'Gold', value: 2 },
                { name: 'Iron', value: 3 },
                { name: 'Wood', value: 4 },
                { name: 'Shit', value: 5 },
            ],
        },
        {
            name: 'quantity',
            description: 'The quantity of the item you want to sell',
            type: ApplicationCommandOptionType.Integer,
            required: false,
        },
    ],
};

