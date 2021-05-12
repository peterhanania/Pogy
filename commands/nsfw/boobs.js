const Command = require('../../structures/Command');
const fetch = require('node-fetch');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'boobs',
        aliases: ['boob', 'boobies'],
        description: 'Sends you a random boob image 🍒.',
        category: 'NSFW',
        nsfwOnly: true
      });
    }

    async run(message, args) {
      try {
        var subreddits = [
          'boobs',
          'Boobies',
          'Stacked',
          'BustyPetite',
          'Cleavage',
          'bustyasians',
          'boltedontits',
          'burstingout'
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