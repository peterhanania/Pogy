const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const { MessageEmbed } = require('discord.js');
const discord = require("discord.js")
const randoStrings = require("randostrings");
const random = new randoStrings;
const talkedRecently = new Set();
const ShortUrl = require('../../models/ShortUrl.js');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'shorturl',
        aliases: [ 'shorten'],
        description: 'Shorten a url!!',
        category: 'Utility',
        guildOnly: true,
        cooldown: 20
      });
    }

    async run(message, args) {
        const guildDB = await Guild.findOne({
            guildId: message.guild.id
        });


          const language = require(`../../data/language/${guildDB.language}.json`)
          

          if (talkedRecently.has(message.author.id)) {
            message.channel.send(`You are **blocked** from the following command - ${message.author}`);
          
          } else {
         
let kaka = random.password({
    length: 8,
    string: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  })

let link = args[0]

let rgx =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

  let ipLoggers = [
        "viral.over-blog.com",
        "gyazo.in",
        "ps3cfw.com",
        "urlz.fr",
        "webpanel.space",
        "steamcommumity.com",
        "imgur.com.de",
        "fuglekos.com",
        "grabify.link",
        "leancoding.co",
        "stopify.co",
        "freegiftcards.co",
        "joinmy.site",
        "curiouscat.club",
        "catsnthings.fun",
        "catsnthings.com",
        "xn--yutube-iqc.com",
        "gyazo.nl",
        "yip.su",
        "iplogger.com",
        "iplogger.org",
        "iplogger.ru",
        "2no.co",
        "02ip.ru",
        "iplis.ru",
        "iplo.ru",
        "ezstat.ru",
        "whatstheirip.com",
        "hondachat.com",
        "bvog.com",
        "youramonkey.com",
        "pronosparadise.com",
        "freebooter.pro",
        "blasze.com",
        "blasze.tk",
        "ipgrab.org",
        "gyazos.com",
        "discord.kim",
        "https://viral.over-blog.com",
        "https://gyazo.in",
        "https://ps3cfw.com",
        "https://urlz.fr",
        "https://webpanel.space",
        "https://steamcommumity.com",
        "https://imgur.com.de",
        "https://fuglekos.com",
        "https://grabify.link",
        "https://leancoding.co",
        "https://stopify.co",
        "https://freegiftcards.co",
        "https://joinmy.site",
        "https://curiouscat.club",
        "https://catsnthings.fun",
        "https://catsnthings.com",
        "https://xn--yutube-iqc.com",
        "https://gyazo.nl",
        "https://yip.su",
        "https://iplogger.com",
        "https://iplogger.org",
        "https://iplogger.ru",
        "https://2no.co",
        "https://02ip.ru",
        "https://iplis.ru",
        "https://iplo.ru",
        "https://ezstat.ru",
        "https://whatstheirip.com",
        "https://hondachat.com",
        "https://bvog.com",
        "https://youramonkey.com",
        "https://pronosparadise.com",
        "https://freebooter.pro",
        "https://blasze.com",
        "https://blasze.tk",
        "https://ipgrab.org",
        "https://gyazos.com",
        "https://discord.kim",
        "http://viral.over-blog.com",
        "http://gyazo.in",
        "http://ps3cfw.com",
        "http://urlz.fr",
        "http://webpanel.space",
        "http://steamcommumity.com",
        "http://imgur.com.de",
        "http://fuglekos.com",
        "http://grabify.link",
        "http://leancoding.co",
        "http://stopify.co",
        "http://freegiftcards.co",
        "http://joinmy.site",
        "http://curiouscat.club",
        "http://catsnthings.fun",
        "http://catsnthings.com",
        "http://xn--yutube-iqc.com",
        "http://gyazo.nl",
        "http://yip.su",
        "http://iplogger.com",
        "http://iplogger.org",
        "http://iplogger.ru",
        "http://2no.co",
        "http://02ip.ru",
        "http://iplis.ru",
        "http://iplo.ru",
        "http://ezstat.ru",
        "http://whatstheirip.com",
        "http://hondachat.com",
        "http://bvog.com",
        "http://youramonkey.com",
        "http://pronosparadise.com",
        "http://freebooter.pro",
        "http://blasze.com",
        "http://blasze.tk",
        "http://ipgrab.org",
        "http://gyazos.com",
        "http://discord.kim"
    ];


if(!link) return  message.channel.send( new discord.MessageEmbed()
  .setDescription(`${message.client.emoji.fail} | ${language.shortUrlError}`)
  .setColor(message.client.color.red));

  if(link.includes("porn") || ipLoggers.includes(link) || link.includes("sex") || link.includes("grabify") || link.includes("iplogger") || link.includes("2no") || link.includes("yip") || link.includes("iplis")|| link.includes("02ip") || link.includes("ezstat") || link.includes("logger")) return message.channel.send(`${message.author} ${language.shorturlBlock1}`) +       talkedRecently.add(message.author.id);
  setTimeout(() => {
 
    talkedRecently.delete(message.author.id);
  }, 3600000 * 2);


if(!rgx.test(args[0]))
return message.channel.send( new discord.MessageEmbed()
  .setDescription(`${message.client.emoji.fail} | ${language.shortUrlError}`)
  .setColor(message.client.color.red));


await ShortUrl.create({ full: link, short: kaka, guildID:message.guild.id, memberID:message.author.id})
message.channel.send(new discord.MessageEmbed().setDescription(`${language.urlCreated}\n\n**Short Url:** [https://pogy.xyz/url/${kaka}](https://pogy.xyz/url/${kaka})\n**Full url:** ${args[0]}\n\n**Please note that by making urls you abide by our [policy](https://pogy.xyz/url)**`).setColor(message.client.color.blue));
   
          }
}
}        