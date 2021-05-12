const Command = require('../../structures/Command');
const fetch = require('node-fetch');

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'meme',
        description: 'Generate some memes!',
        category: 'Images',
        cooldown: 2
      });
    }

    async run(message) {
      try {
        const data = await fetch(`https://meme-api.herokuapp.com/gimme`)
        .then(res => res.json())
      
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