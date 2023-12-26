const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const { Minesweeper   } = require('discord-gamecord');

module.exports = {
    /**
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {

        try {
            const Game = new Minesweeper({
                message: interaction,
                isSlashGame: true,
                embed: {
                  title: 'Minesweeper',
                  color: '#5865F2',
                  description: 'Click on the buttons to reveal the blocks except mines.'
                },
                emojis: { flag: '🚩', mine: '💣' },
                mines: 8,
                timeoutTime: 60000,
                winMessage: 'You won the Game! You successfully avoided all the mines.',
                loseMessage: 'You lost the Game! Beaware of the mines next time.',
                playerOnlyMessage: 'Only {player} can use these buttons.'
            });

            await Game.startGame();

        } catch (error) {
            interaction.reply({ content: `An error occurred: **${error}**`, ephemeral: true });
        }
    },

    name: 'minesweeper',
    description: 'Play the Minesweeper game'
};