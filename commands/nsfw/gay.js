const Command = require('../../structures/Command');
const fetch = require('node-fetch');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'gay',
        aliases: ['dick', 'dicks', 'cock', 'cocks', 'penis', 'penises'],
        description: 'yes',
        category: 'NSFW',
        nsfwOnly: true
      });
    }

    async run(message, args) {
      try {
        var subreddits = [
          'cockrating',
          'BonersInPublic',
          'curved_cock',
          'MassiveCock',
          'ratemycock',
          'RedditorCum',
          'NSFW_DICK_and_Cock',
          'TotallyStraight',
          'CockOutline',
          'lovegaymale'
        ]
      
        var reddit = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
      
        const data = await fetch(`https://meme-api.herokuapp.com/gimme/${reddit}`).then(res => res.json())

        if (!data) return message.channel.send(`Sorry, seems like i can't connect to API.`);
      
        const { title, postLink, url, subreddit } = data

        message.channel.send({
          embed: {
            color: "BLURPLE",
            title: `${title}`,
            url: `${postLink}`,
            image: {
              url: url
            },
            footer: { text: `/reddit/${subreddit}` }
          }
        });
      } catch(error) {
        this.client.emit("apiError", error, message);
      }
    }
};