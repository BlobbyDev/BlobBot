const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    /**
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {

        await interaction.deferReply({ ephemeral: true })

        const prompt = interaction.options.getString('prompt');
        
        const input = {
            method: 'GET',
            url: 'https://google-bard1.p.rapidapi.com/',
            headers: {
                userid: 'HatifaUGzATS4fgKJgx7',
                message: prompt,
                lang: 'en',
                key: 'AIzaSyDb8enBGiThWTrPl1VdGnzDetYgvdBXHI8',
                'X-RapidAPI-Key': 'f70e9801famsh20e3a50b2745a79p13f725jsn91c47d35d433',
                'X-RapidAPI-Host': 'google-bard1.p.rapidapi.com'
            }
        };

        async function callapi() {
            try {
                const output = await axios.request(input);

                const embed = new EmbedBuilder()
                .setTitle(`Response to "${prompt}"`)
                .setDescription(`${output.data.response}`)
                .setTimestamp()
            
                await interaction.editReply({embeds: [embed]})
            } catch (error) {
                console.error(error);
                await interaction.editReply({ content: `There was an error while responding to **${prompt}**`, ephemeral: true })
            }
        }

        await callapi();

    },

    name: 'ai',
    description: 'Ask chat AI a question',
    options: [
        {
            name: 'prompt',
            description: 'Question you want me to answer',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
};