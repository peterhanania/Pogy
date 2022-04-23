const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const Vc = require('../../database/schemas/tempvc');
const { MessageEmbed } = require('discord.js');
const { oneLine, stripIndent } = require('common-tags');
const moment = require('moment');
const mongoose = require("mongoose");
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'tempvc',
        description: 'Enable / disable tempvc',
        category: 'Utility',
        usage: [ '<enable | disable>'],
        examples: [ 'tempvc enable', 'tempvc disable'],
        cooldown: 10,
        userPermission: ['MANAGE_GUILD'],
        botPermission: ['SEND_MESSAGES', 'EMBED_LINKS', 'MOVE_MEMBERS', 'MANAGE_CHANNELS', 'VIEW_CHANNEL'],
      });
    }

    async run(message, args) {

      const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
      
      const vcDB = await Vc.findOne({
        guildId: message.guild.id
		},
		(err, guild) => {
			if (err) console.error(err);
			if (!guild) {
				const newGuild = new Vc({
					_id: mongoose.Types.ObjectId(),
					guildId: message.guild.id,
					channelID: null,
          categoryID: null
				});

				newGuild
					.save()
					.catch(err => console.error(err));
					
					    return

			}
		}
	);
 

      const language = require(`../../data/language/${guildDB.language}.json`);
      
let prefix = guildDB.prefix;
let fail = message.client.emoji.fail;
let success = message.client.emoji.success
let client = message.client



      let properUsage = new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${language.tempvc1.replace(/{prefix}/g, `${prefix}`)}`)
        .setFooter({text: 'https://pogy.xyz/'})

      if (args.length < 1) {
        return message.channel.send(properUsage);
      }

 
      if (args.includes('disable') || args.includes('off') ) {
    if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send ({ embeds: [new MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setTitle(`${fail} ${language.missingUser} `)
    .setDescription(`${language.tempvc2}`)
    .setTimestamp()
    .setFooter({text: 'https://pogy.xyz/'})]})
    .setColor(message.guild.me.displayHexColor);

        if(!vcDB.channelID || !vcDB.categoryID || !vcDB.guildId ||!vcDB.channelID === null) return message.channel.send ({ embeds: [new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${message.client.emoji.fail} ${language.tempvc3}`)
        .setFooter({text: 'https://pogy.xyz/'})]});
        await Vc.findOne({
          guildId: message.guild.id
      }, async (err, guild) => {

       let voiceID = guild.channelID
       let categoryID = guild.categoryID

       let voice = message.client.channels.cache.get(voiceID)
       if(voice) voice.delete().catch(()=>{})

       let category = message.client.channels.cache.get(categoryID)
       if(category) category.delete().catch(()=>{})

        if(!guild){
        Vc.create({ 
          guildId: message.guild.id,
          channelID: null,
          categoryID: null
          })

        return;
        } else {
          guild.updateOne({
            channelID: null,
            categoryID: null
          }).catch(err => console.error(err));
        }
          
  
          return message.channel.send ({ embeds: [new MessageEmbed()
          .setColor(message.guild.me.displayHexColor)
          .setDescription(`${message.client.emoji.success} ${language.tempvc4}`)
          .setFooter({text: 'https://pogy.xyz/'})]}); 
        });
        return;
      } else if (args.includes('enable') || args.includes('on') ) {
    if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send ({ embeds: [new MessageEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setTitle(`${fail} ${language.missingUser} `)
    .setDescription(`${language.tempvc2}`)
    .setTimestamp()
    .setFooter({text: 'https://pogy.xyz/'})]})
    .setColor(message.guild.me.displayHexColor);

     
try {

  const embed = new MessageEmbed()
  .setAuthor(`${language.tempvc5}`, `https://www.creeda.co.in/Images/loader.gif`)
  .setDescription(`\`${language.tempvc6}\``)
  .setColor(message.guild.me.displayHexColor);    
  const msg = await message.channel.send({embeds: [embed]});



  let category = message.guild.channels.cache.find(c => c.name.toLowerCase() == "join to create" && c.type == "category");
  setTimeout(async() => {
  if(!category) { 
    await embed
      .setDescription(`**${language.tempvc7}**`)
      .setFooter(`Pogy v2.0`)
      .setTimestamp();
    msg.edit(embed) + message.guild.channels.create(`Join to Create`, {type: 'category', permissionOverwrites: [
    {
        id: message.guild.id,
        allow: ['VIEW_CHANNEL'],
    },
    {
        id: message.author.id,
        allow: ['VIEW_CHANNEL'],
    },
]})
return;
  } else {
 embed
  .setDescription(`**${language.tempvc8}**\n\nID: ${category.id}`)
  .setFooter(`Pogy v2.0`)
  .setTimestamp();
msg.edit(embed);

  }
}, 2000)
  
let voice = message.guild.channels.cache.find(c => c.name.toLowerCase() == "join to create" && c.type == "voice");


setTimeout(async() => { 
if(!voice) {
    
await embed
.setDescription(`**${language.tempvc9}**`)
.setFooter(`Pogy v2.0`)
.setTimestamp();
msg.edit(embed);
+ message.guild.channels.create('Join to create', {type: 'voice', permissionOverwrites: [
        {
            id: message.guild.id,
            deny: ['VIEW_CHANNEL'],
        },
        {
            id: message.author.id,
            allow: ['VIEW_CHANNEL'],
        },
    ]}).then((s)=>{
      if(!category) return
      s.setParent(category.id).catch(()=>{})
    })

return; 
} else {
   embed
  .setDescription(`**${language.tempvc10}**\n\nID: ${voice.id}`)
  .setFooter(`Pogy v2.0`)
  .setTimestamp();
msg.edit(embed)

};
}, 2000)

setTimeout(async() => {
                
if(!voice || !category ) {
    embed
    .setAuthor(`Setup Fail`)
    .setDescription(`${language.tempvc11.replace(/{prefix}/g, `${prefix}`)}`)
    .setFooter(`Pogy v2.0`)
    .setTimestamp();
  msg.edit(embed);
  await Vc.findOne({
        guildId: message.guild.id
    }, async (err, guild) => {
      if(!guild){
        Vc.create({ 
          guildId: message.guild.id,
          channelID: null,
          categoryID: null
          })

        return;
        } else {
        guild.updateOne({
          channelID: null,
          categoryID: null
        }).catch(err => console.error(err));
        }
        

    })

return;
} else {
  let channelVoice = message.client.channels.cache.get(voice.id)
  let channelInv = await channelVoice.createInvite({
  maxAge: 0, 
  maxUses: 0 
}).catch(()=>{})
    voice.setParent(category.id);
    embed
    .setAuthor(`${language.tempvc12}`, `${message.client.domain}/logo.png` , `${channelInv}` )
    .setDescription(`**${language.tempvc13}** ${category.name}\n**${language.tempvc13} ID:** ${category.id}\n\n**${language.tempvc14}** ${voice.name}\n**${language.tempvc14} ID:** ${voice.id}\n\n${language.tempvc15} \`${prefix}tempvc off\` `)
    .setFooter(`Pogy v2.0`)
    .setTimestamp();
  msg.edit(embed);
  if(channelInv && channelVoice) message.channel.send(`${channelInv}`)
  await Vc.findOne({
        guildId: message.guild.id
    }, async (err, guild) => {
      if(!guild){
        Vc.create({ 
          guildId: message.guild.id,
          channelID: voice.id,
          categoryID: category.id
          })

        return;
        } else {
        guild.updateOne({
          channelID: voice.id,
          categoryID: category.id
        }).catch(err => console.error(err));
        }
        
    })
  }
  }, 2000)
} catch {

    message.channel.send ({ embeds: [new MessageEmbed().setDescription(`${language.tempvc16}`).setColor(`RED`)]});
  await Vc.findOne({
        guildId: message.guild.id
    }, async (err, guild) => {

      if(!guild){
        Vc.create({ 
          guildId: message.guild.id,
          channelID: null,
          categoryID: null
          })

        return;
        } else {
        
        guild.updateOne({
          channelID: null,
          categoryID: null
        }).catch(err => console.error(err));
        }
        
      })
    }

  
    } else if(args[0]) {
     message.channel.send(properUsage) 
    } else {
 message.channel.send(properUsage) 

    }
    }
};