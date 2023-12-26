const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    EmbedBuilder,
} = require('discord.js');

const pp = [
    '8D',
    '8=D',
    '8==D',
    '8===D',
    '8====D',
    '8=====D',
    '8======D',
    '8=======D',
    '8========D',
    '8=========D',
    '8==========D',
    '8===========D',
    '8============D',
    '8=============D',
    '8==============D',
    '8===============D',
    '8================D',
    '8=================D',
    '8==================D',
    '8===================D',
    '8====================D',
    '8=====================D',
    '8======================D',
    '8=======================D',
    '8========================D',
    '8=========================D'
];

module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async(client, interaction) => {

        const mentionedUserId = interaction.options.get('target-user')?.value;
        const targetUserId = mentionedUserId || interaction.member.id;
        const targetUserObj = await interaction.guild.members.fetch(targetUserId);

        if (!targetUserObj) {
            await interaction.reply({content: 'Invalid User', ephemeral: true})
            return;
        }

        const embed = new EmbedBuilder()
        .setTitle('PP Size Detector')
        .setDescription(`${targetUserObj.displayName}'s PP is this big\n\`\`\`${pp[Math.floor(Math.random() * pp.length)]}\`\`\``)
        .setFooter({text: `Requested by ${interaction.user.username}`})
        .setTimestamp()

        await interaction.reply({embeds: [embed]})
    },

    name: 'pp',
    description: "Provides pp size of your/someone's",
    options: [
      {
        name: 'target-user',
        description: 'Member',
        type: ApplicationCommandOptionType.User,
      },
    ],
}