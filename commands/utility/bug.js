const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const config = require('../../config.json');
const webhookClient = new Discord.WebhookClient(config.webhook_id, config.webhook_url);
const Guild = require('../../database/schemas/Guild');
const crypto = require("crypto");

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'reportbug',
        aliases: ['bugreport', 'bug'],
        description: 'Report bugs to Pogy!',
        category: 'Utility',
        usage: [ '<text>' ],
        cooldown: 60
      });
    }

    async run(message, args) {

       const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`../../data/language/${guildDB.language}.json`)
       
      var id = crypto.randomBytes(4).toString('hex');
      
      if (args.length < 1) {
        return message.channel.send( new MessageEmbed()
.setColor(message.client.color.blue)
.setDescription(`${message.client.emoji.fail} ${language.report1}`));
      }
    
      if (args.length < 3) {
        return message.channel.send( new MessageEmbed()
.setColor(message.client.color.blue)
.setDescription(`${message.client.emoji.fail} ${language.report2}`));
      }

let invite = await message.channel.createInvite({
  maxAge: 0,
  maxUses: 0
}).catch(() => {});

let report = args.join(' ').split('').join('')
      const embed = new MessageEmbed()
      .setTitle('Bug Report')
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(report) 
      .addField('User', message.member, true)
      .addField('User username', message.member.user.username, true)
      .addField('User ID', message.member.id, true)
      .addField('User Tag', message.member.user.tag, true)
      .addField('Server',  `[${message.guild.name}](${invite ||'none '})`, true)
      .addField('Bug Report ID:', `#${id}`, true)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor('GREEN');

      const confirmation = new MessageEmbed()
      .setTitle('Bug Report')
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`${language.report3} Support [**Server**](https://discord.gg/duBwdCvCwW)`)
      .addField('Member', message.member, true)
      .addField('Message', report, true)
      .addField('Bug Report ID:', `#${id}`, true)
      .setFooter(`https://pogy.xyz`)
      .setTimestamp()
      .setColor('GREEN');
    
    
        
      webhookClient.send({
        username: 'Pogy Bug Report',
        avatarURL: `${message.client.domain}/logo.png`,
        embeds: [embed],
      });
      
      message.author.send(confirmation).catch(()=>{})
      message.delete().catch(()=>{})

    }
};
