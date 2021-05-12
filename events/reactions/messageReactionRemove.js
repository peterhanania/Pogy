const Event = require('../../structures/Event');
const { MessageReaction, User, MessageEmbed } = require("discord.js");
const Db = require("../../packages/reactionrole/models/schema.js");
const reactionCooldown = new Set();
const GuildDB = require('../../database/schemas/Guild');
const Maintenance = require('../../database/schemas/maintenance');
const botCooldown = new Set();
/**
 *
 * @param {MessageReaction} reaction
 * @param {User} user
 */

module.exports = class extends Event {
	async run(messageReaction, user) {


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

  
  let guild = this.client.guilds.cache.get(db.guildid); 
let guildName = guild.name;
  
  const rrRole = message.guild.roles.cache.get(db.roleid);
  if (!rrRole) return;
  
let addEmbed = new MessageEmbed()
.setAuthor('Role Added', `${message.client.domain}/logo.png` , `${message.url}` )
.setDescription(`You have recieved the **${rrRole.name}** Role by reacting in ${guildName}`)
.setFooter(`https://pogy.xyz`)
.setColor(message.client.color.green)

let remEmbed = new MessageEmbed()
.setAuthor('Role Removed', `${message.client.domain}/logo.png` , `${message.url}` )
.setDescription(`You have removed the **${rrRole.name}** Role by reacting in ${guildName}`)
.setFooter(`https://pogy.xyz`)
.setColor(message.client.color.green)




if(reactionCooldown.has(user.id)) return 

if(db.option === 1) {
      try {
        if (member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())) {
        await member.roles.remove(rrRole).catch(()=>{})
        reactionCooldown.add(user.id);
        setTimeout(()=>{
        reactionCooldown.delete(user.id)
        }, 2000);

        if(guildDB.reactionDM === true){
        if(botCooldown.has(message.guild.id)) return;
        member.send(remEmbed).catch(()=>{})
         botCooldown.add(message.guild.id)
 setTimeout(()=>{
 botCooldown.delete(message.guild.id)
 }, 4000)


        }
  
        }
      } catch (err) {
        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;

if(botCooldown.has(message.guild.id)) return;
 botCooldown.add(message.guild.id)
 setTimeout(()=>{
 botCooldown.delete(message.guild.id)
 }, 6000)
  return member.send(errorReaction).catch(()=>{})
      }
    }
    
    if(db.option === 4) {
      try {
         if (!member.roles.cache.find(r => r.name.toLowerCase() === rrRole.name.toLowerCase())){
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
            if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
if(botCooldown.has(message.guild.id)) return;
 botCooldown.add(message.guild.id)
 setTimeout(()=>{
 botCooldown.delete(message.guild.id)
 }, 6000)
    return member.send(errorReaction).catch(()=>{})
      }
    }



    }
  );
};


	}
	
