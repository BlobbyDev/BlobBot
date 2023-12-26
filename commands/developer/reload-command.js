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

        const category = interaction.options.getString('category');
        const command = interaction.options.getString('command');

        try {
            delete require.cache[require.resolve(`../../commands/${category}/${command}.js`)];
            client.commands.delete(command);
            
            const pull = require(`../../commands/${category}/${command}.js`)
            client.commands.set(command, pull)

            await interaction.reply({ content: `Reloaded command: \`${command}\``, ephemeral: true});

        } catch (error) {
            interaction.reply({ content: `Failed to reload command: **\`${command}\`**\`\`\`${error}\`\`\``, ephemeral: true });
        }
    },

    name: 'reload-command',
    description: "Reloads command (Developer only)",
    options: [
        {
            name: 'category',
            description: 'Command category',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'command',
            description: 'Command name',
            type: ApplicationCommandOptionType.String,
            required: true
        },
    ],
};
