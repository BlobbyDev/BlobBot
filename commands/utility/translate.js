const {
    Client,
    Interaction,
    ApplicationCommandOptionType,
    EmbedBuilder
} = require('discord.js');
const translate = require('@iamtraction/google-translate');
const languages = {
    "af": "Afrikaans",
    "sq": "Albanian",
    "am": "Amharic",
    "ar": "Arabic",
    "hy": "Armenian",
    "az": "Azerbaijani",
    "eu": "Basque",
    "be": "Belarusian",
    "bn": "Bengali",
    "bs": "Bosnian",
    "bg": "Bulgarian",
    "ca": "Catalan",
    "ceb": "Cebuano",
    "ny": "Chichewa",
    "zh-cn": "Chinese Simplified",
    "zh-tw": "Chinese Traditional",
    "co": "Corsican",
    "hr": "Croatian",
    "cs": "Czech",
    "da": "Danish",
    "nl": "Dutch",
    "en": "English",
    "eo": "Esperanto",
    "et": "Estonian",
    "tl": "Filipino",
    "fi": "Finnish",
    "fr": "French",
    "fy": "Frisian",
    "gl": "Galician",
    "ka": "Georgian",
    "de": "German",
    "el": "Greek",
    "gu": "Gujarati",
    "ht": "Haitian Creole",
    "ha": "Hausa",
    "haw": "Hawaiian",
    "iw": "Hebrew",
    "hi": "Hindi",
    "hmn": "Hmong",
    "hu": "Hungarian",
    "is": "Icelandic",
    "ig": "Igbo",
    "id": "Indonesian",
    "ga": "Irish",
    "it": "Italian",
    "ja": "Japanese",
    "jw": "Javanese",
    "kn": "Kannada",
    "kk": "Kazakh",
    "km": "Khmer",
    "ko": "Korean",
    "ku": "Kurdish",
    "ky": "Kyrgyz",
    "lo": "Lao",
    "la": "Latin",
    "lv": "Latvian",
    "lt": "Lithuanian",
    "lb": "Luxembourgish",
    "mk": "Macedonian",
    "mg": "Malagasy",
    "ms": "Malay",
    "ml": "Malayalam",
    "mt": "Maltese",
    "mi": "Maori",
    "mr": "Marathi",
    "mn": "Mongolian",
    "my": "Burmese",
    "ne": "Nepali",
    "no": "Norwegian",
    "ps": "Pashto",
    "fa": "Persian",
    "pl": "Polish",
    "pt": "Portuguese",
    "pa": "Punjabi",
    "ro": "Romanian",
    "ru": "Russian",
    "sm": "Samoan",
    "gd": "Scots Gaelic",
    "sr": "Serbian",
    "st": "Sesotho",
    "sn": "Shona",
    "sd": "Sindhi",
    "si": "Sinhala",
    "sk": "Slovak",
    "sl": "Slovenian",
    "so": "Somali",
    "es": "Spanish",
    "su": "Sundanese",
    "sw": "Swahili",
    "sv": "Swedish",
    "tg": "Tajik",
    "ta": "Tamil",
    "te": "Telugu",
    "th": "Thai",
    "tr": "Turkish",
    "uk": "Ukrainian",
    "ur": "Urdu",
    "uz": "Uzbek",
    "vi": "Vietnamese",
    "cy": "Welsh",
    "xh": "Xhosa",
    "yi": "Yiddish",
    "yo": "Yoruba",
    "zu": "Zulu"
};
module.exports = {
     /**
     *
     * @param {Client} client
     * @param {Interaction} interaction
     */

    callback: async(client, interaction) => {
        const text = interaction.options.getString('text');
        const lan = interaction.options.getString('language');

        if (text.length > 1024) {
            return interaction.reply({content: `Please keep \`text\` under **1024** characters`, ephemeral: true})
        }

        await interaction.reply(`🔍 Translating ...`)

        const applied = await translate(text, {to: `${lan}`});

        const embed = new EmbedBuilder()
        .setTitle(`Translated text to ${languages[lan]}`)
        .addFields(
            {name: 'Input', value: `\`\`\`${text}\`\`\``, inline: false},
            {name: 'Output', value: `\`\`\`${applied.text}\`\`\``, inline: false}
        )
        .setFooter({text: `Requested by ${interaction.user.username}`})
        .setTimestamp()

        await interaction.editReply({content: '‎', embeds: [embed]})
    },

    name: 'translate',
    description: "Translates text to desired language available in the bot",
    options: [
        {
          name: 'text',
          description: 'Text to be translated',
          type: ApplicationCommandOptionType.String,
          required: true,
        },

        {
            name: 'language',
            description: 'Choose the languages',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {name: 'English', value: 'en'},
                {name: 'Latin', value: 'la'},
                {name: 'French', value: 'fr'},
                {name: 'German', value: 'de'},
                {name: 'Hindi', value: 'hi'},
                {name: 'Italian', value: 'it'},
                {name: 'Portugese', value: 'pt'},
                {name: 'Spanish', value: 'es'},
                {name: 'Russian', value: 'ru'},
                {name: 'Japanese', value: 'ja'},
                {name: 'Arabic', value: 'ar'},
                {name: 'Turkish', value: 'tr'},
                {name: "Chinese", value: 'zh-cn'},
                {name: 'Persian', value: 'fa'},
                {name: 'Javanese', value: 'jw'},
                {name: 'Urdu', value: 'ur'},
                {name: 'Korean', value: 'ko'},
                {name: 'Hebrew', value: 'iw'},
                {name: 'Vietnamese', value: 'vi'},
                {name: 'Dutch', value:'nl'},
                {name: 'Danish', value:'da'},
                {name: 'Dutch', value:'nl'},
                {name: 'Swedish', value:'sv'},
                {name: 'Ukrainian', value:'uk'},
                {name: 'Polish', value: 'pl'}
            ]
        },
    ],
    
}