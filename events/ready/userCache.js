module.exports = async (client) => {
        
    let usersCount = 0;
    for (const guild of client.guilds.cache) {
    usersCount += (await guild[1].members.fetch()).size
    }

    await console.log(`Cached ${usersCount} Users`)
    
}