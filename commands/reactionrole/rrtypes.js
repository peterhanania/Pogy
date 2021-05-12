const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const { MessageEmbed } = require('discord.js');

const ReactionRole = require("../../packages/reactionrole/index.js")
const react = new ReactionRole()
const config = require("../../config.json");
react.setURL(config.mongodb_url)

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'rrtypes',
        aliases: ["rrtype", "reactionroletypes"],
        description: 'Enable / Disable Reaction Role DMs',
        category: 'Reaction Role',
        cooldown: 3,
      });
    }

    async run(message, args) {
    let client = message.client

       const guildDB = await Guild.findOne({
        guildId: message.guild.id
      });
    
      const language = require(`../../data/language/${guildDB.language}.json`)
      
    
      let fail = message.client.emoji.fail;
      let success = message.client.emoji.success;


  const embedType = new MessageEmbed()
  .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setDescription(`\`Type 1\` - React adds the role, unreacting removes the role\n\`Type 2\` - Reacting will give the role but unreaction won't remove the role\n\`Type 3\` - Reacting will remove the user's role and unreacting won't give it back\n\`Type 4\` - When reacting it will remove the role, unreacting will add the role\n\`Type 5\` - Same concept as number 3 but removes the user's reaction\n\`Type 6\` - React to recieve the role and react again to remove the role`)
  .setFooter(`https://pogy.xyz`)
   .setColor(client.color.red)

message.channel.send(embedType)


    }
};