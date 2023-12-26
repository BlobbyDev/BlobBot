const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'terms-of-service',
    description: 'Provides our Terms Of Service',
  
    callback: async (client, interaction) => {
      
        const embed = new EmbedBuilder()
        .setTitle(`${client.user.tag} Terms of Service`)
        .setDescription(`Last Updated: December 12, 2023\n\n By using ${client.user.tag}, you agree to the following terms of service. If you do not agree with any of these terms, you are prohibited from using the Bot.`)
        .addFields(
            {name: '1. Use of the Bot', value: `**1.1** The Bot is provided "as is" and is intended for use within Discord servers.\n**1.2** You must comply with Discord's [Terms of Service](https://discord.com/terms) and [Community Guidelines](https://discord.com/guidelines) while using the Bot.\n**1.3** We reserves the right to refuse service to anyone for any reason at any time.`, inline: false},
            {name: '2. Economy System', value: `**2.1** The Bot's economy commands are a virtual, the currency system and gambling is for entertainment purposes only.\n**2.2** We are not responsible for any loss of virtual currency or items due to misuse or system errors.`, inline: false},
            {name: '3. Limitation of Liability', value: `**3.1** We shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of the use or inability to use the Bot.`, inline: false},
            {name: '4. Changes to the Terms', value: `**4.1** We reserves the right to update and change the Terms at any time without notice.\n**4.2** It is your responsibility to review the Terms periodically for changes.\n\nBy using the Bot, you acknowledge and agree to these Terms and to Discord's [Terms of Service](https://discord.com/terms). If you have any questions or concerns, please contact through our [support server](https://discord.gg/RWSEj6JrjJ).`, inline: false}
        )
        .setTimestamp()

        await interaction.reply({ embeds: [embed], ephemeral: true })

    },
};