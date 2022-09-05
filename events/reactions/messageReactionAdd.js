const Event = require('../../structures/Event');////("discord.js")
const { MessageReaction, User, MessageEmbed } = require("discord.js");
const Db = require("../../packages/reactionrole/models/schema.js")
const reactionTicket = require("../../models/tickets.js")
const reactionCooldown = new Set();
const optionAdd =  new Set();
const discord = require("discord.js");
const Discord = require("discord.js");
const moment = require('moment')
const send = require(`../../packages/logs/index.js`)
const GuildDB = require('../../database/schemas/Guild');
const Maintenance = require('../../database/schemas/maintenance');
const ticketCooldownLol = new Set();
const botCooldown = new Set();

/**
 *
 * @param {MessageReaction} reaction
 * @param {User} user
 */

module.exports = class extends Event {
	async run(messageReaction, user) {
	  
  if (this.client.user === user) return;

const { message, emoji } = messageReaction;


const maintenance = await Maintenance.findOne({
  maintenance: "maintenance"
})

if(maintenance && maintenance.toggle == "true") return;

const member = message.guild.members.cache.get(user.id);


const guildDB = await GuildDB.findOne({
  guildId: message.guild.id
})

let prefix = guildDB.prefix
await Db.findOne({
        guildid: message.guild.id,
        reaction: emoji.toString(),
        msgid: message.id,
      },

   async (err, db) => {

  if(!db) return;


  if(message.id != db.msgid) return; 

  const rrRole = message.guild.roles.cache.get(db.roleid);

  if (!rrRole) return;

if(botCooldown.has(message.guild.id)) return;

let guild = this.client.guilds.cache.get(db.guildid); 
let guildName = guild.name;

let slowDownEmbed = new MessageEmbed()
.setDescription(`${message.client.emoji.fail} Slow Down There, You're on a cooldown\n\n**Role Name:** ${rrRole.name}\n**Guild Name:** ${guildName}`)
.setColor(message.client.color.red)

let addEmbed = new MessageEmbed()
.setAuthor('Role Added', `${message.client.domain}/logo.png` , `${message.url}` )
.setDescription(`You have recieved the **${rrRole.name}** Role by reacting in ${guildName}`)
.setFooter({text: 'https://pogy.xyz/'})
.setColor(message.client.color.green)

let remEmbed = new MessageEmbed()
.setAuthor('Role Removed', `${message.client.domain}/logo.png` , `${message.url}` )
.setDescription(`You have removed the **${rrRole.name}** Role by reacting in ${guildName}`)
.setFooter({text: 'https://pogy.xyz/'})
.setColor(message.client.color.green)

let errorReaction = new MessageEmbed()
.setAuthor('Reaction Role Error', `${message.client.domain}/logo.png` , `${message.url}` )
.setDescription(`${message.client.emoji.fail} Failed to Add the role, since I'm Missing the Manage Roles Permission.\n\nPlease let an admin Know.`)
.setFooter({text: 'https://pogy.xyz/'})
.setColor(message.client.color.green)

if(reactionCooldown.has(user.id)) {
                if(message.channel &&
      message.channel.viewable &&
      message.channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])){
       
      
 user.send(slowDownEmbed).catch(()=>{});
 botCooldown.add(message.guild.id)
 setTimeout(()=>{
 botCooldown.delete(message.guild.id)
 }, 4000)
      }

}

if(db.option === 1) {
      try {
       if(!member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())){

  

        await member.roles.add(rrRole).catch(()=>{})
        if(guildDB.reactionDM === true){
        member.send(addEmbed).catch(()=>{})
        }
        reactionCooldown.add(user.id);
        setTimeout(()=>{
        reactionCooldown.delete(user.id)
        }, 2000);
      }
      } catch (err) {
console.log(err)
        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
       botCooldown.add(message.guild.id)
 setTimeout(()=>{
 botCooldown.delete(message.guild.id)
 }, 6000)
        return member.send(errorReaction).catch(()=>{})
    }
  }

if(db.option === 2) {
  try {
      if (!member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())) {
      await member.roles.add(rrRole).catch(()=>{})
        if(guildDB.reactionDM === true){
        member.send(addEmbed).catch(()=>{})
        }
      reactionCooldown.add(user.id);
      setTimeout(() => {
        reactionCooldown.delete(user.id)
      }, 2000);
      }
  } catch (err) {
    if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
 botCooldown.add(message.guild.id)
 setTimeout(()=>{
 botCooldown.delete(message.guild.id)
 }, 6000)
    return member.send(errorReaction).catch(()=>{})
   }
  }
  
  if(db.option === 3) {
    try {
      if (member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())){
      await member.roles.remove(rrRole).catch(()=>{})
        if(guildDB.reactionDM === true){
        member.send(remEmbed).catch(()=>{})
        }
      reactionCooldown.add(user.id);
      setTimeout(() => {
        reactionCooldown.delete(user.id)
      }, 2000);
     }
    } catch (err) {
    if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
 botCooldown.add(message.guild.id)
 setTimeout(()=>{
 botCooldown.delete(message.guild.id)
 }, 6000)
    return member.send(errorReaction).catch(()=>{})
    }
  }
  
  if(db.option === 4) {
    try {
         if (member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())){
        await member.roles.remove(rrRole).catch(()=>{})
        reactionCooldown.add(user.id);
        if(guildDB.reactionDM === true){
        member.send(remEmbed).catch(()=>{})
        }
        setTimeout(()=>{
        reactionCooldown.delete(user.id)
        }, 2000);
        }
    } catch (err) {
    if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
 botCooldown.add(message.guild.id)
 setTimeout(()=>{
 botCooldown.delete(message.guild.id)
 }, 6000)
    return member.send(errorReaction).catch(()=>{})   
    }
  }
  
  if(db.option === 5) {
    try {
  if (member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())){
      await member.roles.remove(rrRole);
     message.reactions.cache.find(r => r.emoji.name == emoji.name).users.remove(user.id).catch(()=>{})
      
        if(guildDB.reactionDM === true){
        member.send(remEmbed).catch(()=>{})
        }
      reactionCooldown.add(user.id);
      setTimeout(() => {
        reactionCooldown.delete(user.id)
      }, 2000);
     }
    } catch (err) {
    if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
 botCooldown.add(message.guild.id)
 setTimeout(()=>{
 botCooldown.delete(message.guild.id)
 }, 6000)
   return member.send(errorReaction).catch(()=>{})
    }
  }


  if(db.option === 6) {
      try {



        if (member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())){
          
     message.reactions.cache.find(r => r.emoji.name == emoji.name).users.remove(user.id).catch(()=>{})
        await member.roles.remove(rrRole).catch(()=>{})
    
                reactionCooldown.add(user.id);
        setTimeout(()=>{
        reactionCooldown.delete(user.id)
        }, 5000);

        return;

        } else  if (!member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())) {

     message.reactions.cache.find(r => r.emoji.name == emoji.name).users.remove(user.id).catch(()=>{})
        await member.roles.add(rrRole).catch(()=>{})

        if(guildDB.reactionDM === true){
        member.send(addEmbed).catch(()=>{})
        }
        reactionCooldown.add(user.id);
        setTimeout(()=>{
        reactionCooldown.delete(user.id)
        }, 5000);
      }

      } catch (err) {

        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
 botCooldown.add(message.guild.id)
 setTimeout(()=>{
 botCooldown.delete(message.guild.id)
 }, 6000)
      return member.send(errorReaction).catch(()=>{})
    }
  }


    });
    
    
    //ticket stuff
    await reactionTicket.findOne({
      guildID: message.guild.id,
    }, async(err, db) => {

      
      if(!db) return;

      if(db.ticketType == "reaction"){

      if(db.messageID.includes(message.id)) {
      

      if(emoji.toString() === "🎫" || emoji.toString() === "🎟️" || emoji.toString() === "📩" ||emoji.toString() === "✅" ||emoji.toString() === "📻" ||emoji.toString() === "☑️" ||emoji.toString() === "📲" ||emoji.toString() === "📟" ||emoji.toString() === "🆕" ||emoji.toString() === "📤" ||emoji.toString() === "📨" ||emoji.toString() === "🔑"||emoji.toString() === "🏷️") {


if(guildDB.isPremium == "false"){
   if(emoji.toString() === "🎟️" ||emoji.toString() === "✅" ||emoji.toString() === "📻" ||emoji.toString() === "☑️" ||emoji.toString() === "📲" ||emoji.toString() === "📟" ||emoji.toString() === "🆕" ||emoji.toString() === "📤" ||emoji.toString() === "📨" ||emoji.toString() === "🔑"||emoji.toString() === "🏷️") return;
}
        let serverCase = db.ticketCase;
if(!serverCase || serverCase === null) serverCase = '1';

      let channelReact = message.guild.channels.cache.get(db.ticketReactChannel)
      let ticketRole = message.guild.roles.cache.get(db.supportRoleID);
      let ticketCategory = message.guild.channels.cache.get(db.categoryID)
      let ticketLog = message.guild.channels.cache.get(db.ticketModlogID)
 
     message.reactions.cache.find(r => r.emoji.name == emoji.name).users.remove(user.id).catch(()=>{})


      let id = user.id.toString().substr(0, 4) + user.discriminator;
      let chann = `ticket-${id}`;


      let array = []

        message.guild.channels.cache.forEach(channel => {
 if(channel.name == chann) array.push(channel.id)
        })
       

let ticketlimit = db.maxTicket
if(!ticketlimit) ticketlimit = 1

let arraylength = array.length


      if(arraylength > ticketlimit || arraylength == ticketlimit) {
        
        if(ticketCooldownLol.has(user.id)) return;
         if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
          if (!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) return;
        message.channel.send({embeds:[new discord.MessageEmbed().setColor(message.client.color.red).setDescription(`You already have ${arraylength} open tickets, as the current guild's ticket limit is ${ticketlimit} `).setAuthor(user.tag, user.displayAvatarURL()).setFooter({text: 'https://pogy.xyz/'})]}).then(m => m.delete({timeout: 5000}));
        ticketCooldownLol.add(user.id)
        setTimeout(()=>{
     ticketCooldownLol.delete(user.id)    
        }, 10000)
    
 return
      }


let pogy = message.guild.me;

let everyone = message.guild.roles.everyone;



        message.guild.channels.create(chann, { permissionOverwrites:[
           {
            allow:  ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS', 'MANAGE_CHANNELS'],
            id: message.guild.me
          },
	      
          {
            allow:  ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'],
            id: user
          },
          {
            allow:  ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS'],
            id: ticketRole
          },
          
		       {
            deny: [ 'VIEW_CHANNEL','SEND_MESSAGES'],
            id: message.guild.roles.everyone
          },
        ],
        parent: ticketCategory.id,
        reason: `Ticket Module`,
        topic: `**ID:** ${user.id} | **Tag:** ${user.tag}`
      }).then(async(chan)=>{

    await chan.permissionOverwrites.edit(user, { VIEW_CHANNEL: true, READ_MESSAGES: true, SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true, ATTACH_FILES: true });
    await db.updateOne({ticketCase: serverCase + 1});


       let color = db.ticketWelcomeColor
    if(color == "#000000") color = message.guild.me.displayHexColor

    if(db.ticketPing == "true"){

if(chan){
 if (!chan.permissionsFor(chan.guild.me).has('SEND_MESSAGES')) return;
  if (!chan.permissionsFor(chan.guild.me).has('EMBED_LINKS')) return;

    chan.send(`${member} ${ticketRole}`).catch(()=>{})
}
    }

      chan.send(new discord.MessageEmbed()
    .setAuthor(user.tag, user.displayAvatarURL())

    .setDescription(db.ticketWelcomeMessage
        .replace(/{user}/g, `${member}`)
        .replace(/{user_tag}/g, `${member.tag}`)
        .replace(/{user_name}/g, `${member.username}`)
        .replace(/{reason}/g, `${member.username}`)
        .replace(/{user_ID}/g, `${member.id}`) || language.ticketNewTicketWaitForAssistant)
        
    .setColor(color)
    );

    chan.send ({ embeds: [new MessageEmbed()
    .setDescription(`Please use \`${prefix}close\` to close the ticket.`)
    .setColor(message.client.color.red)
    .setFooter({text: 'https://pogy.xyz/'})]})
    .setTimestamp()

   

let color2 = db.ticketLogColor
    if(color2 == "#000000") color2 = `#36393f`;

    const embedLog = new discord.MessageEmbed()
      .setColor(color2)
      .setFooter({text: 'https://pogy.xyz/'})
      .setTitle("Ticket Created")
      .setTimestamp()
      .addField("Information" , `**User:** ${user}\n**Ticket Channel: **${chan.name}\n**Ticket:** #${serverCase}\n**Date:** ${moment(new Date()).format("dddd, MMMM Do YYYY")} `)



      if(ticketLog) {

    send(ticketLog, embedLog, {
   name: `Ticket Logs`,
   icon: `${message.client.domain}/logo.png`
 }).catch(()=>{})

      
      }

		}).catch(() => {
      if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
		  message.channel.send({embeds:[new discord.MessageEmbed().setColor(message.client.color.red).setDescription("There was an error creating the ticket, please check my permissions or contact support.")]}).then(m => m.delete({timeout: 5000})).catch(() => {})
		})
  };
  }
      }
  })
 }
}
