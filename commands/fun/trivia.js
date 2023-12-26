const { Client, Interaction, ApplicationCommandOptionType } = require('discord.js');
const { Trivia   } = require('discord-gamecord');

module.exports = {
    /**
     * @param {Client} client
     * @param {Interaction} interaction
     */
    callback: async (client, interaction) => {

        const difficulty = interaction.options.getString('difficulty')

        try {
            const Game = new Trivia({
                message: interaction,
                isSlashGame: false,
                embed: {
                  title: 'Trivia',
                  color: '#5865F2',
                  description: 'You have 10 seconds to guess the answer.'
                },
                timeoutTime: 10000,
                buttonStyle: 'PRIMARY',
                trueButtonStyle: 'SUCCESS',
                falseButtonStyle: 'DANGER',
                mode: 'multiple', 
                difficulty: difficulty,  
                winMessage: 'You won! The correct answer is **{answer}**.',
                loseMessage: 'You lost! The correct answer is **{answer}**.',
                errMessage: 'Unable to fetch question data! Please try again.',
                playerOnlyMessage: 'Only {player} can use these buttons.'
            });
              
            await Game.startGame();


        } catch (error) {
            interaction.reply({ content: `An error occurred: **${error}**`, ephemeral: true });
        }
    },

    name: 'trivia',
    description: 'Play the Trivia game',
    options: [
        {
            name: 'difficulty',
            description: 'Select difficulty',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {name: 'Easy', value: 'easy'},
                {name: 'Medium', value: 'medium'},
                {name: 'Hard', value: 'hard'}
            ]
        },
    ],
};