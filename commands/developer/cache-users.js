const { Client, Interaction } = require('discord.js');
const config = require('../../config.json');
module.exports = {
    /**
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {

        if (!config.devCommandsAccess.includes(interaction.user.id)) {
            return interaction.reply({ content: "This is a developer only command", ephemeral: true });
        }

        await interaction.deferReply({ephemeral: true})

        let usersCount = 0;
        for (const guild of client.guilds.cache) {
        usersCount += (await guild[1].members.fetch()).size
        }

        await interaction.editReply({content: `Cached **${usersCount}** Users`, ephemeral: true})
        
    },

    name: 'cache-users',
    description: "Caches all the users (Developer only)",
    
};