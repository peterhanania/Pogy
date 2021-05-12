const mongoose = require('mongoose');
const config = require('./../config.json');
const { mongodb } = require('./variables');
const logger = require('../utils/logger');

module.exports = {
  init: () => {
    const dbOptions = {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };

    if (!config.mongodb_url) logger.error(`Database failed to load - Required environment variable "mongodb_url" is not set.`, { label: 'Database' })
    mongoose.connect(mongodb, dbOptions)
    .catch(e => {
      logger.error(e.message, { label: 'Database' })
      this.database = null
    })

    mongoose.set('useFindAndModify', false);
    mongoose.Promise = global.Promise;

    mongoose.connection.on('err', err => {
      logger.error(`Mongoose connection error: ${err.stack}`, { label: 'Database' })
    });

    mongoose.connection.on('disconnected', () => {
      logger.error(`Mongoose connection lost`, { label: 'Database' })
    });
  }
}