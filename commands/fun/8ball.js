const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    EmbedBuilder
} = require('discord.js');

module.exports = {
     /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async(client, interaction) => {

        const question = interaction.options.getString('text')
        if (!question) {
            interaction.reply({content: "You must type something", ephemeral: true})
        }

        const wait = require('node:timers/promises').setTimeout;

        const answers = [
            'Oh hell yeah',
            'Hello no',
            'Yes I guess ?',
            'Probably wrong', 
            'You never know',
            'I guess ?',
            'Well tbh I don\'t know',
            'Umm maybe ?',
            'Nah',
            'Yup',
            'I have a doubt',
            'Cannot predict now',
            'I can see it'
        ]

        const embed = new EmbedBuilder()
        .setTitle('🎱 8-ball')
        .addFields(
            {name: 'Question', value: `\`\`\`${question}\`\`\``, inline: false},
            {name: 'Answer', value: `\`\`\`${answers[Math.floor(Math.random() * answers.length)]}\`\`\``, inline: false},
            {name: 'Asked by', value: `${interaction.user} (\`${interaction.user.id}\`)`, inline :false}
        )
        .setTimestamp()

        await interaction.reply('🎱')
        await wait(700)
        await interaction.editReply({content: '‎', embeds: [embed]})

        
    },

    name: '8ball',
    description: "Ask a question to bot the will answer (8ball)",
    options: [
        {
          name: 'text',
          description: 'Question',
          type: ApplicationCommandOptionType.String,
          required: true
        },
    ],
}