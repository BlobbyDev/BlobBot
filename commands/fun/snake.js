const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const { Snake } = require('discord-gamecord');

module.exports = {
    /**
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {
        try {
            const snakeGame = new Snake({
                message: interaction,
                player: interaction.user,
                options: {
                    title: 'Snake Game',
                    color: 'GREEN',
                    timestamp: false,
                },
                foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
                timeoutTime: 20000,
                playerOnlyMessage: 'Only {player} can use these buttons.'
            });

            await snakeGame.startGame();

        } catch (error) {
            interaction.reply({ content: `An error occurred: **${error}**`, ephemeral: true });
        }
    },

    name: 'snake',
    description: 'Play the Snake game',
};
