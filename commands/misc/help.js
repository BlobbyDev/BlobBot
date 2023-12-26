const {
    Client,
    Interaction,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuOptionBuilder,
    StringSelectMenuBuilder
} = require('discord.js');

module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async (client, interaction) => {

        const menu = new EmbedBuilder()
        .setTitle(client.user.username)
        .setDescription("• All my commands are grouped into modules.\n• For more details [click here](https://blobbot.me/commands)\n• Run </report-bug:1182014827644850247> if you find any bugs within the bot.")
        .addFields(
            {name: 'Links', value: `[Website](https://blobbot.me)\n[Bot Invite Link](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=19253197663350&scope=bot%20applications.commands)\n[Support Server](https://discord.gg/RWSEj6JrjJ)\n[Vote](https://top.gg/bot/1176859091063279616/vote)`},
            {name: 'Note', value: 'Select a module from the dropdown to view commands for that specific module.'}
        )
        .setTimestamp()
        const selectMenus = new StringSelectMenuBuilder()
        .setCustomId('moduleSelector')
        .setPlaceholder('Command Modules')
        .addOptions(
            new StringSelectMenuOptionBuilder()
            .setLabel('📜 Main Menu')
            .setValue('menu'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Moderation')
            .setValue('moderation'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Admin')
            .setValue('admin'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Image')
            .setValue('image'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Information')
            .setValue('information'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Fun')
            .setValue('fun'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Utility')
            .setValue('utility'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Economy')
            .setValue('economy'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Leveling')
            .setValue('leveling'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Miscellaneous')
            .setValue('misc'),
        );

        const row = new ActionRowBuilder()
        .addComponents(selectMenus)

        const moderation = new EmbedBuilder()
        .setTitle('Moderation Module')
        .setDescription("These are the **Moderation** commands make sure you and I have permissions like **Ban**, **Kick**, **Timeout**, **Manage Messages**, **Manage Channel** to run these commands.")
        .addFields(
            {name: "Commands", value: '</ban:1176861020812218370>, </unban:1179010145045450753>, </kick:1176861023312023612>, </timeout:1176864235502981252>, </slowmode:1177256275499827230>, </purge:1178806586756579389>', inline: false}
        )
        .setTimestamp()

        const admin = new EmbedBuilder()
        .setTitle('Admin Module')
        .setDescription("These are the **Admin** commands make sure you have permission **Administrator** to run these commands.")
        .addFields(
            {name: "Configuration Commands", value: '</autorole-configure:1176860577369436160>, </welcome-configure:1176860666972356628>, </leave-configure:1176860581194645525>, </ticket-configure:1176860584600416337>, </message-log-configure:1178099770519212064>, </anti-toxicity-configure:1180617269794046082>', inline: false},
            {name: 'Disable Commands', value: "</autorole-disable:1176860579231699025>, </welcome-disable:1176860669165961276>, </leave-disable:1176860582692007977>, </ticket-disable:1176860663814041650>, </message-log-disable:1178099772754755604>, </anti-toxicity-disable:1180617272671342662>"},
        )
        .setTimestamp()

        const image = new EmbedBuilder()
        .setTitle('Image Module')
        .setDescription("These are the **Image** commands.")
        .addFields(
            {name: "Commands", value: '</blur-avatar:1176860838859120674>, </deletetrash-avatar:1176860841849651211>, </greyscale-avatar:1176860843678384151>, </invert-avatar:1176860845804896256>, </jail-avatar:1176860847730077806>, </triggered-avatar:1176860926280994888>', inline: false},
        )
        .setTimestamp()

        const info = new EmbedBuilder()
        .setTitle('Information Module')
        .setDescription("These are the **Information** commands.")
        .addFields(
            {name: "Commands", value: '</avatar:1176860929447702558>, </systeminfo:1176861014436892673>, </whois:1176861018106908722>, </roleinfo:1176861012650098771>, </inviteinfo:1179061070988595200>, </serverinfo:1182402216850620487>', inline: false},
        )
        .setTimestamp()

        const fun = new EmbedBuilder()
        .setTitle('Fun Module')
        .setDescription("These are the **Fun** commands.")
        .addFields(
            {name: 'Commands', value: '</coinflip:1176860755417641051>, </8ball:1176860750996844635>, </ascii:1176860753395982336>, </emojify:1176860757552533554>, </pp:1176860760018796566>, </meme:1181323322303193148>, </tic-tac-toe:1183167823091085373>, </snake:1183167820373168198>, </trivia:1183168326415949906>, </rock-paper-scissors:1183167817353269278>, </minesweeper:1183167814891212840>, </guess-the-pokemon:1183167812831813662>, </wordle:1184211736304308355>', inline: false},
        )
        .setTimestamp()

        const utility = new EmbedBuilder()
        .setTitle('Utility Module')
        .setDescription("These are the **Utility** commands.")
        .addFields(
            {name: 'Commands', value: '</say:1176864321364566117>, </sayembed:1176864324279603290>, </enlarge-emoji:1176864239114268713>, </ai:1176864236815785994>, </translate:1176864325848272896>, </calculate:1176864238174736425>, </linkshorten:1176864240821354587>, </urban:1176864327752482846>, </weather:1176864328922693763>, </analyze-toxicity:1180617277691924511>', inline: false},
        )
        .setTimestamp()

        const economy = new EmbedBuilder()
        .setTitle('Economy Module')
        .setDescription("These are the **Economy** commands [Currency is global].")
        .addFields(
            {name: 'Commands', value: '</daily:1176860673444167792>, </balance:1176860670986309686>, </transfer-coins:1178789057933889696>, </gamble:1180111704961585183>, </beg:1180139931687985173>, </richest:1180292853465886744>, </inventory:1183797201705652274>, </shop:1183797209980993668>, </buy:1184205752580186192>, </sell:1184205755608465449>, </delete-account:1184555318445867078>', inline: false},
        )
        .setTimestamp()

        const leveling = new EmbedBuilder()
        .setTitle('Leveling Module')
        .setDescription("These are the **Leveling** commands.")
        .addFields(
            {name: 'Admin Only Commands', value: '</leveling-enable:1184176507627786281>, </leveling-disable:1184176504381374494>, </level-up-configure:1178687237391659130>, </level-up-disable:1178687239899844659>', inline: false},
            {name: 'Commands', value: '</rank:1185870602624585770>, </leaderboard:1178704684131811348>', inline: true}
        )
        .setTimestamp()

        const misc = new EmbedBuilder()
        .setTitle('Miscellaneous Module')
        .setDescription("These are the **Miscellaneous** commands.")
        .addFields(
            {name: "Commands", value: '</help:1176860932010414101>, </ping:1176860935604932729>, </support:1179015570805502002>, </privacy-policy:1181991505158742106>, </terms-of-service:1183107318561394709>, </report-bug:1182014827644850247>, </invite:1186698631517065269>', inline: false},
        )
        .setTimestamp()

        await interaction.reply({embeds: [menu], components: [row], ephemeral: true})

        const collector = interaction.channel.createMessageComponentCollector({
            filter: i => i.isStringSelectMenu()
        });

        collector.on('collect', async i => {

            let embed;

            switch (i.values[0]) {
                case 'menu':
                    embed = menu;
                    break;
                case 'moderation':
                    embed = moderation
                    break;
                case 'admin':
                    embed = admin;
                    break;
                case 'image':
                    embed = image;
                    break;
                case 'information':
                    embed = info;
                    break;
                case 'fun':
                    embed = fun;
                    break;
                case 'utility':
                    embed = utility;
                    break;
                case 'economy':
                    embed = economy;
                    break;
                case 'leveling':
                    embed = leveling;
                    break;
                case 'misc':
                    embed = misc;
                    break;
            }

            if (embed) {
                await i.update({ embeds: [embed], components: [row], ephemeral: true });
            }
        });

    },

    name: 'help',
    description: 'Lists out all the commands available in the bot'
}