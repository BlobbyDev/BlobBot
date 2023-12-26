module.exports = {
    name: 'support',
    description: 'Provide you invite to our support server',
  
    callback: async (client, interaction) => {
    
    await interaction.reply({ content: `**Support Server**\nhttps://discord.gg/RWSEj6JrjJ`});

   },
};