const Event = require('../../structures/Event');
const logger = require('../../utils/logger');
const Guild = require('../../database/schemas/Guild');
const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');
const discord = require("discord.js");
const moment = require('moment');
const LeaveDB = require('../../database/schemas/leave');
const StickyDB = require('../../database/schemas/stickyRole');
const Logging = require('../../database/schemas/logging');
const Maintenance = require('../../database/schemas/maintenance')
module.exports = class extends Event {
  async run(member) {
    const logging = await Logging.findOne({ guildId: member.guild.id });


const maintenance = await Maintenance.findOne({
  maintenance: "maintenance"
})

if(maintenance && maintenance.toggle == "true") return;

if(logging){
  if(logging.server_events.toggle == "true"){


const channelEmbed = await member.guild.channels.cache.get(logging.server_events.channel)

if(channelEmbed){

let color = logging.server_events.color;
if(color == "#000000") color = member.client.color.red;


  if(logging.server_events.member_join == "true"){



    const embed = new discord.MessageEmbed()
      .setTitle(':outbox_tray: Member Left')
      .setAuthor(`${member.guild.name}`, member.guild.iconURL({ dynamic: true }))
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`${member} (**${member.user.tag}**)`)
      .addField('Account created on', moment(member.user.createdAt).format('dddd, MMMM Do YYYY'))
      .setTimestamp()
      .setColor(member.guild.me.displayHexColor);
    channelEmbed.send(embed).catch(()=>{})


  

  }
  }
 }

}


    let guildDB = await Guild.findOne({
      guildId: member.guild.id
    });
  
  if(guildDB){
  guildDB.leaves.forEach(async(leave)=>{


    let xx = leave - Date.now();
    let createdd = Math.floor(xx / 86400000);
    
    

    if(6 <= createdd) {
    removeA(guildDB.leaves, leave)
    await guildDB.save().catch(()=>{})

    }
  });

  guildDB.leaves.push(Date.now())
  await guildDB.save().catch(()=>{})
  };
  
   let leave = await LeaveDB.findOne({
      guildId: member.guild.id
    })

    if (!leave) {
         
    const newSettings = new LeaveDB({
            guildId: member.guild.id
          });
          await newSettings.save().catch(()=>{});
          leave = await LeaveDB.findOne({ guildId: member.guild.id });
      
        }

   if(leave.leaveToggle  == "true") {

     if(leave.leaveDM == "true"){

let text = leave.leaveMessage.replace(/{user}/g, `${member}`)
        .replace(/{user_tag}/g, `${member.user.tag}`)
        .replace(/{user_name}/g, `${member.user.username}`)
        .replace(/{user_ID}/g, `${member.id}`)
        .replace(/{guild_name}/g, `${member.guild.name}`)
        .replace(/{guild_ID}/g, `${member.guild.id}`)
        .replace(/{memberCount}/g, `${member.guild.memberCount}`)
        .replace(/{size}/g, `${member.guild.memberCount}`)
        .replace(/{guild}/g, `${member.guild.name}`)
        .replace(/{member_createdAtAgo}/g, `${moment(member.user.createdTimestamp).fromNow()}`)
        .replace(/{member_createdAt}/g, `${moment(member.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`)
        
        if(leave.leaveEmbed == "false") {
        member.send(`${text}`).catch(() => {})
        }
        if(leave.leaveEmbed == "true") {
          let embed = new discord.MessageEmbed()
          
          let color = leave.embed.color
          if(color) embed.setColor(color)
          
          let title = leave.embed.title
          if(title !== null) embed.setTitle(title)
          
          let titleUrl = leave.embed.titleURL
          if(titleUrl !== null) embed.setURL(titleUrl)
          
          let textEmbed = leave.embed.description.replace(/{user}/g, `${member}`)
        .replace(/{user_tag}/g, `${member.user.tag}`)
        .replace(/{user_name}/g, `${member.user.username}`)
        .replace(/{user_ID}/g, `${member.id}`)
        .replace(/{guild_name}/g, `${member.guild.name}`)
        .replace(/{guild_ID}/g, `${member.guild.id}`)
        .replace(/{memberCount}/g, `${member.guild.memberCount}`)
        .replace(/{size}/g, `${member.guild.memberCount}`)
        .replace(/{guild}/g, `${member.guild.name}`)
        .replace(/{member_createdAtAgo}/g, `${moment(member.user.createdTimestamp).fromNow()}`)
        .replace(/{member_createdAt}/g, `${moment(member.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`)

          if(textEmbed !== null) embed.setDescription(textEmbed)
          
          let authorName = leave.embed.author.name.replace(/{user_tag}/g, `${member.user.tag}`)
        .replace(/{user_name}/g, `${member.user.username}`)
        .replace(/{user_ID}/g, `${member.id}`)
        .replace(/{guild_name}/g, `${member.guild.name}`)
        .replace(/{guild_ID}/g, `${member.guild.id}`)
        .replace(/{memberCount}/g, `${member.guild.memberCount}`)
        .replace(/{size}/g, `${member.guild.memberCount}`)
        .replace(/{guild}/g, `${member.guild.name}`)
        
          if(authorName !== null) embed.setAuthor(authorName)
          
          let authorIcon = leave.embed.author.icon
          if(authorIcon !== null) embed.setAuthor(authorName, authorIcon)

          let authorUrl = leave.embed.author.url
          if(authorUrl !== null) embed.setAuthor(authorName, authorIcon, authorUrl)


          let footer = leave.embed.footer
          if(footer !== null) embed.setFooter(footer)
          
          let footerIcon = leave.embed.footerIcon
          if(footer && footerIcon !== null) embed.setFooter(footer, footerIcon)

          let timestamp = leave.embed.timestamp
          if(timestamp == "true") embed.setTimestamp()
          
          
          let thumbnail = leave.embed.thumbnail
          if(thumbnail === "{userAvatar}") thumbnail = member.user.displayAvatarURL({ dynamic: true, size: 512 })
          if(thumbnail !== null) embed.setThumbnail(thumbnail)
          
          member.send(embed).catch(()=>{})
        }

      
    };
    if(leave.leaveDM == "false"){
    if (leave.leaveChannel) {
      const greetChannel = member.guild.channels.cache.get(leave.leaveChannel)
      if (greetChannel) {

        let text = leave.leaveMessage.replace(/{user}/g, `${member}`)
        .replace(/{user_tag}/g, `${member.user.tag}`)
        .replace(/{user_name}/g, `${member.user.username}`)
        .replace(/{user_ID}/g, `${member.id}`)
        .replace(/{guild_name}/g, `${member.guild.name}`)
        .replace(/{guild_ID}/g, `${member.guild.id}`)
        .replace(/{memberCount}/g, `${member.guild.memberCount}`)
        .replace(/{size}/g, `${member.guild.memberCount}`)
        .replace(/{guild}/g, `${member.guild.name}`)
        .replace(/{member_createdAtAgo}/g, `${moment(member.user.createdTimestamp).fromNow()}`)
        .replace(/{member_createdAt}/g, `${moment(member.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`)
        
        if(leave.leaveEmbed == "false") {
        greetChannel.send(`${text}`).catch(() => {})
        }
        if(leave.leaveEmbed == "true") {
          let embed = new discord.MessageEmbed()
          
          let color = leave.embed.color
          if(color) embed.setColor(color)
          
          let title = leave.embed.title
          if(title !== null) embed.setTitle(title)
          
          let titleUrl = leave.embed.titleURL
          if(titleUrl !== null) embed.setURL(titleUrl)
          
          let textEmbed = leave.embed.description.replace(/{user}/g, `${member}`)
        .replace(/{user_tag}/g, `${member.user.tag}`)
        .replace(/{user_name}/g, `${member.user.username}`)
        .replace(/{user_ID}/g, `${member.id}`)
        .replace(/{guild_name}/g, `${member.guild.name}`)
        .replace(/{guild_ID}/g, `${member.guild.id}`)
        .replace(/{memberCount}/g, `${member.guild.memberCount}`)
        .replace(/{size}/g, `${member.guild.memberCount}`)
        .replace(/{guild}/g, `${member.guild.name}`)
        .replace(/{member_createdAtAgo}/g, `${moment(member.user.createdTimestamp).fromNow()}`)
        .replace(/{member_createdAt}/g, `${moment(member.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`)

          if(textEmbed !== null) embed.setDescription(textEmbed)
          
          let authorName = leave.embed.author.name.replace(/{user_tag}/g, `${member.user.tag}`)
        .replace(/{user_name}/g, `${member.user.username}`)
        .replace(/{user_ID}/g, `${member.id}`)
        .replace(/{guild_name}/g, `${member.guild.name}`)
        .replace(/{guild_ID}/g, `${member.guild.id}`)
        .replace(/{memberCount}/g, `${member.guild.memberCount}`)
        .replace(/{size}/g, `${member.guild.memberCount}`)
        .replace(/{guild}/g, `${member.guild.name}`)
        
          if(authorName !== null) embed.setAuthor(authorName)
          
          let authorIcon = leave.embed.author.icon
          if(authorIcon !== null) embed.setAuthor(authorName, authorIcon)

          let authorUrl = leave.embed.author.url
          if(authorUrl !== null) embed.setAuthor(authorName, authorIcon, authorUrl)


          let footer = leave.embed.footer
          if(footer !== null) embed.setFooter(footer)
          
          let footerIcon = leave.embed.footerIcon
          if(footer && footerIcon !== null) embed.setFooter(footer, footerIcon)

          let timestamp = leave.embed.timestamp
          if(timestamp == "true") embed.setTimestamp()
          
          
          let thumbnail = leave.embed.thumbnail
          if(thumbnail === "{userAvatar}") thumbnail = member.user.displayAvatarURL({ dynamic: true, size: 512 })
          if(thumbnail !== null) embed.setThumbnail(thumbnail)
          
          greetChannel.send(embed).catch(()=>{})
        }
      }
    }
    }
}
    
    if(guildDB && guildDB.autoroleToggle && guildDB.autoroleToggle === true) {
      if(guildDB.autoroleID) {
        let role = member.guild.roles.cache.get(guildDB.autoroleID)
        if(role) {
          member.roles.add(role).catch(() => {})
        }
      }
    }






     let sticky = await StickyDB.findOne({
      guildId: member.guild.id
    })

    if (!sticky) {
         
    const newSettingss = new StickyDB({
            guildId: member.guild.id
          });
          await newSettingss.save().catch(()=>{});
          sticky = await StickyDB.findOne({ guildId: member.guild.id });
      
        }


    if(sticky){

let stickyRoleID = sticky.stickyroleID;
let stickyRole = member.guild.roles.cache.get(stickyRoleID);
if(sticky.stickyroleToggle == "true"){
if(stickyRole){


if(member.roles.cache.find(r => r.name.toLowerCase() === stickyRole.name)){


sticky.stickyroleUser.push(member.id)
await sticky.save().catch(()=>{})



} 


}
}
    }



  }
};
function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}