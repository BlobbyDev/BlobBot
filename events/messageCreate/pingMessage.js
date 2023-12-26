const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')

module.exports = async (client, message) => {

    if (!message.guild || message.author.bot || message.webhookID) return;

    if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {

        const embed = new EmbedBuilder()
        .setTitle(`Hello!`)
        .setThumbnail(client.user.displayAvatarURL({dynamic: true, size: 1024}))
        .setDescription(`I'm ${client.user.username}, a multifunctional bot with commands for Moderation, Fun, Utility, Information, Configuration, Leveling, Images and Economy.\n\n• Run </help:1176860932010414101> to view available commands.\n• For more details visit my [website](https://blobbot.me)\n• Run </report-bug:1182014827644850247> if you find any bugs within the bot.`)
        .setTimestamp()

        const buttons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel('Website')
            .setStyle(ButtonStyle.Link)
            .setURL('https://blobbot.me'),
            new ButtonBuilder()
            .setLabel('Add Me')
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=19253197663350&scope=applications.commands%20bot`),
            new ButtonBuilder()
            .setLabel('Support Server')
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.gg/RWSEj6JrjJ'),
            new ButtonBuilder()
            .setLabel('Vote')
            .setStyle(ButtonStyle.Link)
            .setURL('https://top.gg/bot/1176859091063279616/vote'),
        )

        await message.reply({embeds: [embed], components: [buttons]})
    }

}