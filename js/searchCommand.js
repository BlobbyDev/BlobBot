const commandsData = [
    {
        category: 'Moderation',
        commands: [
            { command: '/ban', description: 'Ban a user from the server', example: '/ban @Blob bad boi' },
            { command: '/kick', description: 'Kick a user from the server', example: '/kick @Blob bad boi' },
            { command: '/purge', description: 'Clears the given amount of messages for you [Make sure the messages are less than 15 days old]', example: '/purge 50' },
            { command: '/slowmode', description: 'Sets up the slowmode in any time you want in any channel [Set it up in time based on seconds and make sure it\'s below 6 hrs]', example: '/slowmode 69' },
            { command: '/timeout', description: 'Timeout a user for a given amount of time', example: '/timeout @Blob 1d' },
            { command: '/unban', description: 'Unban a user from the server', example: '/unban @Blob good boi' },
        ]
    },
    {
        category: 'Admin',
        commands: [
            { command: '/anti-toxicity-configure', description: 'Configure anti-toxicity system for this server.', example: '/anti-toxicity-configure #mod-logs @Mods #mod-chat' },
            { command: '/ticket-configure', description: 'Configures ticket system for this server', example: '/ticket-configure #support Tickets @Support #ticket-logs' },
            { command: '/welcome-configure', description: 'Greets new members who joined the server', example: '/welcome-confugre #welcome Hello my friend' },
            { command: '/leave-configure', description: 'Says goodbye to the users who left the server (not in dms dw)', example: '/leave-configure @Blob Bad boi' },
            { command: '/message-log-configure', description: 'Configure message log system into a channel', example: '/message-log-configure #message-logs #mod-chat' },
            { command: '/autorole-configure', description: 'Configure autorole system in which a new member receives a role when they join the server', example: '/autorole-configure @Member' },
            { command: '/anti-toxicity-disable', description: 'Disables anti toxicity system in this server', example: '/anti-toxicity-disable' },
            { command: '/ticket-disable', description: 'Disabled ticket system for the server', example: '/ticket-disable' },
            { command: '/welcome-disable', description: 'Disables greeting system for this server', example: '/welcome-disable' },
            { command: '/leave-disable', description: 'Disables leave message system for the server', example: '/leave-disable' },
            { command: '/message-log-disable', description: 'Disables message logging for this server', example: '/message-log-disable' },
            { command: '/autorole-disable', description: 'Disables auto role system for this server', example: '/autorole-disable' },
        ]
    },
    {
        category: 'Fun',
        commands: [
            { command: '/8ball', description: 'Plays the magic 8ball game', example: '/8ball are you cool?' },
            { command: '/ascii', description: 'Converts a text into ASCII format', example: '/ascii Hello' },
            { command: '/coinflip', description: 'Flip a coin', example: '/coinflip' },
            { command: '/emojify', description: 'Converts a text into emoji format', example: '/emojify Hello' },
            { command: '/meme', description: 'Posts a random meme from r/dankmemes', example: '/meme' },
            { command: '/guess-the-pokemon', description: 'Starts guess the Pokemon game', example: '/guess-the-pokemon' },
            { command: '/pp', description: 'Measures the pp size of a member (virtually)', example: '/pp @Blob' },
            { command: '/rock-paper-scissors', description: 'Starts rock-paper-scissors game with your friend', example: '/rock-paper-scissors @Blob' },
            { command: '/snake', description: 'Starts the snake game', example: '/snake' },
            { command: '/tic-tac-toe', description: 'Starts tic-tac-toe game with your friend', example: '/guess-the-pokemon' },
            { command: '/trivia', description: 'Starts the trivia game', example: '/trivia Medium' },
            { command: '/wordle', description: 'Starts Wordle game', example: '/wordle' },
        ]
    },
    {
        category: 'Utility',
        commands: [
            { command: '/ai', description: 'Ask chatbot a question', example: '/ai write an essay about school' },
            { command: '/analyze-toxicity', description: 'Analyzes the toxicity level in your text', example: '/analyze-toxicity You suck' },
            { command: '/calculate', description: 'Calculates a math problem for you', example: '/calculate 1 + 1' },
            { command: '/enlarge-emoji', description: 'Enlarges a custom emoji (default emojis won\'t work)', example: '/enlarge-emoji :blob:' },
            { command: '/linkshorten', description: 'Shortens a valid link to is.gd format', example: '/linkshorten https://youtube.com/ yt' },
            { command: '/translate', description: 'Translates a text to available languages', example: '/translate Hello Russian' },
            { command: '/urban', description: 'Provides the meaning of a phrase using Urban Dictionary', example: '/urban gyat' },
            { command: '/weather', description: 'Gives you information about a city\'s weather', example: '/weather Abu Dhabi' },
        ]
    },
    {
    category: 'Image',
    commands: [
            { command: '/blur-avatar', description: 'Gives blur effect to the user\'s avatar', example: '/blur-avatar @Blob' },
            { command: '/deletetrash-avatar', description: 'Creates a delete trash meme from a user\'s avatar', example: '/deletetrash-avatar @Blob' },
            { command: '/greyscale-avatar', description: 'Gives greyscale effect to the user\'s avatar', example: '/greyscale-avatar @Blob' },
            { command: '/invert-avatar', description: 'Gives invert effect to the user\'s avatar', example: '/invert-avatar @Blob' },
            { command: '/jail-avatar', description: 'Puts a user\'s avatar in jail', example: '/jail-avatar @Blob' },
            { command: '/triggered-avatar', description: 'Makes a triggered effect in the user\'s avatar', example: '/triggered-avatar @Blob' },
        ]
    },

    {
        category: 'Economy',
        commands: [
            { command: '/balance', description: 'Check yours or a user\'s balance', example: '/balance' },
            { command: '/beg', description: 'Aww, beg for coins?', example: '/beg' },
            { command: '/buy', description: 'Purchase an item from the shop', example: '/buy Wood 2' },
            { command: '/daily', description: 'Claim your daily coin income', example: '/daily' },
            { command: '/delete-account', description: 'Deletes your economy account', example: '/delete-account' },
            { command: '/gamble', description: 'Gamble for more coins (you can lose them too)', example: '/gamble 1000' },
            { command: '/inventory', description: 'View your items that you own', example: '/inventory' },
            { command: '/richest', description: 'Shows top 10 richest members in the server', example: '/richest' },
            { command: '/sell', description: 'Sell items for coins', example: '/sell Diamond' },
            { command: '/shop', description: 'View the shop so that you can spend your hard-earned coins', example: '/shop' },
            { command: '/transfer-coins', description: 'Transfer coins to your friend', example: '/transfer-coins 2000 I love you' },
        ]
    },
    {
        category: 'Leveling',
        commands: [
            { command: '/leaderboard', description: 'View top 10 active members in the server', example: '/leaderboard' },
            { command: '/rank', description: 'View your rank in the server and your leveling progress', example: '/rank' },
            { command: '/leveling-enable', description: 'Enable leveling in the server', example: '/leveling-enable' },
            { command: '/leveling-disable', description: 'Disables leveling system in the server', example: '/leveling-disable' },
            { command: '/level-up-configure', description: 'Configure which you want the level up messages to be', example: '/level-up #level-ups' },
            { command: '/level-up-disable', description: 'Disables the bot from sending level up messages', example: '/level-up-disable' },
        ]
    },
    {
        category: 'Miscellaneous',
        commands: [
            { command: '/help', description: 'Shows all the commands available in me', example: '/help' },
            { command: '/invite', description: 'Provides you the invite link so that you can add me to your server 💖', example: '/invite' },
            { command: '/ping', description: 'Shows the bot\'s response time', example: '/ping' },
            { command: '/privacy-policy', description: 'Shows our privacy policy', example: '/privacy-policy' },
            { command: '/terms-of-service', description: 'Shows our terms of service', example: '/terms-of-service' },
            { command: '/support', description: 'Provides you a link towards our support server', example: '/support' },
        ]
    },
    {
        category: 'Information',
        commands: [
            { command: '/avatar', description: 'Shows yours or a user\'s avatar', example: '/avatar @Blob' },
            { command: '/inviteinfo', description: 'Provides the server info from an invite link', example: '/inviteinfo discord.gg/sound' },
            { command: '/serverinfo', description: 'Provides information about the interaction server', example: '/serverinfo' },
            { command: '/systeminfo', description: 'Provides information about my system', example: '/privacy-policy' },
            { command: '/whois', description: 'Provides detailed information about a user like creation date, joined date, permissions, highest role, user id, etc.', example: '/whois @Blob' },
        ]
    },
];

function searchCommands() {
    const searchInput = document.getElementById('commandSearch').value.trim().toLowerCase();
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    if (searchInput === '') {
        return;
    }

    let resultFound = false;

    commandsData.forEach(category => {
        const matchingCommands = category.commands.filter(cmd => cmd.command.includes(searchInput));
        if (matchingCommands.length > 0) {
            resultFound = true;
            const categorySection = document.createElement('section');
            categorySection.id = category.category.replace(/\s+/g, '-').toLowerCase();
            categorySection.className = 'py-5';
            categorySection.style.backgroundColor = '#aaa2a2';

            const container = document.createElement('div');
            container.className = 'container';

            const categoryHeader = document.createElement('h2');
            categoryHeader.className = 'text-left mb-4';
            categoryHeader.textContent = `${category.category} Commands`;

            const table = document.createElement('table');
            table.className = 'table table-dark table-bordered table-striped';

            const thead = document.createElement('thead');
            const theadRow = document.createElement('tr');
            const thCommand = document.createElement('th');
            thCommand.scope = 'col';
            thCommand.textContent = 'Command';
            const thDescription = document.createElement('th');
            thDescription.scope = 'col';
            thDescription.textContent = 'Description';
            const thExample = document.createElement('th');
            thExample.scope = 'col';
            thExample.textContent = 'Example';

            theadRow.appendChild(thCommand);
            theadRow.appendChild(thDescription);
            theadRow.appendChild(thExample);
            thead.appendChild(theadRow);

            const tbody = document.createElement('tbody');

            matchingCommands.forEach(matchingCommand => {
                const tr = document.createElement('tr');
                const tdCommand = document.createElement('td');
                tdCommand.textContent = matchingCommand.command;
                const tdDescription = document.createElement('td');
                tdDescription.textContent = matchingCommand.description;
                const tdExample = document.createElement('td');
                tdExample.textContent = matchingCommand.example;

                tr.appendChild(tdCommand);
                tr.appendChild(tdDescription);
                tr.appendChild(tdExample);
                tbody.appendChild(tr);
            });

            table.appendChild(thead);
            table.appendChild(tbody);

            container.appendChild(categoryHeader);
            container.appendChild(table);
            categorySection.appendChild(container);

            searchResults.appendChild(categorySection);
        }
    });

    if (!resultFound) {
        const noResultSection = document.createElement('section');
        noResultSection.className = 'py-5';
        noResultSection.style.backgroundColor = '#aaa2a2';

        const categoryHeader = document.createElement('h2');
        categoryHeader.className = 'text-left mb-4';
        categoryHeader.textContent = `${category.category} Commands`;
        categoryHeader.style.color = 'black';

        const noResultContainer = document.createElement('div');
        noResultContainer.className = 'container';

        const noResultHeader = document.createElement('h2');
        noResultHeader.className = 'text-left mb-4';
        noResultHeader.textContent = 'No Result Found';

        noResultContainer.appendChild(noResultHeader);
        noResultSection.appendChild(noResultContainer);

        searchResults.appendChild(noResultSection);
    }
}