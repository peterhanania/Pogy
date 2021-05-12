const Command = require('../../structures/Command');
const User = require('../../database/schemas/User')
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'removebadge',
        aliases: [ ],
        description: 'Remove a certain badge to a user.',
        category: 'Owner',
        ownerOnly: true
      });
    }

    async run(message, args) {

      const client = message.client;

      let user = message.mentions.users.first() || client.users.cache.get(args[0]) || match(args.join(" ").toLowerCase(), message.guild) || message.author;

      if(!user) return message.channel.send('Provide me with a user.');
      

      const badge = args[1]
      if(!badge) return message.channel.send('Provide me with a badge');

      let userFind = await User.findOne({
        discordId: user.id
      });
      
      if(!userFind){
              const newUser = new User({
              discordId: message.author.id
            })
  
            newUser.save()
             userFind = await User.findOne({
        discordId: user.id
      });

      }

      if(userFind.badges.includes(badge)) {

      let arr = userFind.badges
      let newArr = removeA(arr, badge)
      
      await userFind.updateOne({
        badges: newArr
      })
      message.channel.send(`Removed ${badge} from the user!`)


      } else {
        message.channel.send(`He doesn't have that badge`)
      }

   

    }
};

          function match(msg, i) {
          if (!msg) return undefined;
          if (!i) return undefined;
          let user = i.members.cache.find(
            m =>
              m.user.username.toLowerCase().startsWith(msg) ||
              m.user.username.toLowerCase() === msg ||
              m.user.username.toLowerCase().includes(msg) ||
              m.displayName.toLowerCase().startsWith(msg) ||
              m.displayName.toLowerCase() === msg ||
              m.displayName.toLowerCase().includes(msg)
          );
          if (!user) return undefined;
          return user.user;
        }

        function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}