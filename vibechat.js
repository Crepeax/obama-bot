const Discord = require('discord.js');
const client = require('./index').client;

const TCID = '737698514209079377';
const VCID = '700734003174703265';

const TC = client.channels.cache.get(TCID);
const VC = client.channels.cache.get(VCID);

client.on('voiceStateUpdate', (oldMember, newMember) => {
   if (oldMember.channelID == newMember.channelID) return;
   if (newMember.member.hasPermission('ADMINISTRATOR')) return;
   if (newMember.channelID == VCID) {
        TC.createOverwrite(newMember.member, {
                VIEW_CHANNEL: true
            }
        , 'Does anyone even read this?');
    } else if (newMember.channelID != VCID && oldMember.channelID == VCID) {
        TC.permissionOverwrites.get(oldMember.id).delete('Does anyone even read this?').catch();
    }
});