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

module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async (client, interaction) => {

        try {


            const targetUserId = interaction.options.get('user')?.value || interaction.member.id;
            const targetUserObj = await interaction.guild.members.fetch(targetUserId);

            const user = await User.findOne({ userId: targetUserId });
            const inventory = await Inventory.findOne({ userId: targetUserId });

            if (targetUserObj.user.bot) {
                interaction.reply ({
                  content: 'Bots cannot open an account so no inventory available',
                  ephemeral: true
                })
                return;
            }

            if (!user) {
                interaction.reply({content: "You or the user don't have an account [Run **/daily** to open an account]", ephemeral: true});
                return;
            }

            if (!inventory) {
            interaction.reply({content: "User don't have an inventory [Run **/buy** to purchase items and create an inventory]", ephemeral: true});
                return;
            }

            const totalWorth = calculateTotalWorth(inventory, price);

            const embed = new EmbedBuilder()
            .setThumbnail(targetUserObj.user.displayAvatarURL({ dynamic: true, size:  1024 }))
            .setTitle(`${targetUserObj.user.displayName} - Inventory`)
            .setDescription(`${targetUserObj} (${targetUserObj.user.tag}) has ${emoji.coin} **\`${totalWorth}\`** worth of items.`)
            .addFields(
                {name: 'Items', value: `**\`1\`** ${emoji.diamond} Diamond - **${inventory.diamond}**\n**\`2\`** ${emoji.gold} Gold - **${inventory.gold}**\n**\`3\`** ${emoji.iron} Iron - **${inventory.iron}**\n**\`4\`** ${emoji.wood} Wood - **${inventory.wood}**\n**\`5\`** ${emoji.shit} Shit - **${inventory.shit}**`}
            )
            .setTimestamp()

            await interaction.reply({embeds: [embed]})


        } catch (error) {
            console.error('Error handling buy command:', error);
            await interaction.reply({content: 'An error occurred while fetching the inventory.', ephemeral: true});
        }

    },

    name: 'inventory',
    description: "View your's and your friend's items in the inventory",
    options: [
        {
            name: 'user',
            description: 'User you wanna see the inventory of',
            type: ApplicationCommandOptionType.User,
            required: false,
        },
    ],
};

function calculateTotalWorth(inventory, price) {
    let totalWorth = 0;

    const itemNames = ['diamond', 'gold', 'iron', 'wood', 'shit'];

    for (const itemName of itemNames) {
        const itemNameLowercase = itemName.toLowerCase();
        const quantity = inventory[itemNameLowercase];
        const priceItemNameLowercase = Object.keys(price).find(key => key.toLowerCase() === itemNameLowercase);

        if (price[priceItemNameLowercase]) {
            totalWorth += 0.6 * price[priceItemNameLowercase] * quantity;
        }
    }

    return totalWorth;
}
