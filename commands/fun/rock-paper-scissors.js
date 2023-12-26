const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const { RockPaperScissors } = require('discord-gamecord');

module.exports = {
    /**
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {

        const opponent = interaction.options.getUser('opponent');

        if (opponent.bot) {
            await interaction.reply({ content: "You cannot challenge a bot", ephemeral: true });
            return;
        }

        if (opponent.id === interaction.user.id) {
            await interaction.reply({ content: "You cannot challenge yourself", ephemeral: true });
            return;
        }

        try {
            const game = new RockPaperScissors({
                message: interaction,
                player: interaction.user,
                opponent: opponent,
                emojis: {
                    rock: '🌑',
                    paper: '📰',
                    scissors: '✂️'
                },
                mentionUser: true,
                timeoutTime: 60000,
                isSlashGame: true,
                options: {
                    title: 'Rock Paper Scissors',
                    color: 'RANDOM',
                    timestamp: true,
                },
                playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.',
            });

            await game.startGame();

        } catch (error) {
            interaction.reply({ content: `An error occurred: **${error}**`, ephemeral: true });
        }
    },

    name: 'rock-paper-scissors',
    description: 'Play Rock, Paper, Scissors',
    options: [
        {
            name: 'opponent',
            description: 'Select an opponent to play against',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
    ],
};
