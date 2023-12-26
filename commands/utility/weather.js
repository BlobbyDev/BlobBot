const weather = require('weather-js');
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
        try {
            const query = interaction.options.getString('location');

            weather.find({search: query, degreeType: 'C'}, function(err, result) {
                if(err) interaction.reply({content: err.message, ephemeral: true});
                if(result.length === 0) return interaction.reply({content: `Enter a valid location`, ephemeral: true});

                var current = result[0].current;
                var location = result[0].location;

                const embed = new EmbedBuilder()
                .setTitle(`Weather for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .addFields(
                    {name: 'Timezone', value: `UTC ${location.timezone}`, inline: true},
                    {name: 'Temperature', value: `${current.temperature} °C`, inline: true},
                    {name: 'Feels Like', value: `${current.feelslike} °C`, inline: true},
                    {name: 'Winds', value: `${current.winddisplay}`, inline: true},
                    {name: 'Humidity', value: `${current.humidity}%`, inline: true},
                    {name: 'Date', value: `${current.date}`, inline: true},
                    {name: 'Day', value: `${current.day}`, inline: true}
                )
                .setFooter({text: `Requested by ${interaction.user.username} (${interaction.user.id})`})
                .setTimestamp()

                interaction.reply({embeds: [embed]})
            })
        } catch (err) {
            await interaction.reply({content: `Please Enter a valid location`, ephemeral: true});
        }
    },
    name: 'weather',
    description: "Give you the details about weather of provided location",
    options: [
        {
            name: 'location',
            description: 'Location that you want weather details',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
}