const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    EmbedBuilder
  } = require('discord.js');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');

module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async(client, interaction) => {
        
        const { totalMemMb, usedMemMb } = await mem.info();
        const systeminfo = stripIndent`
        OS        : ${await os.oos()}
        CPU       : ${cpu.model()}
        Cores     : ${cpu.count()}
        CPU Usage : ${await cpu.usage()} %
        RAM       : ${totalMemMb} MB
        RAM Usage : ${usedMemMb} MB 
        `;

        const embed = new EmbedBuilder()
        .setTitle(`System Information`)
        .setDescription(`\`\`\`\n${systeminfo}\`\`\``)
        .setTimestamp()

        await interaction.reply({embeds: [embed]})
    },

    name: 'systeminfo',
    description: "Provides my system informations",

}