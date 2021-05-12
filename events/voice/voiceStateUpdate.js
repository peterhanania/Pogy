const Event = require('../../structures/Event');
const Logging = require('../../database/schemas/logging');
const discord = require("discord.js");
const Maintenance = require('../../database/schemas/maintenance')
const cooldown = new Set();

module.exports = class extends Event {

async run(oldState, newState) {

if(!oldState || !newState) return;



const logging = await Logging.findOne({ guildId: oldState.guild.id })


const maintenance = await Maintenance.findOne({
  maintenance: "maintenance"
})


if(maintenance && maintenance.toggle == "true") return;

if(cooldown.has(newState.guild.id)) return;

if(logging){
  if(logging.server_events.toggle == "true"){


const channelEmbed = await oldState.guild.channels.cache.get(logging.server_events.channel)

if(channelEmbed){

let colorGreen = logging.server_events.color;
if(colorGreen === "#000000") colorGreen = 'GREEN';

let colorRed = logging.server_events.color;
if(colorRed === "#000000") colorRed = 'RED';

let colorYellow = logging.server_events.color;
if(colorYellow === "#000000") colorYellow = 'YELLOW';


        let oldChannelName;
        let newChannelName;
        let embed;

  
        let oldparentname = "unknown"
        let oldchannelname = "unknown"
        let oldchanelid = "unknown"
        if (oldState && oldState.channel && oldState.channel.parent && oldState.channel.parent.name) oldparentname = oldState.channel.parent.name
        if (oldState && oldState.channel && oldState.channel.name) oldchannelname = oldState.channel.name
        if (oldState && oldState.channelID) oldchanelid = oldState.channelID

        let newparentname = "unknown"
        let newchannelname = "unknown"
        let newchanelid = "unknown"
        if (newState && newState.channel && newState.channel.parent && newState.channel.parent.name) newparentname = newState.channel.parent.name
        if (newState && newState.channel && newState.channel.name) newchannelname = newState.channel.name
        if (newState && newState.channelID) newchanelid = newState.channelID

        if (oldState.channelID && oldState.channel) {
            if (typeof oldState.channel.parent !== "undefined") {

                oldChannelName = `**Category:** ${oldparentname}\n\t**Name:** ${oldchannelname}\n**ID: **${oldchanelid}`

            } else {
                oldChannelName = `-\n\t**Name:** ${oldparentname}\n**ID:** ${oldchanelid}`
            }
        } else {
           oldChannelName = `[Stage Channel]`
        }
        if (newState.channelID && newState.channel) {
            if (typeof newState.channel.parent !== "undefined") {

                newChannelName = `**Category:** ${newparentname}\n\t**Name:** ${newchannelname}\n**ID:** ${newchanelid}`

            } else {
                newChannelName = `-\n\t**Name:** ${newchannelname}**\n**ID:** ${newchanelid}`
            }
             } else {
          newChannelName = `[Stage Channel]`
        }
        
        // JOINED V12
        if (!oldState.channelID && newState.channelID) {
            const joinembed = new discord.MessageEmbed()
            .setAuthor(`${newState.member.user.tag} | Voice Channel Joined!`, newState.member.user.displayAvatarURL())
            .addField('member', newState.member, true)
            .addField('Channel', newChannelName, true)
            .setColor(colorGreen)
           .setTimestamp()
           .setFooter(`ID: ${newState.member.user.id}`)

           if(logging.server_events.voice.join == "true"){

                 if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(newState.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
              channelEmbed.send(joinembed).catch(()=>{})
              cooldown.add(newState.guild.id);
              setTimeout(()=>{
              cooldown.delete(newState.guild.id)
              }, 3000)
      }
          
           }


               
        }


        // LEFT V12
        if (oldState.channelID && !newState.channelID) {
            const leaveembed = new discord.MessageEmbed()
            .setAuthor(`${newState.member.user.tag} | Voice Channel Left!`, newState.member.user.displayAvatarURL())
            .addField('member', newState.member, true)
            .addField('Channel', oldChannelName, true)
            .setColor(colorRed)
           .setTimestamp()
           .setFooter(`ID: ${newState.member.user.id}`)

                   if(logging.server_events.voice.leave== "true"){

                                   if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(newState.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
             channelEmbed.send(leaveembed).catch(()=>{});
                           cooldown.add(newState.guild.id);
              setTimeout(()=>{
              cooldown.delete(newState.guild.id)
              }, 3000)
      }
           }
}


        // SWITCH V12
        if (oldState.channelID && newState.channelID) {
            // False positive check
            if (oldState.channelID !== newState.channelID) {
              

 const moveembed = new discord.MessageEmbed()
            .setAuthor(`${newState.member.user.tag} | Moved Voice Channels`, newState.member.user.displayAvatarURL())
            .addField('Left', oldChannelName, true)
            .addField('Joined',  newChannelName, true)
            .setColor(colorYellow)
           .setTimestamp()
           .setFooter(`ID: ${newState.member.user.id}`)
                   if(logging.server_events.voice.move == "true"){

                                   if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(newState.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){

             channelEmbed.send(moveembed).catch(()=>{});
                           cooldown.add(newState.guild.id);
              setTimeout(()=>{
              cooldown.delete(newState.guild.id)
              }, 3000)

      }
           }
        }
        }


     }
  }
}
  }
};