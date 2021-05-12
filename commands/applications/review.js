const discord = require("discord.js")
const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const app = require("../../models/application/application.js");
const Paste = require("../../models/transcript.js");
const ReactionMenu = require('../../data/ReactionMenu.js');
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "review",
      aliases: ["reviewapps", "reviewapplication", "reviewapplications"],
      usage: "",
      category: "Applications",

      description: "Approve an application in the guild.",
      cooldown: 5,
      userPermission: ['MANAGE_GUILD'],
    })
  }
  async run(message, args) {
    const client = message.client
    const guildDB = await Guild.findOne({
        guildId: message.guild.id
    });
    const language = require(`../../data/language/${guildDB.language}.json`)
    
   
        const conditional = {
   type: "form",
   status: null
}
const results = await Paste.find(conditional)
const array = []
if (results && results.length) {
    for (const result of results) {
       
       try {
      const member = await message.guild.members.fetch(result.by)

       array.push(`Application #${result._id} | Submitter: ${member.user.tag}`)
       } catch {
         
       }
     

    }

}
  const interval = 15;


    const embed = new discord.MessageEmbed()
    .setTitle(`Applications - Review`)
    .setDescription(`\`\`\`\n${array.join("\n\n")}\`\`\`` || "No Pending Applications Found")
    .setColor(message.client.color.green)
    .setFooter(message.author.tag,  
          message.author.displayAvatarURL({ dynamic: true })
        )

if (array.length <= interval) {
    
    const range = (array.length == 1) ? '[1]' : `[1 - ${array.length}]`;
      message.channel.send(embed
    .setTitle(`Applications - Review ${range}`)
    .setDescription(`\`\`\`\n${array.join("\n\n")}\`\`\``|| "No Pending Applications Found")
    .setColor(message.client.color.green)
    .setFooter(message.author.tag,  
          message.author.displayAvatarURL({ dynamic: true })
        )
      )
      

    } else {

      embed
        .setTitle(`Applications - Review`)
        .setFooter(message.author.tag,  
          message.author.displayAvatarURL({ dynamic: true })
        );

      new ReactionMenu(message.client, message.channel, message.member, embed, array, interval);
    }

  }
}