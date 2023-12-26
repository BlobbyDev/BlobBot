const {
    Client,
    Interaction,
    EmbedBuilder
} = require('discord.js');
const User = require('../../models/user');
const price = require('../../utils/itemPrice.json');
const emoji = require('../../utils/emojis.json');

module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async(client, interaction) => {

        try {

            const user = await User.findOne({ userId: interaction.user.id });
            
            if (!user) {
                interaction.reply({content: "You don't have an account [Run **/daily** to open an account]", ephemeral: true});
                return;
            }

            const embed = new EmbedBuilder()
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setTitle('Shop')
            .setDescription(`• Run </buy:1184205752580186192> to purchase items from the market.\n• Run </sell:1184205755608465449> to sell items to the market for some ${emoji.coin}.`)
            .addFields(
                {name: 'Your Balance', value: `${emoji.coin} ${user.balance}`},
                {name: 'Items - Price', value: `**\`1\`** ${emoji.diamond} Diamond - ${emoji.coin} ${price.Diamond}\n**\`2\`** ${emoji.gold} Gold - ${emoji.coin} ${price.Gold}\n**\`3\`** ${emoji.iron} Iron - ${emoji.coin} ${price.Iron}\n**\`4\`** ${emoji.wood} Wood - ${emoji.coin} ${price.Wood}\n**\`5\`** ${emoji.shit} Shit - ${emoji.coin} ${price.Shit}`},
                {name: 'Items - Resale Value', value: `**\`1\`** ${emoji.diamond} Diamond - ${emoji.coin} ${price.Diamond * 0.6}\n**\`2\`** ${emoji.gold} Gold - ${emoji.coin} ${price.Gold * 0.6}\n**\`3\`** ${emoji.iron} Iron - ${emoji.coin} ${price.Iron * 0.6}\n**\`4\`** ${emoji.wood} Wood - ${emoji.coin} ${price.Wood * 0.6}\n**\`5\`** ${emoji.shit} Shit - ${emoji.coin} ${price.Shit * 0.6}`}
            )
            .setTimestamp()

            await interaction.reply({embeds: [embed]})


        } catch (error) {
            console.error('Error fetching shop:', error);
            interaction.reply('An error occurred while fetching the shop.');
        }

    },

    name: 'shop',
    description: "Shop that you can spend your hard earned Blob Bux on"

}