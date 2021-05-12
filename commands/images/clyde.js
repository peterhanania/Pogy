const Command = require('../../structures/Command');
const request = require('request-promise-native');
const fetch = require('node-fetch');
const Guild = require('../../database/schemas/Guild');
const discord = require('discord.js');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'clyde',
        description: 'Sends a clyde message!',
        category: 'Images',
        usage: '<text>',
        examples: [ 'clyde hey discord!' ],
        cooldown: 5
      });
    }

    async run(message, args) {

      const client = message.client;
      const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`../../data/language/${guildDB.language}.json`)

     
let text = args.slice(0).join(" ")
if(!text) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(`${client.emoji.fail} ${language.changeErrorValid}`));

  if(text.length > 60) return message.channel.send(new discord.MessageEmbed().setColor(client.color.red).setDescription(`${client.emoji.fail} ${language.clydeError}`));

try {
let msg = await message.channel.send(language.generating);


const data = await fetch(
    `https://nekobot.xyz/api/imagegen?type=clyde&text=${text}`
  ).then((res) => res.json());
  msg.delete({timeout: 500})
  message.channel.send(new discord.MessageEmbed().setColor(client.color.blue).setImage(data.message))

  
  } catch (err) {
    console.log(`${err}, command name: clyde`)
    message.channel.send(language.clydeError)
  }

    
        }}    