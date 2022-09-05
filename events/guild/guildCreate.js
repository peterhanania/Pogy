const Event = require('../../structures/Event');
const Discord = require('discord.js');
const logger = require('../../utils/logger');
const Guild = require('../../database/schemas/Guild');
const metrics = require('datadog-metrics');
const Logging = require('../../database/schemas/logging');
const config = require('../../config.json');
const welcomeClient = new Discord.WebhookClient({  url: config.webhook_url});
const webhookClient = new Discord.WebhookClient({  url: config.webhook_url});

module.exports = class extends Event {

  async run(guild) {
    logger.info(`Joined to "${guild.name}" (${guild.id})`, { label: 'Guilds' })

    const find = await Guild.findOne({
      guildId: guild.id,
    })

    if(!find){
          const guildConfig = await Guild.create({
      guildId: guild.id,
      language: "english"
    })
    await guildConfig.save().catch(()=>{})
    }
    
    
  var textChats = guild.channels.cache
        .find(ch => ch.type === 'text' && ch.permissionsFor(guild.me).has(['SEND_MESSAGES', 'VIEW_CHANNEL', 'EMBED_LINKS']))

const modLog = guild.channels.cache.find(c => c.name.replace('-', '').replace('s', '') === 'modlog' || 
    c.name.replace('-', '').replace('s', '') === 'moderatorlog');

 let muteRole = guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');
  if (!muteRole) {
    try {
      muteRole = await guild.roles.create({
        data: {
          name: 'Muted',
          permissions: []
        }
      });
    } catch {
    
    }
    for (const channel of guild.channels.cache.values()) {
      try {
        if (channel.viewable && channel.permissionsFor(guild.me).has('MANAGE_ROLES')) {
          if (channel.type === 'GUILD_TEXT') 
            await channel.permissionOverwrites.edit(muteRole, {
              'SEND_MESSAGES': false,
              'ADD_REACTIONS': false
            });
          else if (channel.type === 'GUILD_VOICE' && channel.editable) // 
            await channel.permissionOverwrites.edit(muteRole, {
              'SPEAK': false,
              'STREAM': false
            });
        } 
      } catch (err) {
       
      }
    }
  }
  
  const logging = await Logging.findOne({
    guildId: guild.id
  })
  if(!logging){
    const newL = await Logging.create({
      guildId: guild.id
    })
    await newL.save().catch(()=>{})
  }

  const logging2 = await Logging.findOne({
    guildId: guild.id
  })

  if(logging2){
    if(muteRole){
logging2.moderation.mute_role = muteRole.id
    }

    if(modLog){
      logging2.moderation.channel = modLog.id
    }
    await logging2.save().catch(()=>{})
    

  }

    if(textChats){
      const embed = new Discord.MessageEmbed()
      .setColor('PURPLE')
      .setDescription(`Hey Poggers! I'm **Pogy**.\n\nThank you for inviting me to your server as it means a lot to us! You can get started with [\`p!help\`](https://pogy.xyz) & customise your server settings by accessing the Dashboard [\`here\`](https://pogy.xyz/dashboard/${guild.id}).\n\n__**Current News**__\n\`\`\`\nWe are currently giving premium to all servers until 1000 guilds! If interested Please visit https://pogy.xyz/redeem\`\`\`\n\nAgain, thank you for inviting me! (this server is now very pog)\n**- Pogy**`)
      .addField(
        '\u200b', 
        '**[Invite](https://invite.pogy.xyz) | ' +
        '[Support Server](https://pogy.xyz/support) | ' +
        '[Dashboard](https://pogy.xyz/dashboard)**'
      );



      textChats.send(embed).catch(()=>{})
    }


    const welcomeEmbed  = new Discord.MessageEmbed()
    .setColor(`PURPLE`)
    .setTitle('New Server')
    .setThumbnail(`https://pogy.xyz/logo`)
    .setDescription(`Pogy was added to a new Server!`)
    .addField(`Server Name`, `\`${guild.name}\``, true)
    .addField(`Server ID`, `\`${guild.id}\``, true)
    .setFooter(`${this.client.guilds.cache.size} guilds `,  'https://pogy.xyz/logo.png');

welcomeClient.send({
   username: 'Pogy',
        avatarURL: 'https://pogy.xyz/logo.png',
        embeds: [welcomeEmbed],
})

if(config.datadogApiKey){
      metrics.init({ apiKey: this.client.config.datadogApiKey, host: 'pogy', prefix: 'pogy.' });
      metrics.increment('guildCreate');
}
      const embed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setDescription(`I have joined the ${guild.name} server.\n\nID: ${guild.id}`)
      .setFooter(`Gained ${guild.members.cache.size - 1} members • I'm now in ${this.client.guilds.cache.size} servers!`)
      .setThumbnail(guild.iconURL({ dynamic: true }) ? guild.iconURL({ dynamic: true }) : `https://guild-default-icon.herokuapp.com/${encodeURIComponent(guild.nameAcronym)}`)
      .addField('Server Owner', `${guild.owner.user.tag} / ${guild.ownerID}`)
    
      webhookClient.send({
        username: 'Pogy',
        avatarURL: 'https://pogy.xyz/logo.png',
        embeds: [embed],
      });
    
}
};
