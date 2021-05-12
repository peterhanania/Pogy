const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/logging')
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'databaseadd',
        aliases: [ 'adatabase' ],
        description: 'Add database',
        category: 'Owner',
        ownerOnly: true
      });
    }

    async run(message, args) {

    message.client.guilds.cache.forEach(async(guild)=>{
    
    const check = await Guild.findOne({
      guildId: guild.id
    })

    if(!check){
      
        
    const newGuild = await Guild.create({
            guildId: guild.id,
          });
          
      await newGuild.save().catch(()=>{})
        
   

        

    }
    })

   message.channel.send(`Done!`)

    }
};

