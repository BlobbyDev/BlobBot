module.exports = {
  name: 'ping',
  description: 'Replies with the bot ping!',

  callback: async (client, interaction) => {
    
    await interaction.reply('Pinging ...')
    await interaction.editReply(`Pong! \`${client.ws.ping}\`ms`);
  },
};