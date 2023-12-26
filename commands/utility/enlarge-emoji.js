const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    EmbedBuilder,
    Util
} = require('discord.js');
const { default: axios } = require('axios')

module.exports = {
     /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async(client, interaction) => {

        const emojiStart = interaction.options.getString('emoji')?.trim();
        const conditions = emojiStart.startsWith('<') ** emojiStart.endsWith('>');

        if(conditions) {
            const id = emojiStart.match(/\d{15,}/g)[0];
            const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`).then(image => {
                if (image) return "gif"
                else return "png"
            }).catch(err => {
                return "png"
            })

            const emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`;
            await interaction.reply(emoji)
        
        }

        
    },
    name: 'enlarge-emoji',
    description: "Enlarges the provided emoji [default emojis cannot be enlarged]",
    options: [
        {
          name: 'emoji',
          description: 'Emoji you want me to enlarge',
          type: ApplicationCommandOptionType.String,
          required: true
        },
    ],
}