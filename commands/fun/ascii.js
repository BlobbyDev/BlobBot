const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    EmbedBuilder
} = require('discord.js');
const figlet = require('figlet')

module.exports = {
     /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async (client, interaction) => {
        
        const msg = interaction.options.getString('text')
        if(!msg) {
            interaction.reply({content: "You must type something", ephemeral: true})
        }

        figlet.text(msg, function (err, data){
            if(err){
                console.log('Something went wrong');
                console.dir(err);
            }
            if(data.length > 2000) return interaction.reply({content: 'Please provide text shorter than 2000 characters', ephemeral: true})
            interaction.reply('```' + data + '```')
        })

        
    },

    name: 'ascii',
    description: "Repeats whatever you text in ascii format",
    options: [
        {
          name: 'text',
          description: 'Text you want me to type in ascii',
          type: ApplicationCommandOptionType.String,
          required: true
        },
    ],
}