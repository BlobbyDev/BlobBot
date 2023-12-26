const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    EmbedBuilder,
} = require('discord.js');

module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async(client, interaction) => {

        const n = Math.floor(Math.random() * 2);
        
        let result
        if (n === 1) result = 'Heads'
        else result = 'Tails'

        const wait = require('node:timers/promises').setTimeout;
        const embed = new EmbedBuilder()
        .setTitle('🪙 Coinflip')
        .setDescription(`${interaction.user} flipped a coin!`)
        .addFields(
            {name: 'Result', value: result, inline: true}
        )
        .setTimestamp()
        
        await interaction.reply('Flipping coin .')
        await wait(500)
        await interaction.editReply('Flipping coin ..')
        await wait(500)
        await interaction.editReply('Flipping coin ...')
        await wait(500)
        await interaction.editReply({content: '‎', embeds: [embed]})
    },

    name: 'coinflip',
    description: 'Flips a coin'
}