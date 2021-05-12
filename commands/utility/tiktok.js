const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const { MessageEmbed } = require('discord.js');
const TikTokScraper = require('tiktok-scraper');
const numformat = n => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  };
const { oneLine } = require('common-tags');
const discord = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'tiktok',
        description: `Shows you the tiktok stats of a provided user!`,
        category: 'Utility',
        cooldown: 3
      });
    }

    async run(message, args) {
     const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`../../data/language/${guildDB.language}.json`)
       
      message.channel.send(`The following Command has been disabled Since The tiktok API is not working. We are working on making our own API and bringing the command back!`)
      if(!args[0]) return message.channel.send(`${language.tiktok1}`)
       try 
  {
      const user = await TikTokScraper.getUserProfileInfo(args[0]);
      if(user.user.signature == ''){
          const userbe = new discord.MessageEmbed()
          .setColor('#b434eb')
          .setTitle(`${language.tiktok2} - @${user.user.uniqueId}`)
          .setURL(`https://www.tiktok.com/@${user.user.uniqueId}`)
          .setThumbnail(user.user.avatarThumb)
          .addField(`${language.tiktok3}`, `${user.user.uniqueId}`, true)
          .addField(`${language.tiktok4}`, `${user.user.nickname}`, true)
          .addField(`${language.tiktok5}`, `No bio yet.`)
          .addField(`${language.tiktok6}`, numformat(`${user.stats.followerCount}`),true)
          .addField(`${language.tiktok7}`, numformat(`${user.stats.followingCount}`),true)
          .addField(`${language.tiktok8}`, numformat(`${user.stats.heartCount}`),true)
          .setFooter(`${language.tiktok9} ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
          message.channel.send({embed: userbe })
      }
      else
      {
          const userbd = new discord.MessageEmbed()
          .setColor('#b434eb')
          .setTitle(`${language.tiktok2} - @${user.user.uniqueId}`)
          .setURL(`https://www.tiktok.com/@${user.user.uniqueId}`)
          .setThumbnail(user.user.avatarThumb)
          .addField(`${language.tiktok3}`, `${user.user.uniqueId}`, true)
          .addField(`${language.tiktok4}`, `${user.user.nickname}`, true)
          .addField(`${language.tiktok5}`, `${user.user.signature}`)
          .addField(`${language.tiktok6}`, numformat(`${user.stats.followerCount}`),true)
          .addField(`${language.tiktok7}`, numformat(`${user.stats.followingCount}`),true)
          .addField(`${language.tiktok8}`, numformat(`${user.stats.heartCount}`),true)
          .setFooter(`${language.tiktok9} ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
          message.channel.send({embed: userbd })            
      }
  } 
  catch (error) {
    console.log(error)
 message.channel.send(new MessageEmbed()
      .setColor('#FF0000')
      .setDescription(`${language.tiktok10} **${args[0]}**`)
      .setFooter(`${language.tiktok9} ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true })));
 
}
   
    }
};