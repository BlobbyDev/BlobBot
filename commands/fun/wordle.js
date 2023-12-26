const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const { Wordle } = require('discord-gamecord');

module.exports = {
    /**
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {

        const difficulty = interaction.options.getString('difficulty')

        try {
            const Game = new Wordle({
                message: interaction,
                isSlashGame: true,
                embed: {
                  title: 'Wordle [Guess the word by replying to this embed]',
                  color: '#5865F2',
                },
                customWord: null,
                timeoutTime: 60000,
                winMessage: 'You won! The word was **{word}**.',
                loseMessage: 'You lost! The word was **{word}**.',
                playerOnlyMessage: 'Only {player} can guess the word.'
              });
              
            await Game.startGame();

        } catch (error) {
            interaction.reply({ content: `An error occurred: **${error}**`, ephemeral: true });
        }
    },

    name: 'wordle',
    description: 'Play the Wordle game',
};