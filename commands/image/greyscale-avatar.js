const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    AttachmentBuilder,
} = require('discord.js');

const DIG = require('discord-image-generation');

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

        if(!targetUserObj) {
            await interaction.reply({content: "User not found", ephemeral: true})
            return;
        }

        const avatar = targetUserObj.user.displayAvatarURL({ dynamic: false, size:  1024, extension: 'png', forceStatic: true})
        new DIG.Blur().getImage(avatar);
        let img = await new DIG.Greyscale().getImage(avatar);
        let attach = new AttachmentBuilder(img, "greyscale.png");

        await interaction.reply({files: [attach]})
    },

    name: 'greyscale-avatar',
    description: "Converts a user's avatar into greyscale affect",
    options: [
      {
        name: 'target-user',
        description: 'User you want to greyscale avatar',
        type: ApplicationCommandOptionType.User,
      },
    ],
}