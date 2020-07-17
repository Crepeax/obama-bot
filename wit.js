const config = require('./config.json');
const { Wit } = require('node-wit');
const { Message } = require('discord.js');
const client = new Wit({accessToken: config["wit-token"]});

function random(low, high) {
    low = Math.ceil(low);
    high = Math.floor(high);
    high = high + 1;
    rndm = Math.random();
    return Math.floor(rndm * (high - low) + low);
}

// The database karma sets stored in
const karmaDB = require('./index').karma;
const coinsDB = require('./index').coins;

/**
 * @param {Message} message 
 */
module.exports.execute = function(message) {
    if (!message.content) return;
    if (message.content.length > 280) return randomAward();

    // Send the message to wit.ai
    client.message(message.content)
    .then(response => {

        let action = response.intents[0];

        // "Execute" the intent.
        if (!action) return randomAward();
        switch(action.name) {
            case 'awardspam':
                // Disabled for "karma balancing reasons"
                randomAward();
                return;

                // Spam a fuckton of awards
                message.react('731564182079799306').then(() => {
                    message.react('719181283393142786').catch().then(() => {
                    message.react('731192828415443116').catch().then(() => {
                    message.react('731192829262692372').catch().then(() => {
                    message.react('731192942080950333').catch().then(() => {
                    message.react('731508866273247252').catch().then(() => {
                    message.react('716021350883393566').catch();
                    })})})})})});
            break;
            case 'upvote':
                message.react('719181283393142786');
                karmaDB.inc(message.author.id);
            break;
            case 'downvote':
                message.react('719181283774955540');
                karmaDB.dec(message.author.id);
            break;
            default:
                randomAward();
            break;
        }
    })
    .catch(error => {
        console.error(error);
        message.channel.send('Wit.ai error:\n' + error);
    });
    function randomAward() {
        // Randomly decide if the message should get a random "award" or yeet an obamium on it
        if (message.content.toLowerCase().indexOf('obamium') > -1 || message.content.toLowerCase().indexOf('obama') > -1) {
            return message.react('716021350883393566').catch();
        }
        const randomNum = random(0, 10000) / 100;
        if      (randomNum > 99.9) {message.react('731508866273247252').catch(); coinsDB.set(message.author.id, (coinsDB.get(message.author.id) + 2500))} // Argentinum
        else if (randomNum > 99.5)  {message.react('731192942080950333').catch(); coinsDB.set(message.author.id, (coinsDB.get(message.author.id) + 700)) } // Platinum
        else if (randomNum > 99)  {message.react('731192829262692372').catch(); coinsDB.set(message.author.id, (coinsDB.get(message.author.id) + 100)) } // Gold
        else if (randomNum > 98)    {message.react('731192828415443116').catch(); coinsDB.set(message.author.id, (coinsDB.get(message.author.id) + 0))   } // Silver
        require('./karma').updateRoles(message.author.id);
    }
}
