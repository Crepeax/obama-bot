const Discord = require('discord.js');
const client = new Discord.Client({partials: ["REACTION", "MESSAGE"]});
const config = require('./config.json');
const Enmap = require('enmap');

client.login(config.token);

const karma = new Enmap({name: "karma"}); 
const coins = new Enmap({name: "coins"});

module.exports.karma = karma;
module.exports.coins = coins;

module.exports.client = client;

const witmodule = require('./wit');

function random(low, high) {
    low = Math.ceil(low);
    high = Math.floor(high);
    high = high + 1;
    rndm = Math.random();
    return Math.floor(rndm * (high - low) + low);
}


client.once('ready', () => {
    console.log('Logged in as ' + client.user.username);
    client.user.setActivity(`cock and ball torture`, {type: "STREAMING", url: "https://www.youtube.com/watch?v=sHwvUFjaNdU"});

    // Start the module thingys
    require('./karma');
    require('./vibechat');
    require('./shitposts');
});

client.on('guildCreate', g => {
    if (g.id != '653568812578373643') {
        g.leave();
    }
})

let allowEval = false;

client.on('message', message => {

    addToDatabase(message.author.id);

    function checkMod(silent) {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            let erEmbed = new Discord.MessageEmbed()
            .setTitle('You are not allowed to use this.')
            .setDescription('Only the mod team can use this command.')
            .setImage('https://media1.tenor.com/images/1056e92668594b262d3338c897ce9bd3/tenor.gif?itemid=7706023');
            if (silent !== true) message.channel.send(erEmbed);
            return true;
        }
        return false;
    }
    
    function checkPremium(silent) {
        if (!message.member.permissions.has('ADMINISTRATOR') && !message.member.roles.cache.has('718862546395988078' /* True ObamaFan */) && !message.member.roles.cache.has('653569849888473145' /* Obama sphere */) && !message.member.roles.cache.has('733394201957498901' /* Obama circle */)) {
            let erEmbed = new Discord.MessageEmbed()
            .setTitle('You are not allowed to use this.')
            .setDescription('Only approved users can use this command.');
            if (silent !== true) message.channel.send(erEmbed);
            return true;
        }
        return false;
    }

    try {
        if (message.author.bot) return;
        if (!message.guild) return message.channel.send('You can only use me on the r/Obamium Discord right now.');
        if (message.guild.id != '653568812578373643') message.guild.leave();
        
        console.log(`Message by ${message.author.username}: ${message.content}`);

        witmodule.execute(message);


        // 69 nice haha le funny number
        if (message.content.toLowerCase().indexOf('69') > -1) {
            let replies = [
                'You said the funny number nice',
                'Haha funny 69',
                'You did a funny right here:\n> 69',
                'lmao funny number',
                '69 is funny haha',
                'you have achieved comedy by saying 69',
                'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Foriginal%2F000%2F016%2F588%2Fsixtynine.jpg&f=1&nofb=1',
                'Obama signed that your funny lmao',
                'haha funny sex number',
                'sex',
                '69 nice'
            ];

            let curIndex = 0;
            let continueSearch = true;
            let found = [];
            while (continueSearch) {
                if (message.content.toLowerCase().indexOf('69', curIndex) == -1) {
                    continueSearch = false;
                    break;
                }
                let f = message.content.toLowerCase().indexOf('69', curIndex);
                curIndex = f + 1;
                found.push(f);
            }
            delete continueSearch;
            delete curIndex;

            let send = false;
            found.forEach(index => {
                let charL = message.content.charAt(index - 1);
                let charR = message.content.charAt(index + 2);
                if ((isNaN(charL) || charL == '' || charL == ' ') && (isNaN(charR) || charR == '' || charR == ' ')) send = true;
            });

            if (send) message.channel.send(replies[random(0, replies.length - 1)]);
        }

        // Actual command stuff
        if (message.content.startsWith(`<@!${client.user.id}> help`) || message.content.startsWith(`<@!${client.user.id}>help`)) return message.channel.send(`My prefix is \`${config.prefix}\`, type ${config.prefix}help for help.`);
        if (!message.content.startsWith(config.prefix)) return;
        const args = message.content.slice(config.prefix.length).split(' ');
        const command = args.shift().toLowerCase();
        switch(command) {
            case 'help':
                let owner = client.users.cache.get('284323826165350400');
                let embed = new Discord.MessageEmbed()
                .setTitle('Commands')
                .addField('­', '**----- Public commands -----**')
                .setDescription(`Kneel down, mortals, for the command list, signed by Obama himself.\nEvery command starts with the prefix '**${config.prefix}**', for example ${config.prefix}help.`)
                .addField('-obamium', 'Send a Obamid in all its beauty')
                .addField('-vbucks', 'Totally working V-Bucks generator')
                .addField('-copypasta', 'oh shit oh fuck')
                .addField('-karma', 'Shows your karma and coins on this server')
                .addField('-top', 'Shows the users with the highest karma!')
                .addField('-ping', 'Shows the bot\'s latency')
                .addField('-brother', 'RGBRoachGang brothers, use this command to get access to a special channel!')
                .addField('­', '**----- Admin commands -----**')
                .addField('-truefan @Member', 'Give someone access to the top secret text channel™️')
                .addField('-coins @Member [give/set] [value]', 'Manage the coins of an user')
                .setFooter(`© Obamium Research | Developed by ${owner.username}#${owner.discriminator}`, 'https://cdn.discordapp.com/emojis/716021350883393566.gif')
                .setColor('9c6341');
                message.channel.send(embed);
            break;
            case 'obama':
            case 'obamid':
            case 'obamium':
                let msg = '';
                msg += message.guild.emojis.cache.get('715931208135213087').toString();
                msg += message.guild.emojis.cache.get('715931208281882666').toString();
                msg += message.guild.emojis.cache.get('715931208936325141').toString();
                msg += message.guild.emojis.cache.get('715931208332345366').toString();
                msg += '\n';
                msg += message.guild.emojis.cache.get('715931208269168812').toString();
                msg += message.guild.emojis.cache.get('715931208432746537').toString();
                msg += message.guild.emojis.cache.get('715931208491597924').toString();
                msg += message.guild.emojis.cache.get('715931208357249044').toString();
                msg += '\n';
                msg += message.guild.emojis.cache.get('715931208361574421').toString();
                msg += message.guild.emojis.cache.get('715931208134950963').toString();
                msg += message.guild.emojis.cache.get('715931208290140172').toString();
                msg += message.guild.emojis.cache.get('715931208374026332').toString();
                msg += '\n';
                msg += message.guild.emojis.cache.get('715931208378220666').toString();
                msg += message.guild.emojis.cache.get('715931208319500310').toString();
                msg += message.guild.emojis.cache.get('715931208898445402').toString();
                msg += message.guild.emojis.cache.get('715931208550318170').toString();

                message.channel.send(msg);
            break;
            case 'vbuck':
            case 'vbucks':
                message.delete();
                let embed2 = new Discord.MessageEmbed()
                .setAuthor('Free Vbucks 100% legit no virus', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdiscordemoji.com%2Fassets%2Femoji%2FVBuck.png&f=1&nofb=1')
                .setDescription('Click here to download free Vbucks: [https://vbuck-free-generator.com](https://bit.ly/freevbucks2020legitworking)')
                .setColor('88ccdb');
                message.channel.send(embed2);
            break;
            case 'amitheowner':
                if (message.author.id == '284323826165350400') {
                    message.channel.send(`Yes, ${message.author}, you definitely are my owner.`)
                } else {
                    message.channel.send(`No, ${message.author}, you are not my owner.`)
                }
            break;
            case 'ping':
                let pingEmbed = new Discord.MessageEmbed()
                .setTitle('Pong?')
                .setDescription('Measuring...')
                .setColor('#2F62CA');
                message.channel.send(pingEmbed).then(msg => {
                    pingEmbed.setTitle('Pong!');
                    pingEmbed.description = undefined;
                    pingEmbed.addField(':speech_balloon: Message delay', `\`${msg.createdTimestamp - message.createdTimestamp}ms\``, true);
                    pingEmbed.addField(':robot: Bot Ping', `\`${Date.now() - message.createdTimestamp}ms\``, true);
                    msg.edit(pingEmbed);
                });
            break;
            case 'brother':
                let vibecheckembed = new Discord.MessageEmbed()
                .setTitle('Are you a brother?')
                .setDescription('If you are a r/rgbroachgang member, you can get acces to a secret rgbroachgang channel! I need to vibe check your reddit and Discord account first. You need to link a reddit account to your Discord account, and then [click here](https://obamium-subreddit.herokuapp.com/) to start the vibe check.');
                message.channel.send(vibecheckembed);
            break;
            case 'truefan':
                if (checkMod()) return;
                let target = message.mentions.members.first();
                let roleid = '718862546395988078';
                let role = message.guild.roles.cache.get(roleid);
                let cid = '718908301555007518';
                let channel = message.guild.channels.cache.get(cid);
                if (!role) return message.channel.send('Error: Could not find role');
                if (!channel) return message.channel.send('Error: Could not find channel');
                if (!target) return message.channel.send('You need to @mention someone for this to work!');
                if (target.user.bot) return message.channel.send('You can\'t do this with bots.');
                if (!target.roles.cache.has(roleid)) {
                    // Give the role
                    target.roles.add(role);
                    channel.send(`${target.user} is now able to access this channel.`);
                    let msg = new Discord.MessageEmbed()
                    .setTitle('Congratulations!')
                    .setDescription(`The r/Obamium Discord Staff has decided to give you access to a secret text channel: <#${cid}>`)
                    .setThumbnail('https://discordemoji.com/assets/emoji/ClapClap.gif');
                    target.send(msg);
                    message.channel.send(`${target.user.username} is now a true obama fan.`);
                } else {
                    // Take the role
                    target.roles.remove(role);
                    channel.send(`${target.user} is no longer able to access this channel.`);
                    message.channel.send(`${target.user.username} is no longer a true obama fan.`);
                }

            break;
            case 'toggleeval':
                if (message.author.id != '284323826165350400') return console.log('Toggle Eval attemped by unauthorized user: ' + message.author.id);
                if (allowEval == true) allowEval = false; else allowEval = true;
                message.channel.send('Toggled ' + (allowEval ? 'on' : 'off'));
            break;
            case 'eval':
                if (message.author.id != '284323826165350400') return console.log('Eval attemped by unauthorized user: ' + message.author.id);
                if (!allowEval) return message.channel.send('Eval is disabled.');
                message.suppressEmbeds(true);
                var res = eval(args.join(' '));
                if (typeof res == 'object') res = JSON.stringify(res);
                else if (typeof res == 'function') res = '`(Function)`';
                else if (typeof res == 'undefined') res = '`undefined`';
                if (res == "{}") return;
                message.channel.send(res);
            break;
            case 'copypasta':
                if (checkPremium()) return;
                if (!args[0]) args[0] = '';
                switch(args[0].toLowerCase()) {
                    case 'toddler':
                        message.channel.send('**AITA For Dropkicking an Toddler off a cliff because he used my Dead Name**', {tts: true});
                        message.channel.send('The title speaks for itself. So me (20F transitioning) was going on a hike with my cousin and his parents.', {tts: true});
                        message.channel.send('There’s this really large cliff that looms over my house. I recently told my family I was trans.', {tts: true});
                        message.channel.send('I thought my toddler cousin had realize me new name is Jenny. Instead he said Max.', {tts: true});
                        message.channel.send('I instantly flew into a mentally unstable rage and my eyes turned red. I began to drool and have a mini-seizure.', {tts: true});
                        message.channel.send('I ran toward my cousin at the speed of light. I picked him up by the back of his shirt.', {tts: true});
                        message.channel.send('His parents ran toward him but with my tranny-powers I managed to use my telekineses and freeze them in mid-air.', {tts: true});
                        message.channel.send('I threw my toddler cousin up in the air and using my tranny in the 40% powers kicked him at the speed of light.', {tts: true});
                        message.channel.send('He went fucking flying and I heard his little screams which made my gaping hole which used to be my dick until I forcefully castrated myself began to drip with precum.', {tts: true});
                        message.channel.send('I saw him fall to the ground and splatter by then I was so horny I came all over the place.', {tts: true});
                    break;
                    case 'cum':
                        message.channel.send('**Infinite cum.**', {tts: true});
                        message.channel.send('You sit on the toilet to jack off, but you begin to cum uncontrollably.', {tts: true});
                        message.channel.send('After ten spurts you start to worry. Your hand is sticky and it reeks of semen.', {tts: true});
                        message.channel.send('You desperately shove your dick into a wad of toilet paper, but that only makes your balls hurt.', {tts: true});
                        message.channel.send('The cum accelerates. It’s been three minutes. You can’t stop cumming.', {tts: true});
                        message.channel.send('Your bathroom floor is covered in a thin layer of baby fluid. You try to cum into the shower drain but it builds up too fast.', {tts: true});
                        message.channel.send('You try the toilet. The cum is too thick to be flushed. You lock the bathroom door to prevent the cum from escaping.', {tts: true});
                        message.channel.send('The air grows hot and humid from the cum. The cum accelerates. You slip and fall in your own sperm.', {tts: true});
                        message.channel.send('The cum is now six inches deep, almost as long as your still-erect semen hose. Sprawled on your back, you begin to cum all over the ceiling.', {tts: true});
                        message.channel.send('Globs of the sticky white fluid begin to fall like raindrops, giving you a facial with your own cum. The cum accelerates.', {tts: true});
                        message.channel.send('You struggle to stand as the force of the cum begins to propel you backwards as if you were on a bukkake themed slip-and-slide.', {tts: true});
                        message.channel.send('Still on your knees, the cum is now at chin height. To avoid drowning you open the bathroom door.', {tts: true});
                        message.channel.send('The deluge of man juice reminds you of the Great Molasses Flood of 1919, only with cum instead of molasses.', {tts: true});
                        message.channel.send('The cum accelerates. It’s been two hours. Your children and wife scream in terror as their bodies are engulfed by the snow-white sludge.', {tts: true});
                        message.channel.send('Your youngest child goes under, with viscous bubbles and muffled cries rising from the goop. You plead to God to end your suffering. The cum accelerates.', {tts: true});
                        message.channel.send('You squeeze your dick to stop the cum, but it begins to leak out of your asshole instead. You let go.', {tts: true});
                        message.channel.send('The force of the cum tears your urethra open, leaving only a gaping hole in your crotch that spews semen.', {tts: true});
                        message.channel.send('Your body picks up speed as it slides backwards along the cum. You smash through the wall, hurtling into the sky at thirty miles an hour.', {tts: true});
                        message.channel.send('From a bird’s eye view you see your house is completely white. Your neighbor calls the cops. The cum accelerates.', {tts: true});
                        message.channel.send('As you continue to ascend, you spot police cars racing towards your house.', {tts: true});
                        message.channel.send('The cops pull out their guns and take aim, but stray loads of cum hit them in the eyes, blinding them. The cum accelerates.', {tts: true});
                        message.channel.send('You are now at an altitude of 1000 feet. The SWAT team arrives. Military helicopters circle you. Hundreds of bullets pierce your body at once, yet you stay conscious.', {tts: true});
                        message.channel.send('Your testicles have now grown into a substitute brain. The cum accelerates. It has been two days. With your body now destroyed, the cum begins to spray in all directions.', {tts: true});
                        message.channel.send('You break the sound barrier. The government deploys fighter jets to chase you down, but the impact of your cum sends one plane crashing to the ground.', {tts: true});
                        message.channel.send('The government decides to let you leave the earth. You feel your gonads start to burn up as you reach the edges of the atmosphere.', {tts: true});
                        message.channel.send('You narrowly miss the ISS, giving it a new white paint job as you fly past. Physicists struggle to calculate your erratic trajectory.', {tts: true});
                        message.channel.send('The cum accelerates. The cum begins to gravitate towards itself, forming a comet trail of semen. Astronomers begin calling you the “Cummet.”', {tts: true});
                        message.channel.send('You are stuck in space forever, stripped of your body and senses, forced to endure an eternity of cumshots. Eventually, you stop thinking.', {tts: true});
                    break;
                    case 'navyseal':
                    case 'navy':
                        message.channel.send('What the fuck did you just fucking say about me, you little bitch?', {tts: true});
                        message.channel.send('I’ll have you know I graduated top of my class in the Navy Seals, and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills.', {tts: true});
                        message.channel.send('I am trained in gorilla warfare and I’m the top sniper in the entire US armed forces. You are nothing to me but just another target.', {tts: true});
                        message.channel.send('I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words.', {tts: true});
                        message.channel.send('You think you can get away with saying that shit to me over the Internet? Think again, fucker.', {tts: true});
                        message.channel.send('As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot.', {tts: true});
                        message.channel.send('The storm that wipes out the pathetic little thing you call your life.', {tts: true});
                        message.channel.send('You’re fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that’s just with my bare hands.', {tts: true});
                        message.channel.send('Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps', {tts: true});
                        message.channel.send('and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit.', {tts: true});
                        message.channel.send('If only you could have known what unholy retribution your little “clever” comment was about to bring down upon you, maybe you would have held your fucking tongue.', {tts: true});
                        message.channel.send('But you couldn’t, you didn’t, and now you’re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You’re fucking dead, kiddo.', {tts: true});
                    break;
                    case 'Ben-Shapiro':
                        message.channel.send('You know, let\'s just say, hypothetically speaking, that I were to have sex with your mom.', {tts: true});
                        message.channel.send('Now, hypothetically speaking, if this did happen, I mean, you must remember that all physical matter has a very thin layer of atoms surrounding it, so technically, you are never truly', {tts: true});
                        message.channel.send('touching anything or anyone, but instead, the atoms surrounding your body and this object or person are coming into contact with one another.', {tts: true});
                        message.channel.send('So, once again, hypothetically speaking, if I were to attempt to have sex with your mom, I would fail miserably, because, according to science, our bodies would never come into contact', {tts: true});   
                        message.channel.send(' with one another.', {tts: true}); 
                    break;
                    case 'a':
                    case 'aa':
                    case 'aaa':
                    case 'aaaa':
                    case 'aaaaa':
                    case 'aaaaaa':
                    case 'aaaaaaa':
                    case 'aaaaaaaa':
                    case 'aaaaaaaaa':
                    case 'aaaaaaaaaa':
                    case 'aaaaaaaaaaa':
                    case 'aaaaaaaaaaaa':
                    case 'aaaaaaaaaaaaa':
                    case 'aaaaaaaaaaaaaa':
                    case 'aaaaaaaaaaaaaaa':
                    case 'aaaaaaaaaaaaaaaa':
                    // i want to die
                        const oldName = message.guild.members.cache.get(client.user.id).nickname;
                        message.guild.members.cache.get(client.user.id).setNickname('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA').then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true}).then(() => {
                            message.channel.send('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {tts: true})
                            .then(() => message.guild.members.cache.get(client.user.id).setNickname(oldName));
                            })})})})})})})})})})})})})})})})})})})})})})})})})})})})});
                        });
                    break;
                    default:
                        message.channel.send('cum', {tts: true}).then(m => m.edit('Choose a copypasta:\n- toddler (10 lines, 1:15 minutes)\n- cum (28 lines, 4:10 minutes)\n- navyseal (12 lines, 1:45 minutes)\n- aaaaaaaaaa (30 lines, *forever*)\n- Ben-Shapiro (5 lines, 50.59 seconds)'));
                    break;
                }
            break;
            case 'karma':
            case 'coins':
            case 'coin':
            case 'gold':
                const karmaID = '733339045463064607';
                const coinsID = '733339908273602662';

                const karmaEmote = message.guild.emojis.cache.get(karmaID).toString();
                const coinsEmote = message.guild.emojis.cache.get(coinsID).toString();

                let targetID = message.mentions.members.first() || message.author;
                targetID = targetID.id;

                let karmaembed = new Discord.MessageEmbed()
                .setTitle(message.mentions.members.first() ? 'Balance of ' + message.mentions.members.first().user.username : 'Your balance')
                .setDescription(`${karmaEmote} Karma: \`${karma.get(targetID) || '0'}\`\n${coinsEmote} Coins: \`${coins.get(targetID) || '0'}\``);
                
                let kCount = karma.get(targetID);
                if (kCount) {
                    if (kCount > 0) karmaembed.setColor('f36916');
                    if (kCount < 0) karmaembed.setColor('9494ff');
                }

                message.channel.send(karmaembed);
            break;
            case 'top':
                const karmaID1 = '733339045463064607';
                const karmaEmote1 = message.guild.emojis.cache.get(karmaID1).toString();
                let karmaboard = [];
                karma.keyArray().forEach(uid => {
                    karmaboard.push({id: uid, karma: karma.get(uid)});
                });

                karmaboard.sort((a, b) => a.karma - b.karma);
                karmaboard.reverse();
                
                let karmaboardembed = new Discord.MessageEmbed()
                .setTitle('Karma Leaderboard')
                .setDescription(karmaEmote1 + ' Karma leaderboard - Top 12 for ' + message.guild.name);

                for (let x=0; x < 12; x += 1) {
                    if (!karmaboard[x]) break;
                    let u = message.guild.members.cache.get(karmaboard[x].id);
                    if (!u) karmaboardembed.addField(`${x+1}. [Unknown user]`,  `${karmaEmote1} ${karmaboard[x].karma} Karma`, true); else karmaboardembed.addField(`${x+1}. ${u.user.username}#${u.user.discriminator} ${u.user.bot ? '(Bot)' : ''}`, `${karmaEmote1} ${karmaboard[x].karma} Karma`, true);
                }

                message.channel.send(karmaboardembed);
            break;
            case 'managecoins':
            case 'setcoins':
            case 'usercoins':
                if (checkMod()) return;
                let member = message.mentions.members.first();
                if (!member) return message.channel.send('You need to @mention a member!')

                if (!coins.get(member.id)) coins.set(member.id, 0);

                let pass = false;
                let amount = 0;
                if (args[1] == 'set') {
                    if (isNaN(args[2])) return message.channel.send('You gotta put in a number!');
                    pass = true;
                    amount = args[2];
                }
                else if (args[1] == 'give' ||args[1] == 'add') {
                    if (isNaN(args[2])) return message.channel.send('You gotta put in a number!');
                    pass = true;
                    amount = coins.get(member.id) + Number(args[2]);
                }
                else if (isNaN(args[1])) return message.channel.send('You gotta put in a number!');
                else {
                    pass = true;
                    amount = coins.get(member.id) + Number(args[1]);
                }

                if (!pass) return;

                let old = coins.get(member.id);

                let coinsSetEmbed = new Discord.MessageEmbed()
                .setTitle('Coins updated for '+ member.user.username)
                .setDescription(`Coins set to ${amount} (Old amount: ${old})`)
                .setColor('ddbd37');
                message.channel.send(coinsSetEmbed)
                .then(() => {
                    coins.set(member.id, amount);
                });
            break;
        }
    } catch (e) {
        message.channel.send(new Discord.MessageEmbed()
        .setTitle('An error has occurred.')
        .setDescription(`\`\`\`js\n${e}\`\`\``)
        .setColor('ff0000'));
        console.error(e);
    }
});

function addToDatabase(id) {
    if (!id) return;
    if (typeof karma.get(id) != 'number') karma.set(id, 0);
    if (typeof coins.get(id) != 'number') coins.set(id, 0);
    return;
}
