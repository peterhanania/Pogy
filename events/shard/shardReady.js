const Event = require('../../structures/Event');
const Discord = require('discord.js');
const config = require('./../../config.json');
const logger = require('../../utils/logger');
const ms = require("ms")
const muteModel = require('../../models/mute');
const BlacklistModel = require('../../database/schemas/blacklist');

const Guild = require('../../database/schemas/Guild');
const { WebhookClient, MessageEmbed } = require('discord.js');
const webhookClient = new WebhookClient({id: config.webhook_id, url: config.webhook_url});
const Maintenance = require('../../database/schemas/maintenance')
const premiumrip = new WebhookClient({id: config.webhook_id, url: config.webhook_url});
const moment = require(`moment`)
const fetchAll = require('../../data/structures/fetchAll');
const emojiArray = require('../../data/structures/optionArray');
const pollModel = require('../../database/schemas/poll');
const Logging = require('../../database/schemas/logging.js');
module.exports = class extends Event {
  constructor(...args) {
    super(...args)
  }
  async run() {

    const shardGuildCounts = await this.client.shard.fetchClientValues('guilds.cache.size')
    const totalGuildCount = shardGuildCounts.reduce((total, current) => total + current)
    
    console.log('-----------')
    logger.info(`Shard ${this.client.shard.ids - 1 + 2}/${this.client.shard.count} is connected`, { label: 'Shard' })
    console.log('------------')


const maintenance = await Maintenance.findOne({
  maintenance: "maintenance"
})

if(maintenance && maintenance.toggle == "true") return;

// MUTE INTERVAL
setInterval(async () => {
        for (const guild of this.client.guilds.cache) {
            const muteArray = await muteModel.find({
                guildID: guild[0],
            })
    
            for (const muteDoc of muteArray) {
             
                if (Date.now() >= Number(muteDoc.length)) {
              
                    const guild = this.client.guilds.cache.get(muteDoc.guildID)
                    const member = guild ? guild.members.cache.get(muteDoc.memberID) : null
                    const muteRole = guild ? guild.roles.cache.find(r => r.name == 'Muted') : null
    
                    if (member) {
                        await member.roles.remove(muteRole ? muteRole.id : '').catch(err => console.log(err))
                        
                        //logging

                     const logging = await Logging.findOne({ guildId: guild.id })    
                    if(logging){
                      
        let muteRole = await guild.roles.cache.get(logging.moderation.mute_role);

  
    await member.roles.remove(muteRole.id, [`Mute Command | Duration Expired`]).catch(()=>{})

  let delaynumber = 2000;
  if(muteDoc.memberRoles.length > 10) delaynumber = 4000;
  if(muteDoc.memberRoles.length > 20) delaynumber = 8000;
  if(muteDoc.memberRoles.length > 30) delaynumber = 10000;
  if(muteDoc.memberRoles.length > 40) delaynumber = 12000;
  

    if(logging && logging.moderation.remove_roles === "true"){
    for (const role of muteDoc.memberRoles) {
 const roleM = await guild.roles.cache.get(role);
if(roleM){
 await member.roles.add(roleM, ["Mute Command, Mute duration Expired."]).catch(()=>{})
 
 await delay(delaynumber);
}
 
    }
    }
  
const role = member.guild.roles.cache.get(logging.moderation.ignore_role);
const channel = member.guild.channels.cache.get(logging.moderation.channel)

  if(logging.moderation.toggle == "true"){
    if(channel){


if(logging.moderation.mute == "true"){
  
let color = logging.moderation.color;
if(color == "#000000") color = member.client.color.green;

let logcase = logging.moderation.caseN
if(!logcase) logcase = `1`

const logEmbedm = new MessageEmbed()
.setAuthor(`Action: \`Un Mute\` | ${member.user.tag} | Case #${logcase}`, member.user.displayAvatarURL({ format: 'png' }))
.addField('User', member, true)
.addField('Reason',  'Mute Duration Expired', true)
.setFooter({text:`ID: ${member.id}`})
.setTimestamp()
.setColor(color)

channel.send(logEmbedm).catch(()=>{})

logging.moderation.caseN = logcase + 1
await logging.save().catch(()=>{})
}
    
    }
  }
}
                        /*for (const role of muteDoc.memberRoles) {
                            await member.roles.add(role).catch(err => console.log(err))*/
                        }
                    }
                    if(Date.now() >= Number(muteDoc.length)){
                    await muteDoc.deleteOne().catch(()=>{})
                    }
                }
            }
    }, 120000)
  


//premium

setInterval(async () => {


const conditional = {
    isPremium: "true",
}
const results = await Guild.find(conditional)

if (results && results.length) {
    for (const result of results) {
      
  

       if (Number(result.premium.redeemedAt) >= Number(result.premium.expiresAt)) {
            

const guildPremium = this.client.guilds.cache.get(result.guildId);
if(guildPremium){
  const user = await this.client.users.cache.get(result.premium.redeemedBy.id)

  if(user){

    const embed = new Discord.MessageEmbed()
    .setColor(this.client.color.red)
    .setDescription(`Hey ${user.username}, Premium in ${guildPremium.name} has Just expired :(\n\n__You can you re-new your server here! [https://pogy.xyz/premium](https://pogy.xyz/premium)__\n\nThank you for purchasing premium Previously! We hope you enjoyed what you purchased.\n\n**- Pogy**`)

    user.send(embed).catch(()=>{})
  }



   

    const rip = new Discord.MessageEmbed()
      .setDescription(`**Premium Subscription**\n\n**Guild:** ${guildPremium.name} | **${guildPremium.id}**\nRedeemed by: ${user.tag || 'Unknown'}\n**Plan:** ${result.premium.plan}`)
      .setColor('RED')
      .setTimestamp()

      await premiumrip.send({
        username: 'Pogy Loose Premium',
        avatarURL: `${this.client.domain}/logo.png`,
        embeds: [rip],
      }).catch(()=>{});
      


    result.isPremium = "false";
    result.premium.redeemedBy.id = null;
    result.premium.redeemedBy.tag = null;
    result.premium.redeemedAt = null;
    result.premium.expiresAt = null;
    result.premium.plan = null;

    await result.save().catch(()=>{})
}


    }

    }
}

}, 500000)
//POLL INTERVAL

 setInterval(async () => {
        for (const guild of this.client.guilds.cache) {
            const pollArray = await pollModel.find({
                guild: guild[0],
            }).catch(err => console.log(err));
            const guildDB =  await Guild.findOne({
                guild: guild[0].id,
            }).catch(err => console.log(err));

const language = require(`../../data/language/${guildDB.language}.json`)



            for (const poll of pollArray) {
                if (Date.now() >= Number(poll.expiryDate)) {

                  if(!poll.textChannel) return;

                    const channel = this.client.channels.cache.get(poll.textChannel)
                    const msg = await channel.messages.fetch(poll.message).catch(() => {});

                    const resultsArr = [];

                    for (const e of emojiArray()) {
                        const allReactions = await fetchAll(msg, e).catch(err => console.log(err));
                        resultsArr.push([e, typeof allReactions == 'object' ? allReactions.length : undefined]);
                    }

                    resultsArr.sort((a, b) => b[1] - a[1]);

  let votes = `${language.votes}`;
  if(resultsArr[0][1] == '1') votes = `${language.votess}`;
              

                    if (resultsArr[0][1] == resultsArr[1][1]) {


if(msg){


          let embed = new MessageEmbed()
                    .setTitle(poll.title)
                    .setDescription(`${language.poll4} ${language.poll6} **${resultsArr[0][1] - 1}** ${votes}`)
                    .setColor('YELLOW')
                    .setFooter({text: `Ended at ${moment(new Date()).format('LLLL')}`})
                  msg.edit({embeds:[embed]}).catch(() => {});
                  msg.reactions.removeAll().catch(() => {});
                    if (!channel.permissionsFor(channel.guild.me).has('SEND_MESSAGES')) return;
await poll.deleteOne().catch(() => {});
                  channel.send(`${language.poll4} \nhttps://discordapp.com/channels/${msg.guild.id}/${channel.id}/${msg.id}`);

} else{

  if (!channel.permissionsFor(channel.guild.me).has('SEND_MESSAGES')) return;
  await poll.deleteOne().catch(() => {});
  channel.send(`${language.poll5}  \n**${language.poll8}** `).catch(() => {});
}
         return;
                    }
                    else {
if(msg){
                        let embed = new MessageEmbed()
                    .setTitle(poll.title)
                    .setDescription(`${language.poll7} ${resultsArr[0][0]} ${language.with} ${resultsArr[0][1] - 1} ${language.votesss} `)
                    .setColor(`GREEN`)
                    .setFooter({text: `Ended at ${moment(new Date()).format('LLLL')}`})
                  msg.edit({embeds:[embed]}).catch(() => {});
                  msg.reactions.removeAll().catch(() => {});
                    if (!channel.permissionsFor(channel.guild.me).has('SEND_MESSAGES')) return;
await poll.deleteOne().catch(() => {});
                        channel.send(`${language.poll7} ${resultsArr[0][0]}  - ${resultsArr[0][1] - 1} ${language.votesss} \nhttps://discordapp.com/channels/${msg.guild.id}/${channel.id}/${msg.id}`);
                    } else{
 if (!channel.permissionsFor(channel.guild.me).has('SEND_MESSAGES')) return;
          await poll.deleteOne().catch(() => {});
              channel.send(`${language.poll7} ${resultsArr[0][0]} - ${resultsArr[0][1] - 1} ${language.votesss}  \n**${language.poll8}**`);
              
                    }
                    }
                    await poll.deleteOne().catch(err => console.log(err));
                    return;
                }
            }
        }
    }, 60000);






  }




}

  
    function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
