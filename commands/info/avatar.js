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

        const mentionedUserId = interaction.options.get('target-user')?.value;
        const targetUserId = mentionedUserId || interaction.member.id;
        const targetUserObj = await interaction.guild.members.fetch(targetUserId);
        const avatar = targetUserObj.user.displayAvatarURL({ dynamic: true, size: 1024 });

        if(!targetUserObj) {
          await interaction.reply({content: "User does't exist in this server", ephemeral: true})
        }

        const embed = new EmbedBuilder()
        .setTitle(`**${targetUserObj.displayName}**'s Avatar`)
        .setImage(avatar)
        .setTimestamp()  

        await interaction.reply({embeds: [embed]})


    },

    name: 'avatar',
    description: "Shows your/someone's avatar",
    options: [
      {
        name: 'target-user',
        description: 'Member',
        type: ApplicationCommandOptionType.User,
      },
    ],
}