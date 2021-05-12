const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const { MessageEmbed } = require('discord.js');
const User = require('../../database/schemas/User');
const ms = require('ms')
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'vote',
        description: 'Pogy\s vote pages',
        category: 'Utility',
        cooldown: 5
      });
    }

    async run(message) {


       const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`../../data/language/${guildDB.language}.json`)

      let user = await User.findOne({
        discordId: message.author.id
      })

      if(!user){
        const newUser = new User({
          discordId: message.author.id
        })

        await newUser.save().catch(()=>{})
         user = await User.findOne({
        discordId: message.author.id
      })

      }

         let DBL_INTERVAL = 43200000
        let lastVoted = user && user.lastVoted ? user.lastVoted : 0
        let checkDBLVote = Date.now() - lastVoted < DBL_INTERVAL

        let votes = 'times'
        if (user && user.votes === 1) votes = '1 time'
        if (user && user.votes > 1) votes = `${user.votes} times`
              
      
  
      await message.channel.send(new MessageEmbed()
      .setDescription(`__**Top.gg**__\n${checkDBLVote ? `\`In ${ms(user.lastVoted - Date.now() + DBL_INTERVAL, { long: true })}\`` : '[\`Available Now!\`](https://top.gg/bot/767705905235099658/vote)'}\n\n__**Rewards:**__\n`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))
      .setColor(message.guild.me.displayHexColor)
      .setFooter('https://pogy.xyz')
      .setTimestamp()
      );
    }
};