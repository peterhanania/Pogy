const Command = require('../../structures/Command');
const fetch = require('node-fetch');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'reddit',
        description: 'Get a random photo from specified subreddit',
        category: 'Images',
        cooldown: 2
      });
    }

    async run(message, args) {
      try {
        if (args.length < 1) {
          return message.channel.send('Please give me a subreddit!')
        }

        var subreddits = [
          args.join(' ').split('').join('')
        ]
      
        var reddit = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
  
        const data = await fetch(`https://meme-api.herokuapp.com/gimme/${reddit}`).then(res => res.json())

        if(data.nsfw) return message.channel.send(`${message.client.emoji.fail} The selected subreddit is 18+. please consider using an NSFW Channel!`)
      
        const { title, postLink, url, subreddit } = data
  
        message.channel.send({
          embed: {
            color: message.client.config.blue,
            title: `${title}`,
            url: `${postLink}`,
            image: {
              url: url
            },
            footer: { text: `/reddit/${subreddit}` }
          }
        }).catch(() => {
          message.channel.send(`Could not find that subreddit!`)
        });


      } catch(error) {

        message.channel.send(`Could not find that subreddit!`)
      }
    }
};