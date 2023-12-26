const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const Blacklist = require('../../models/blacklist');
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

        try {

            const targetUserId = interaction.options.get('user')?.value

            if (!(await Blacklist.exists({ userId: targetUserId }))) {
                interaction.reply({ content: `User [**${targetUserId}**](<https://discordapp.com/users/${targetUserId}>) was not been blacklisted`, ephemeral: true });
                return;
            }
      
            await Blacklist.findOneAndDelete({ userId: targetUserId });
            await interaction.reply({ content: `User [**${targetUserId}**](<https://discordapp.com/users/${targetUserId}>) has been removed from the blacklist`, ephemeral: true });
        } catch (error) {
            interaction.reply({content: `An error occurred while removing a user from blacklist: **${error}**`, ephemeral: true})
        }
    },

    name: 'blacklist-remove',
    description: "Remove a user from the blacklist (Developer only)",
    options: [
        {
            name: 'user',
            description: 'User to be removed from blacklist',
            type: ApplicationCommandOptionType.User,
            required: true
        },
    ],
};