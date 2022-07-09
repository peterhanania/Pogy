const config = require('./config.json');
const logger = require('./utils/logger');
const Discord = require('discord.js');
const Statcord = require("statcord.js");
const { token } = require('./utils/variables.js');


const manager = new Discord.ShardingManager('./index.js', {
  token: token,
 //autoSpawn: true,
  //totalShards: 'auto'
  totalShards: 1
});

manager.spawn();

manager.fetchClientValues('guilds.cache.size')
  .then(results => console.log(`${results.reduce((prev, val) => prev + val, 0)} total guilds`))
  .catch(console.error);

manager.on('shardCreate', shard => logger.info(`Launching Shard ${shard.id + 1}`, { label: `Shard` }));
