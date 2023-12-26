const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
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

        const commandId = interaction.options.getString('command_id');

        try {
            if (commandId) {
                await client.application.commands.delete(commandId);
                interaction.reply({
                    content: `Command \`${commandId}\` has been deleted globally.`,
                    ephemeral: true
                });
            } else {
                await client.application.commands.set([]);
                interaction.reply({
                    content: `All commands have been deleted globally.`,
                    ephemeral: true
                });
            }
        } catch (error) {
            interaction.reply({ content: `An error occurred: \`\`\`${error.message}\`\`\``, ephemeral: true });
        }
    },

    name: 'delete-command',
    description: "Delete an application command by providing its ID (Developer only)",
    options: [
        {
            name: 'command_id',
            description: 'ID of the command to delete',
            type: ApplicationCommandOptionType.String,
            required: false 
        },
    ],
};

