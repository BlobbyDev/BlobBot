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

    callback: async(client, interaction) => {
        
        let msg = interaction.options.getString('text')
        if (!msg) {
            interaction.reply({content: "You must type something", ephemeral: true})
        }
        
        msg = msg.split('').map(c => {
            if (c === ' ') return c;
            else if (/[0-9]/.test(c)) return num[c];
            else return (/[a-zA-Z]/.test(c)) ? ':regional_indicator_' + c.toLowerCase() + ':' : '';
        }).join('');

        if (msg.length > 2048) {
            msg = msg.slice(0, msg.length - (msg.length - 2033)); 
            msg = msg.slice(0, msg.lastIndexOf(':')) + '**bruh**';
        }

        await interaction.reply(msg)
    },

    name: 'emojify',
    description: "Emojifies your text",
    options: [
        {
          name: 'text',
          description: 'Text you want me to emojify',
          type: ApplicationCommandOptionType.String,
          required: true
        },
    ],
}