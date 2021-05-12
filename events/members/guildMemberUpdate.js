const Event = require('../../structures/Event');
const logger = require('../../utils/logger');
const Nickname = require('../../database/schemas/nicknames');
const discord = require("discord.js");
const moment = require('moment');
const Logging = require('../../database/schemas/logging');
const Maintenance = require('../../database/schemas/maintenance')
const cooldown = new Set();

module.exports = class extends Event {
  async run(oldMember, newMember) {

const logging = await Logging.findOne({ guildId: oldMember.guild.id });


const maintenance = await Maintenance.findOne({
  maintenance: "maintenance"
})

if(maintenance && maintenance.toggle == "true") return;

if(logging){
  if(logging.member_events.toggle == "true"){


const channelEmbed = await oldMember.guild.channels.cache.get(logging.member_events.channel)

if(channelEmbed){

  if(logging.member_events.role_update == "true"){

let colorGreen = logging.member_events.color;
if(colorGreen == "#000000") colorGreen =  oldMember.client.color.green;
let colorRed = logging.member_events.color;
if(colorRed == "#000000") colorRed =  oldMember.client.color.red;
const role = oldMember.roles.cache.difference(newMember.roles.cache).first();

  if (oldMember.roles.cache.size < newMember.roles.cache.size) {
    const roleAddembed = new discord.MessageEmbed()
    .setAuthor(`${newMember.user.tag} | Role add`, newMember.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(colorGreen)
        .setFooter(`ID: ${newMember.id}`)
    .setDescription(`**Added Roles**\n Role: ${role}\n User: ${newMember}\n\n ${newMember} Was given the **${role.name}** Role.`);
 
       
    if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(newMember.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
              channelEmbed.send(roleAddembed).catch(()=>{});
                            cooldown.add(newMember.guild.id)
              setTimeout(()=>{
              cooldown.delete(newMember.guild.id)
              }, 3000)
      }



    }
 

if (oldMember.roles.cache.size > newMember.roles.cache.size) {

  const roleRemoveembed = new discord.MessageEmbed()
    .setAuthor(`${newMember.user.tag} | Role Remove`, newMember.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(colorRed)
        .setFooter(`ID: ${newMember.id}`)
    .setDescription(`**Removed Roles**\n Role: ${role}\n User: ${newMember}\n\n The **${role.name}** role was removed from ${newMember}`);
    
    
       if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(newMember.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
              channelEmbed.send(roleRemoveembed).catch(()=>{});
                            cooldown.add(newMember.guild.id)
              setTimeout(()=>{
              cooldown.delete(newMember.guild.id)
              }, 3000)
      }

}


 }
   if(logging.member_events.name_change == "true"){

       if (oldMember.nickname != newMember.nickname) {
let colorYellow = logging.member_events.color;
if(colorYellow == "#000000")  colorYellow =  oldMember.client.color.yellow;


const oldNickname = oldMember.nickname || '`None`';
const newNickname = newMember.nickname || '`None`';

const nicknameEmbed = new discord.MessageEmbed()
    .setAuthor(`${newMember.user.tag} | Nickname Update`, newMember.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter(`ID: ${newMember.id}`)
    .setColor(colorYellow)
    .setDescription(`**Nickname Update**\n ${newMember}'s **nickname** was changed.`)
    .addField('Nickname', `${oldNickname} --> ${newNickname}`);

    if(channelEmbed &&
      channelEmbed.viewable &&
      channelEmbed.permissionsFor(newMember.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
              channelEmbed.send(nicknameEmbed).catch(()=>{});
              cooldown.add(newMember.guild.id)
              setTimeout(()=>{
              cooldown.delete(newMember.guild.id)
              }, 3000)
      }

       }
   }



  }
  }
 }








  //last 5 nicknames
  if (oldMember.nickname != newMember.nickname) {

if(newMember.nickname == null || newMember.nickname == newMember.user.username) {

} else {

const user = await Nickname.findOne({
discordId: newMember.id,
guildId: oldMember.guild.id
})
 

if(!user){ 

      const newUser = new Nickname({
              discordId: newMember.id,
              guildId: oldMember.guild.id
            })
            newUser.nicknames.push(newMember.nickname)
            newUser.save()
            

} else {

  if(user.nicknames.length > 4){
  
  user.nicknames.splice(-5,1);
  user.nicknames.push(newMember.nickname)

  } else {

  user.nicknames.push(newMember.nickname)

  }

  user.save().catch(()=>{})

} 

  }
  }



  }
};