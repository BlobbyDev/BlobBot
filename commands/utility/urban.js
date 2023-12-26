const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async (client, interaction) => {
        const channel = interaction.channel.nsfw;
        const text = interaction.options.getString('query')

        if (text.length > 1024) {
            return interaction.reply({content: `Please keep \`query\` under **1024** characters`, ephemeral: true})
        }

        const query = encodeURIComponent(text);

        const fetch = await import('node-fetch');
        
        const response = await fetch.default(`https://api.urbandictionary.com/v0/define?term=${query}`);
        const { list } = await response.json();

        if (!list.length) return interaction.reply({ content: `No results found for **${query}**.`, ephemeral: true });

        const [answer] = list;

        const embed = new EmbedBuilder()
        .setTitle(answer.word)
        .setURL(answer.permalink)
        .addFields(
            { name: 'Definition', value: `\`\`\`${answer.definition}\`\`\``, inline: false },
            { name: "Example", value: `\`\`\`${answer.example}\`\`\``, inline: false },
            { name: 'Rating', value: `${answer.thumbs_up} 👍    ${answer.thumbs_down} 👎` }
        )
        .setTimestamp()
        .setFooter({ text: `Requested by ${interaction.user.username} (${interaction.user.id})` });


        if (!channel) {
            await interaction.reply({ content:'Enable NSFW in this channel to make it visible to everyone.', embeds: [embed], ephemeral: true });
        } else {
            await interaction.reply({ embeds: [embed] });
        }
    },

    name: 'urban',
    description: "Give you the meaning of the word or the phrase using Urban Dictionary",
    options: [
        {
            name: 'query',
            description: 'Query you want to search for',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
};
