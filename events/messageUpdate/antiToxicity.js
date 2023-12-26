const { Client, Message } = require('discord.js');
const Perspective = require('perspective-api-client');
const AntiToxicity = require('../../models/antiToxicity');

require('dotenv').config()

/**
 * @param {Client} client
 * @param {Message} oldMessage
 * @param {Message} newMessage
 */
module.exports = async (client, oldMessage, newMessage) => {
    try {
        if (newMessage.author.bot || !newMessage.content) return;

        let guild = newMessage.guild;
        if (!guild) return;

        const data = await AntiToxicity.findOne({ guildId: guild.id });
        if (!data) return;

        let channel = data.channelId;
        let role = data.bypassRoleId;
        let set = data.severity;
        let ignoreChannels = data.ignoredChannelId ? data.ignoredChannelId.split(',') : [];
        const loggingChannel = guild.channels.cache.get(channel);

        if (ignoreChannels.includes(newMessage.channel.id)) return;

        const edited = oldMessage && oldMessage.content !== newMessage?.content;

        if (role && newMessage.member.roles.cache.has(role)) {
            return;
        }

        const perspective = new Perspective({ apiKey: process.env.GOOGLE_KEY });
        const result = await perspective.analyze(edited ? newMessage?.content : newMessage?.content);

        if (result && result.attributeScores && result.attributeScores.TOXICITY && result.attributeScores.TOXICITY.summaryScore) {
            const toxicityScore = result.attributeScores.TOXICITY.summaryScore.value * 100;
            
            if (toxicityScore > set) {
                await newMessage.delete();
                await newMessage.channel.send({
                    content: `${newMessage.author} Your message has been deleted because the toxicity is \`${toxicityScore}\`% which is more than this server's tolerance \`${set}\`%`,
                }).then(msg => {
                    setTimeout(() => msg.delete(), 10000);
                });

                if (newMessage?.content && newMessage?.content.length > 2024) {
                    newMessage.content = newMessage.content.slice(0, 2021) + '...';
                }

                const logEmbed = {
                    title: 'Toxic Message Deleted',
                    description: newMessage?.content,
                    fields: [
                        { name: 'Channel', value: `${newMessage.channel} (${newMessage.channel.id})` },
                        { name: 'Toxicity Level', value: `\`${toxicityScore}\`%`, inline: false },
                        { name: 'Message Link', value: `https://discord.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id} (<https://discord.com/channels/${newMessage.guild.id}/${newMessage.channel.id}/${newMessage.id}>)`, inline: false }
                    ],
                    author: { name: `${newMessage.author.username} (${newMessage.author.id})`, iconURL: newMessage.author.displayAvatarURL({ dynamic: true }) },
                    timestamp: new Date()
                };

                await loggingChannel.send({ embeds: [logEmbed] });
            }
        } else {
            throw new Error('Invalid response from Perspective API');
        }
    } catch (error) {
        console.error(`Anti-toxicity system: ${error}`);
    }
};

