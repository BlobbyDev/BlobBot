const getLocalCommands = require('../../utils/getLocalCommands');
const Blacklist = require('../../models/blacklist');

module.exports = async (client, interaction, messages) => {

  if (!interaction.isChatInputCommand()) return;

  if (!interaction.inGuild()) {
    interaction.reply(`All my commands can only be executed in a server\n[Add me to your server](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=19253197663350&scope=bot%20applications.commands)\n[Support Server](https://discord.gg/RWSEj6JrjJ)\n[Vote](<https://top.gg/bot/1176859091063279616/vote>)`)
    return;
  }

  const localCommands = getLocalCommands();

  try {

    const blacklist = await Blacklist.findOne({ userId: interaction.user.id });

    if (blacklist) {
      interaction.reply({content: `You've been blacklisted from using this bot. Join our [support server](https://discord.gg/RWSEj6JrjJ) to appeal.`, ephemeral: true})
      return;
    }

    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName
    );

    if (!commandObject) return;

    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          interaction.reply({
            content: `You dont have enough permissions: ${commandObject.permissionsRequired}`,
            ephemeral: true,
          });
          return;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;
        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: "I don't have enough permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }

    await commandObject.callback(client, interaction, messages);
  } catch (error) {
    console.log(`There was an error running this command: ${error}`);
  }
};