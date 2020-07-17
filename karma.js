const Enmap = require('enmap');
const { ReactionUserManager } = require('discord.js');
const client = require('./index').client;

// Stores the karma and coins of users
const karma = require('./index').karma;
const coins = require('./index').coins;

const upvoteID =   '719181283393142786';
const downvoteID = '719181283774955540';

// Awards
const awards = {
    "731192828415443116": {
        name: "Silver",
        cost: 100,
        give: 0,
        role: "733407208536277113"
    },
    "731192829262692372": {
        name: "Gold",
        cost: 500,
        give: 100,
        role: "733407216199008416"
    },
    "731192942080950333":{
        name: "Platinum",
        cost: 1800,
        give: 700,
        role: "733407213900660807"
    },
    "731508866273247252": {
        name: "Argentium",
        cost: 20000,
        give: 2500,
        role: "733407211178557583"
    }
}


client.on('messageReactionAdd', async function(reaction, user) {
    // Fetch reaction and user if they are partial
    if (reaction.partial) reaction = await reaction.fetch();
    if (user.partial) reaction = await user.fetch();
    
    if (reaction.message.author.bot) return; // Dont give karma to bots

    await addToDatabase(reaction.message.author.id); // Add the user to the database

    if (!reaction.emoji.id) return; // Return when emoji has no ID (is a "default" emoji)
    if (user.bot) return; // Don't accept reactions from bots.
    if (!reaction.message.guild) return; // Don't accept reactions from DMs

    const message = reaction.message; // The message object the reaction was added to

    if (reaction.emoji.id == upvoteID) {
            karma.inc(message.author.id);
        return;
    }
    else if (reaction.emoji.id == downvoteID) {
            karma.dec(message.author.id);
        return;
    } else if (awards[reaction.emoji.id]) {
        let award = awards[reaction.emoji.id];
        if (coins.get(user.id) < award.cost) {
            message.channel.send(`${user}, you don't have sufficient coins to use this award.`);
            reaction.users.remove(user.id);
            return;
        }
        if (message.author.id == user.id) {
            //reaction.remove();
            reaction.users.remove(user.id);
            return message.channel.send(`${user}, why would you give an award to yourself? smh my head`);
        }
        coins.set(user.id, (coins.get(user.id) - award.cost));
        coins.set(message.author.id, (coins.get(message.author.id) + award.give));
        message.channel.send(`${message.author} has received the ${award.name} award${award.give > 0 ? ` and ${award.give} coins` : ''} by ${user}!`);
        require('./karma').updateRoles(user.id);
        require('./karma').updateRoles(message.author.id);
    }
});

client.on('messageReactionRemove', async function(reaction, user) {
    // Fetch reaction and user if they are partial
    if (reaction.partial) reaction = await reaction.fetch();
    if (user.partial) reaction = await user.fetch();

    await addToDatabase(reaction.message.author.id); // Add the user to the database

    if (!reaction.emoji.id) return; // Return when emoji has no ID (is a "default" emoji)
    if (user.bot) return; // Don't accept reactions from bots.
    if (!reaction.message.guild) return; // Don't accept reactions from DMs

    const message = reaction.message; // The message object the reaction was added to

    if (reaction.emoji.id == upvoteID) {
            karma.dec(message.author.id);
        return;
    }
    else if (reaction.emoji.id == downvoteID) {
            karma.dec(message.author.id);
        return;
    }
});

// Milestones for reaching certain karma values
function milestone(id) {

}

// Reset a user's coin/karma count when its not of type number
async function addToDatabase(id) {
    if (!id) return;
    if (typeof karma.get(id) != 'number') karma.set(id, 0);
    if (typeof coins.get(id) != 'number') coins.set(id, 100);
    return;
}

module.exports.updateRoles = function(id) {
    let member = client.guilds.cache.get('653568812578373643').members.cache.get(id);
    let membercoins = coins.get(member.id);
    Object.keys(awards).forEach(awardid => {
        let award = awards[awardid];

        if (member.roles.cache.has(award.role)) {
            if (membercoins < award.cost) member.roles.remove(award.role);
        } else {
            if (membercoins >= award.cost) member.roles.add(award.role);
        }
    });
}