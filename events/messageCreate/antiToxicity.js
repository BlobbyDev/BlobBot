const { EmbedBuilder } = require('discord.js');
const Perspective = require('perspective-api-client');
const AntiToxicity = require('../../models/antiToxicity');

require('dotenv').config()

module.exports = async(client, message) => {

    if (message.author.bot || !message) return;

    try {

        let guild = message.guild;
        if (!guild) return;

        const data = await AntiToxicity.findOne({ guildId: guild.id });
        if (!data) return;

        let channel = data.channelId;
        let role = data.bypassRoleId;
        let set = data.severity;
        let ignoreChannels = data.ignoredChannelId ? data.ignoredChannelId.split(',') : [];
        loggingChannel = guild.channels.cache.get(channel);

        if (ignoreChannels.includes(message.channel.id)) return;

        if (role && message.member.roles.cache.has(role)) {
            return;
        }
        
        const perspective = new Perspective({ apiKey: process.env.GOOGLE_KEY });
        const result = await perspective.analyze(message.content);

        if (result && result.attributeScores && result.attributeScores.TOXICITY && result.attributeScores.TOXICITY.summaryScore) {

            const toxicityScore = result.attributeScores.TOXICITY.summaryScore.value * 100;
            if (toxicityScore > set) {

                message.delete()
                message.channel.send({content: `${message.author} Your message has been deleted because the toxicity is \`${toxicityScore}\`% which is more than this server's tolerance \`${set}\`%`, ephemeral: true})
                .then(msg => {
                    setTimeout(() => msg.delete(), 10000)
                })

                if (message.content.length > 3850) message.content = message.content.slice(0, 3847) + '...';

                const logEmbed = new EmbedBuilder()
                .setTitle(`Toxic Message Deleted`)
                .setDescription(`${message.content}`)
                .addFields(
                    { name: 'Channel', value: `${message.channel} (${message.channel.id})`},
                    { name: 'Toxicity Level', value: `\`${toxicityScore}\`%`, inline: false},
                    { name: 'Message Link', value: `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id} (<https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}>)`, inline: false }
                )
                .setAuthor({ name: `${message.author.username} (${message.author.id})`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}` })
                .setFooter({text: `Message ID: ${message.id}`})
                .setTimestamp()

                await loggingChannel.send({embeds: [logEmbed]})
            }

        } else {
            throw new Error('Invalid response from Perspective API');
        }

    } catch (error) {
        console.log(`Anti toxicity system: ${error}`)
    }
}