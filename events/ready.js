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

logger.info(`✅ loaded Maintenance Mode `, { label: 'Status' })
} else {
			logger.info(`✅ loaded: Bot Status `, { label: 'Status' })

      
  }
}

}

