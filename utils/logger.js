const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const Discord = require('discord.js');
const config = require('./../config.json');
const webhookClient = new Discord.WebhookClient(config.webhook_id, config.webhook_url);
const chalk = require('chalk');


const myFormat = printf(({ level, message, label, timestamp }) => {
  webhookClient.send(`${timestamp} [${label}] ${message}`)
  return `${timestamp} [${level}] [${chalk.cyan(label)}] ${message}`;
});

const myCustomLevels = {
  levels: { 
    error: 0, 
    warn: 1, 
    info: 2, 
    http: 3,
    verbose: 4, 
    debug: 5, 
    silly: 6 
  }
};

const logger = createLogger({
  levels: myCustomLevels.levels,
  format: combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: './assets/logs/Pogy.log' }),
  ],
});

module.exports = logger;
