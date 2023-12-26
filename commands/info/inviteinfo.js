const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    EmbedBuilder
} = require('discord.js');

const verification = {
    '0': 'None',
    '1': 'Low',
    '2': 'Medium',
    '3': 'High',
    '4': 'Highest',
}

module.exports = {
    /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async(client, interaction) => {

        await interaction.deferReply();

        let input = interaction.options.getString('invite');

        input.replace('discord.gg', '');
        input.replace('https://discord.gg/', '');
        input.replace('https://discord.com/invite/', '');
        input.replace('http://discord.gg/', '');

        let invite;
        try {
            invite = await client.fetchInvite(input, {withCounts: true})
        } catch (error) {
            await interaction.editReply({content: `Couldn't find invite \`${input}\``});
        }

        if (!invite) return;

        let me = client.guilds.cache.get(invite.guild.id);

        if (!me) me = false;
        else me = true;

        const embed = new EmbedBuilder()
        .setTitle(invite.guild.name)
        .setThumbnail(invite.guild.iconURL({ dynamic: true, size: 1024}))
        .addFields(
            {name: 'ID', value: `${invite.guild.id}`, inline: true},
            {name: 'Member Count', value: `${invite.memberCount} Users`, inline: true},
            {name: 'Vanity Code', value: `${invite.guild.vanityURLCode??'None'}`, inline: true},
            {name: 'Verified', value: `${invite.guild.verified ? 'Yes' : 'No'}`, inline: true},
            {name: 'Partnered', value: `${invite.guild.partnered ? 'Yes' : 'No'}`, inline: true},
            {name: 'Verification', value: `${verification[invite.guild.verificationLevel]}`, inline: true},
            {name: 'Creation Date', value: `<t:${(invite.guild.createdTimestamp/1000).toFixed(0)}:f> (<t:${(invite.guild.createdTimestamp/1000).toFixed(0)}:R>)`, inline: false},
            {name: 'Server Description', value: `${invite.guild.description??'None'}`, inline: false},
            {name: 'Server Features', value: `\`\`\`${invite.guild.features.join(', ') || 'None'}\`\`\``, inline: false},
        )
        .setImage(invite.guild.bannerURL({dynamic: true, size: 1024}))
        .setTimestamp()

        await interaction.editReply({embeds: [embed]})
    },

    name: 'inviteinfo',
    description: "Provides information of any server through invite link",
    options: [
        {
          name: 'invite',
          description: 'Invite of the server you want the information of',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
    ],

}