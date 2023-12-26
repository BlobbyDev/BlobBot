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
            const blacklist = await Blacklist.findOne({ userId: targetUserId });

            if (targetUserId === interaction.user.id) {
                return interaction.reply({ content: "You cannot blacklist yourself", ephemeral: true });
            }

            if (blacklist) {
                return interaction.reply({ content: `User [**${targetUserId}**](<https://discordapp.com/users/${targetUserId}>) has already been blacklisted`, ephemeral: true })
            } else {
                const blacklistUser = new Blacklist({userId: targetUserId})
                await blacklistUser.save();
                await interaction.reply({ content: `User [**${targetUserId}**](<https://discordapp.com/users/${targetUserId}>) has been blacklisted`, ephemeral: true })
            }

        } catch (error) {
            interaction.reply({content: `An error occurred while blacklisting: **${error}**`, ephemeral: true})
        }
    },

    name: 'blacklist-add',
    description: "Blacklist a user (Developer only)",
    options: [
        {
            name: 'user',
            description: 'User to be blacklisted',
            type: ApplicationCommandOptionType.User,
            required: true
        },
    ],
};