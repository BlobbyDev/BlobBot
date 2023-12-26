const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require('discord.js');

module.exports = {
    /**
    *
    * @param {Client} client
    * @param {Interaction} interaction
    */

    callback: async (client, interaction) => {

        const amount = interaction.options.getInteger('amount');
        const channel = interaction.channel;

        if (amount === 0 || amount < 0) {
            await interaction.reply({ content: `Can't purge ${amount} number of messages`, ephemeral: true });
            return;
        }

        let messages = await channel.messages.fetch({ limit: amount });
     
        await channel.bulkDelete(messages);

        await interaction.reply({ content: `Purged ${messages.size} messages from ${channel}`, ephemeral: true });
    },

    name: 'purge',
    description: 'Clears messages for you',
    options: [
        {
            name: 'amount',
            description: 'Number of messages to be cleared',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.ManageMessages],
    botPermissions: [PermissionFlagsBits.ManageMessages],
};



