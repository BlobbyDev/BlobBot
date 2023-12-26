const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const { TicTacToe } = require('discord-gamecord');

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
            const game = new TicTacToe({
                isSlashGame: true,
                emojis: {
                    xButton: '✖️',
                    oButton: '🔵',
                    blankButton: '➖'
                },
                message: interaction,
                mentionUser: true,
                timeoutTime: 60000,
                playerOnlyMessage: 'Only {player} and {opponent} can use these buttons.',
                player: interaction.user,
                opponent: opponent,
            });

            await game.startGame();

        } catch (error) {
            interaction.reply({ content: `An error occurred: **${error}**`, ephemeral: true });
        }
    },

    name: 'tic-tac-toe',
    description: 'Start a Tic Tac Toe game',
    options: [
        {
            name: 'opponent',
            description: 'Select an opponent to play against',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
    ],
};

