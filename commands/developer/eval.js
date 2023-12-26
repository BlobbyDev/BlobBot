const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const config = require('../../config.json');
const AntiToxicity = require('../../models/antiToxicity');
const AutoRole = require('../../models/autoRole');
const LeaveLog = require('../../models/leaveLog');
const MessageLog = require('../../models/messageLog');
const TicketSystem = require('../../models/ticketSystem');
const LevelUp = require('../../models/levelUp');
const WelcomeLog = require('../../models/welcomeLog');
const Level = require('../../models/level');
const LevelingEnable = require('../../models/levelingEnabledGuild');

module.exports = {
    /**
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {

        if (!config.devCommandsAccess.includes(interaction.user.id)) {
            return interaction.reply({ content: "This is a developer only command", ephemeral: true });
        }

        const code = interaction.options.getString('code');

        try {
            const result = eval(code);
            interaction.reply({ content: `Output: \`\`\`${result}\`\`\``, ephemeral: true });
        } catch (error) {
            interaction.reply({ content: `An error occurred while evaluating the code: \`\`\`${error.message}\`\`\``, ephemeral: true });
        }
    },

    name: 'eval',
    description: "Evaluate JavaScript code (Developer only)",
    options: [
        {
            name: 'code',
            description: 'JavaScript code to evaluate',
            type: ApplicationCommandOptionType.String,
            required: true
        },
    ],
};