const { EmbedBuilder, Client, Interaction } = require('discord.js');
const moment = require('moment')
const verification = {
    '0': 'None',
    '1': 'Low',
    '2': 'Medium',
    '3': 'High',
    '4': 'Highest',
}

const notification = {
    ALL: 'All Messages',
    MENTIONS: 'Only Mentions'
}

module.exports = {

    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async (client, interaction) => {

        const memberCount = interaction.guild.memberCount;
        const bots = interaction.guild.members.cache.filter(b => b.user.bot).size;
        const humans = memberCount - bots

        const owner = await interaction.guild.fetchOwner();

        const embed = new EmbedBuilder()
        .setTitle(interaction.guild.name)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 1024}))
        .addFields(
            {name: 'ID', value: `${interaction.guild.id}`, inline: true},
            {name: 'Member Count', value: `\`${memberCount}\` Total Users\n\`${humans}\` Humans\n\`${bots}\` Bots`, inline: true},
            {name: 'Owner', value: `${owner.user}\n(${owner.user.tag})`, inline: true},
            {name: 'Vanity Code', value: `${interaction.guild.vanityURLCode??'None'}`, inline: true},
            {name: 'Verified', value: `${interaction.guild.verified ? 'Yes' : 'No'}`, inline: true},
            {name: 'Partnered', value: `${interaction.guild.partnered ? 'Yes' : 'No'}`, inline: true},
            {name: 'Verification', value: `${verification[interaction.guild.verificationLevel]}`, inline: true},
            {name: 'Emoji Count', value: `\`${interaction.guild.emojis.cache.size}\` Emojis`, inline: true},
            {name: 'Role Count', value: `\`${interaction.guild.roles.cache.size}\` Roles`, inline: true},
            {name: 'Highest Role', value: `<@&${interaction.guild.roles.highest.id}>`, inline: true},
            {name: 'AFK Channel', value: (interaction.guild.afkChannel) ? `${interaction.guild.afkChannel}` : '`None`', inline: true},
            {name: 'AFK Timeout', value: (interaction.guild.afkChannel) ? `\`${moment.duration(interaction.guild.afkTimeout * 1000).asMinutes()} minutes\`` : '`None`', inline: true},
            {name: 'System Channel', value: (interaction.guild.systemChannel) ? `${interaction.guild.systemChannel}` : '`None`', inline: true},
            {name: 'Rules Channel', value: (interaction.guild.rulesChannel) ? `${interaction.guild.rulesChannel}` : '`None`', inline: true},
            {name: 'Channel Count', value: `\`${interaction.guild.channels.cache.size}\` Channels`, inline: true},
            {name: 'Creation Date', value: `<t:${(interaction.guild.createdTimestamp/1000).toFixed(0)}:f> (<t:${(interaction.guild.createdTimestamp/1000).toFixed(0)}:R>)`, inline: false},
            {name: 'Server Description', value: `${interaction.guild.description??'None'}`, inline: false},
            {name: 'Server Features', value: `\`\`\`${interaction.guild.features.join(', ') || 'None'}\`\`\``, inline: false},
        )
        .setImage(interaction.guild.bannerURL({dynamic: true, size: 1024}))

        await interaction.reply({embeds: [embed]})
    },

    name: 'serverinfo',
    description: 'Provide the information of the interaction guild'

}