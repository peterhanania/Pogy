const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const pokemon = require('../../assets/json/pokemon.json');
const Guild = require('../../database/schemas/Guild');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'pokemon',
        aliases: [ 'poke'],
        description: 'Guess the sent Pokemon!',
        category: 'Fun',
        guildOnly: true,
        cooldown: 3
      });
    }

    async run(message) {
      const rand = Math.floor(Math.random() * 802);
      const poke = rand > 0 ? rand : Math.floor(Math.random() * 802);
      const pokem = pokemon[poke];
  
      const embed = new MessageEmbed()
        .setAuthor(`Guess the pokemon`, pokem.imageURL, pokem.imageURL)
        .setImage(pokem.imageURL)
        .setColor('BLURPLE');
      
      const msg = await message.channel.send({ embed });

      const filter = m => m.author.id === message.author.id;
      const attempts = await msg.channel.awaitMessages(filter, { time: 15000, max: 1 });
        
      if (!attempts || !attempts.size) {
        msg.delete();
        return message.channel.send(`You took too long to answer. It was ${pokem.name}.`);
      } 
        
      const answer = attempts.first().content.toLowerCase();  
        
      if (answer === pokem.name.toLowerCase()) {
        await msg.edit();
        return msg.channel.send(`Great job! Your answer was correct!`);
      }
      await msg.edit();
      return msg.channel.send(`Fasle, the pokemon was **${pokem.name}.**`);
    } 
};