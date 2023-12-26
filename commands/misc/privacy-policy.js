const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'privacy-policy',
    description: 'Provide our privacy policy',
  
    callback: async (client, interaction) => {
      
        const embed = new EmbedBuilder()
        .setTitle(`Privacy Policy for ${client.user.tag}`)
        .setDescription(`Thank you for choosing ${client.user.username}. This Privacy Policy is intended to inform you about the collection, use, and protection of your data when using the Bot's services.`)
        .addFields(
            {name: ' Data Collection and Usage', value: `The Bot may collect and utilize certain information from Discord servers to provide features such as anti-toxicity, economy, message log, autorole, leveling, join-leave logs, and ticket system. The specific data includes Channel ID, Guild ID, and Role ID. It is important to note that this data is only collected when an administrator explicitly runs a command to enable the corresponding feature.`, inline: false},
            {name: 'Data Access', value: 'The Bot will access the necessary data on Discord servers solely for the purpose of executing the functionalities requested by administrators. The collected data will not be used for any other purpose, and access is restricted to the minimum necessary to perform the requested tasks.', inline: false},
            {name: 'Data Retention', value: `All collected data, including Channel ID, Guild ID, and Role ID, will be retained only for the duration necessary to execute the requested features. Upon removal of the Bot from the server or the use of a disable command for each specific feature, the corresponding data will be promptly deleted from the Bot's database [(Mongo DB)](https://www.mongodb.com/).`, inline: false},
            {name: 'Data Security', value: 'The Bot may utilize third-party services like [perspective api](https://perspectiveapi.com/) to enhance its features. These services will adhere to their own privacy policies, and users are encouraged to review them separately.', inline: false},
            {name: 'Consent', value: 'By using the Bot and its features, administrators consent to the collection and use of data as outlined in this Privacy Policy.', inline: false},
            {name: 'Contact Information', value: `For any questions or concerns regarding this Privacy Policy, please contact through out [Support Server](https://discord.gg/RWSEj6JrjJ)`, inline: false}
        )
        .setTimestamp()

        await interaction.reply({ embeds: [embed], ephemeral: true })

    },
};