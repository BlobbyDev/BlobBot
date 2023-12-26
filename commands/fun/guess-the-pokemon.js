const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const { GuessThePokemon  } = require('discord-gamecord');

module.exports = {
    /**
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {
        try {
            const Game = new GuessThePokemon({
                message: interaction,
                player: interaction.user,
                isSlashGame: true,
                embed: {
                  title: 'Who\'s The Pokemon [Type out]',
                  color: '#5865F2'
                },
                timeoutTime: 60000,
                winMessage: 'You guessed it right! It was a {pokemon}.',
                loseMessage: 'Better luck next time! It was a {pokemon}.',
                errMessage: 'Unable to fetch pokemon data! Please try again.',
                playerOnlyMessage: 'Only {player} can use these buttons.'
              });

            await Game.startGame();

        } catch (error) {
            interaction.reply({ content: `An error occurred: **${error}**`, ephemeral: true });
        }
    },

    name: 'guess-the-pokemon',
    description: 'Play the Guess the Pokemon game',
};