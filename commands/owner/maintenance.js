const Command = require('../../structures/Command');
const Maintenance = require('../../database/schemas/maintenance')
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'maintenance',
        aliases: [ 'maintenance' ],
        description: 'Sets the bot to maintenance',
        category: 'Owner',
        ownerOnly: true
      });
    }

    async run(message, args) {

      if(!args[0]) return message.channel.send('Would you like to enable or disable maintenance mode?')
      
      const maintenance = await Maintenance.findOne({maintenance: 'maintenance'})

      if(args[0].toLowerCase() == "enable"){
      if(maintenance){

      maintenance.toggle = "true"
      await maintenance.save();

      } else {
        const newMain = new Maintenance({
          toggle: "true"
        })
        newMain.save().catch(()=>{})
      }
      await message.channel.send('Enabling maintenance Mode')
      process.exit(1)

      } else if(args[0].toLowerCase() == "disable"){

 if(maintenance){
      maintenance.toggle = "false"
      await maintenance.save();

      } else {
        const newMain = new Maintenance({
          toggle: "false"
        })
        newMain.save().catch(()=>{})
      }
      await message.channel.send('Disabling maintenance Mode')
      process.exit(1)

      } else {
        message.channel.send('Invalid Response')
      }
      
    }
};
