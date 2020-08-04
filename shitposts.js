const Discord = require('discord.js');
const client = require('./index').client;

const tChannelID = '740207856288268289';
const emoji = '719181283393142786';

client.on('messageReactionAdd', async function(reaction, user) {

    let publish = false;

    // Fetch partials
    if (reaction.partial) reaction = await reaction.fetch();
    if (user.partial) user = await user.fetch();

    if (user.bot && user.id != client.user.id) return;
    if (reaction.message.channel.id != tChannelID) return;
    if (reaction.message.channel.type != 'news') return;

    if (reaction.emoji.id != emoji) return;

    const count = reaction.message.reactions.cache.filter(e => e.emoji.id == emoji).array()[0].count;
    
    if (count == 3) publish = true; // When the message has an attachment, publish it at 3 upvotes, else at 5

    // This publishes the message using a direct API call. (Copied from https://github.com/Forcellrus/Discord-Auto-Publisher/blob/master/bot.js)
    if (!publish) return;
    reaction.message.react(client.emojis.cache.get('730053273561727063')).catch();
    await fetch(`https://discord.com/api/v6/channels/${reaction.message.channel.id}/messages/${reaction.message.id}/crosspost`, {
        method: 'POST',
        headers: {
            Authorization: `Bot ${require('./config.json').token}`,
        },
    });
});