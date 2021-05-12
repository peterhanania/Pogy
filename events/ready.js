const muteModel = require('../models/mute');
const Event = require('../structures/Event');
const logger = require('../utils/logger');
const Maintenance = require('../database/schemas/maintenance')
module.exports = class extends Event {
    async run() {

const maintenance = await Maintenance.findOne({
  maintenance: "maintenance"
})

if(maintenance && maintenance.toggle == "true"){

  

    this.client.user.setPresence({ status: 'dnd' });
    this.client.user.setActivity('Under Maintenance')

  

logger.info(`✅ loaded Maintenance Mode `, { label: 'Status' })
} else {
    const activities = [
      { name: 'p!help | pogy.xyz', type: 'WATCHING' }, 
      { name: '@pogy', type: 'WATCHING' }
    ];
  

    this.client.user.setPresence({ status: 'online', activity: activities[0] });
  
    let activity = 1;
  

    setInterval(() => {
      activities[2] = { name: `p!help | ${ this.client.guilds.cache.size} guilds`, type: 'WATCHING' };
      activities[3] = { name: `p!help | ${ this.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} users`, type: 'WATCHING' }; 
      if (activity > 3) activity = 0;
      this.client.user.setActivity(activities[activity]);
      activity++;
    }, 35000);


			logger.info(`✅ loaded: Bot Status `, { label: 'Status' })

      
  }
}

}

