module.exports = {
    name: 'invite',
    description: 'Provide you Auth link to add me to your server',
  
    callback: async (client, interaction) => {
    
    await interaction.reply({ content: `[Click here to add me to your server](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=19253197663350&scope=bot%20applications.commands)`});

   },
};