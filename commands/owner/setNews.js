const Command = require('../../structures/Command');
const SlayBotDB = require('../../database/schemas/Pogy');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: 'setnews',
      description: 'This is for the developers.',
      category: 'Owner',
      usage: [ '<text>' ],
      ownerOnly: true
    });
  }

  async run(message, args) {
    let news = args.join(' ').split('').join('') 
    if(!SlayBotDB.news) return  await SlayBotDB.create({ news: news, tag: '710465231779790849', time: new Date() }) + await SlayBotDB.updateOne({ news: news, tag: '710465231779790849', time: new Date()}) +  message.channel.send(' Updated News!')
    await SlayBotDB.updateOne({ news: news, tag: '710465231779790849', time: new Date() })
    message.channel.send(' Updated News!')
  }
};
