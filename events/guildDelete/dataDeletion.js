const AntiToxicity = require('../../models/antiToxicity');
const AutoRole = require('../../models/autoRole');
const LeaveLog = require('../../models/leaveLog');
const MessageLog = require('../../models/messageLog');
const TicketSystem = require('../../models/ticketSystem');
const LevelUp = require('../../models/levelUp');
const WelcomeLog = require('../../models/welcomeLog');
const Level = require('../../models/level');
const LevelingEnable = require('../../models/levelingEnabledGuild');

/**
 * @param {Client} client
 * @param {Guild} guild 
 */
module.exports = async (client, guild) => {
    try {
        const guildId = guild.id;

        if (await AntiToxicity.exists({ guildId })) {
            await AntiToxicity.findOneAndDelete({ guildId });
        }

        if (await AutoRole.exists({ guildId })) {
            await AutoRole.findOneAndDelete({ guildId });
        }

        if (await LeaveLog.exists({ guildId })) {
            await LeaveLog.findOneAndDelete({ guildId });
        }

        if (await WelcomeLog.exists({ guildId })) {
            await WelcomeLog.findOneAndDelete({ guildId });
        }

        if (await MessageLog.exists({ guildId })) {
            await MessageLog.findOneAndDelete({ guildId });
        }

        if (await TicketSystem.exists({ guildId })) {
            await TicketSystem.findOneAndDelete({ guildId });
        }

        if (await LevelUp.exists({ guildId })) {
            await LevelUp.findOneAndDelete({ guildId });
        }

        if (await Level.exists({ guildId })) {
            await Level.deleteMany({ guildId });
        }

        if (await LevelingEnable.exists({ guildId })) {
            await LevelingEnable.deletefindOneAndDeleteMany({ guildId });
        }
        
    } catch (error) {
        console.error(`Error in guildLeave event: ${error}`);
    }
};