const {
    Client,
    Interaction,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async (client, interaction) => {

        try {
            async function meme() {

                const fetch = await import('node-fetch');
                
                const headers = {
                    'User-Agent': 'YourBotName/1.0 (your_email@example.com)'
                };

                await fetch.default('https://www.reddit.com/r/dankmemes/random/.json', { headers })
                    .then(async r => {
                        if (r.ok) {
                            let meme = await r.json();
                            let title = meme[0].data.children[0].data.title;
                            let image = meme[0].data.children[0].data.url;
                            let url = `https://www.reddit.com${meme[0].data.children[0].data.permalink}`;
                            let upvotes = meme[0].data.children[0].data.ups;
                            let downvotes = meme[0].data.children[0].data.downs;
                            let numComments = meme[0].data.children[0].data.num_comments;


                            const embed = new EmbedBuilder()
                                .setTitle(`${title}`)
                                .setImage(`${image}`)
                                .setURL(`${url}`)
                                .setFooter({ text: `👍${upvotes} 👎${downvotes} 💬${numComments}` })
                                .setTimestamp();

                            await interaction.reply({ embeds: [embed] });
                        } else {
                            console.error(`Error: ${r.status} - ${await r.text()}`);
                        }
                    })
                    .catch(error => {
                        console.error('Fetch error:', error);
                    });
            }

            meme();
        } catch (error) {
            console.log(error);
        }
    },

    name: 'meme',
    description: 'Sends a random meme from r/dankmemes'
};
