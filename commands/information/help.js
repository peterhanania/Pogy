const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const discord = require('discord.js');
const { oneLine, stripIndent } = require('common-tags');
const emojis = require('../../assets/emojis.json')

module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'help',
        aliases: ['menu', 'bothelp', 'commands'],
        description: 'Shows you every available command in the guild',
        category: 'Information',
        usage: '[command]',
        examples: [ 'help userinfo', 'help avatar' ],
        cooldown: 3
      });
    }

    async run(message, args) {


    const guildDB = await Guild.findOne({ guildId: message.guild.id });

    let disabledCommands = guildDB.disabledCommands;
    if (typeof(disabledCommands) === 'string') disabledCommands = disabledCommands.split(' ');

    const prefix = guildDB.prefix;


      const emoji = {
        altdetector: `${emojis.altdetector}`,
        applications: `${emojis.applications}`,
         config: `${emojis.config}`,
        utility: `${emojis.utility}`,
        economy: `${emojis.economy}`,
         fun: `${emojis.fun}`,
        images: `${emojis.images}`,
        information: `${emojis.information}`,
        moderation: `${emojis.moderation}`,
        nsfw: `${emojis.nsfw}`,
        reactionrole: `${emojis.reactionrole}`,
        tickets: `${emojis.tickets}`,
        owner: `${emojis.owner}`
      };
     
      const green = '<:purple:826033456207233045>';
      const red = '<:redsquare:803527843661217802>';

      const settings = await Guild.findOne({
        guildId: message.guild.id,
      });

      const embed = new MessageEmbed()
        .setColor('PURPLE')


      if (!args || args.length < 1) {

        let categories;
       categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'Owner').map(cmd => cmd.category));


        if(this.client.config.developers.includes(message.author.id)) categories = this.client.utils.removeDuplicates(this.client.commands.map(cmd => cmd.category));


        for (const category of categories) {
          embed.addField(`${emoji[category.split(" ").join("").toLowerCase()]} **${capitalize(category)}**`, `\`${prefix}help ${category.toLowerCase()}\``, true)
        }
        embed.setTitle(`Pogy's Command List`)
        embed.setDescription(stripIndent`
        <:purple:826033456207233045> The Prefix for this server is \`${prefix}\`
  
        `);


        embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        embed.setTimestamp()


embed.addField(
        '\u200b', 
        '**[Invite](https://invite.pogy.xyz) | ' +
        '[Support Server](https://pogy.xyz/support) | ' +
        '[Dashboard](https://pogy.xyz/dashboard)**'
      );
        return message.channel.send({embeds: [embed]})
     

      } else if(args && args.join(" ").toLowerCase() == "alt detector"  || args && args[0].toLowerCase() == "alt"){

        embed.setTitle(` ${emojis.altdetector} - Alt Detector`)
        embed.setDescription(this.client.commands.filter(cmd => 
            cmd.category.toLowerCase() === "alt detector").map(cmd => `${cmd.disabled || disabledCommands.includes(cmd.name || cmd) ? red : green} \`${cmd.name} ${" ".repeat(9 - Number(cmd.name.length))}:\` ${cmd.description}`).join("\n"));

        embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        embed.setTimestamp()
        embed.addField(
        '\u200b', 
        '**[Invite](https://invite.pogy.xyz) | ' +
        '[Support Server](https://pogy.xyz/support) | ' +
        '[Dashboard](https://pogy.xyz/dashboard)**'
      );
        return message.channel.send({embeds: [embed]})

      } else if(args && args[0].toLowerCase() == "owner"){

        if(!this.client.config.developers.includes(message.author.id)) return message.channel.send(`${message.client.emoji.fail} | You are not allowed to view this category`)



        embed.setTitle(`${emojis.owner} Owner Commands`)
        embed.setDescription(this.client.commands.filter(cmd => 
            cmd.category.toLowerCase() === "owner").map(cmd => `${cmd.disabled || disabledCommands.includes(cmd.name || cmd) ? red : green} \`${cmd.name} ${" ".repeat(11 - Number(cmd.name.length))}:\` ${cmd.description}`).join("\n"));

        embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        embed.setTimestamp()
        embed.addField(
        '\u200b', 
        '**[Invite](https://invite.pogy.xyz) | ' +
        '[Support Server](https://pogy.xyz/support) | ' +
        '[Dashboard](https://pogy.xyz/dashboard)**'
      );
        return message.channel.send({embeds: [embed]})

      } else if(args && args[0].toLowerCase() == "applications"  || args && args[0].toLowerCase() == "apps"){

        embed.setTitle(` ${emojis.applications} - applications`)
        embed.setDescription(this.client.commands.filter(cmd => 
      
            cmd.category.toLowerCase() === "applications").map(cmd => `${cmd.disabled || disabledCommands.includes(cmd.name || cmd) ? red : green} \`${cmd.name} ${" ".repeat(11 - Number(cmd.name.length))}:\` ${cmd.description}`).join("\n"));

        embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        embed.setTimestamp()

embed.addField(
        '\u200b', 
        '**[Invite](https://invite.pogy.xyz) | ' +
        '[Support Server](https://pogy.xyz/support) | ' +
        '[Dashboard](https://pogy.xyz/dashboard)**'
      );
      
        return message.channel.send({embeds: [embed]})

      
        } else if(args && args[0].toLowerCase() == "config"  || args && args[0].toLowerCase() == "configuration"){

        embed.setTitle(` ${emojis.config} - Config`)
        embed.setDescription(this.client.commands.filter(cmd => 
      
            cmd.category.toLowerCase() === "config").map(cmd => `${cmd.disabled || disabledCommands.includes(cmd.name || cmd) ? red : green} \`${cmd.name} ${" ".repeat(14 - Number(cmd.name.length))}:\` ${cmd.description}`).join("\n"));

        embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        embed.setTimestamp()
embed.addField(
        '\u200b', 
        '**[Invite](https://invite.pogy.xyz) | ' +
        '[Support Server](https://pogy.xyz/support) | ' +
        '[Dashboard](https://pogy.xyz/dashboard)**'
      );
        return message.channel.send({embeds: [embed]})

      } else if(args && args[0].toLowerCase() == "utility"  || args && args[0].toLowerCase() == "utils"){

        embed.setTitle(` ${emojis.utility} - Utility`)
        embed.setDescription(this.client.commands.filter(cmd => 
      
            cmd.category.toLowerCase() === "utility").map(cmd => `${cmd.disabled || disabledCommands.includes(cmd.name || cmd) ? red : green} \`${cmd.name} ${" ".repeat(10 - Number(cmd.name.length))}:\` ${cmd.description}`).join("\n"));

        embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        embed.setTimestamp()
embed.addField(
        '\u200b', 
        '**[Invite](https://invite.pogy.xyz) | ' +
        '[Support Server](https://pogy.xyz/support) | ' +
        '[Dashboard](https://pogy.xyz/dashboard)**'
      );
        return message.channel.send({embeds: [embed]})

      
      } else if(args && args[0].toLowerCase() == "economy"  || args && args[0].toLowerCase() == "currency"){

        embed.setTitle(` ${emojis.economy} - Economy`)
        embed.setDescription(this.client.commands.filter(cmd => 
      
            cmd.category.toLowerCase() === "economy").map(cmd => `${cmd.disabled || disabledCommands.includes(cmd.name || cmd) ? red : green} \`${cmd.name} ${" ".repeat(9 - Number(cmd.name.length))}:\` ${cmd.description}`).join("\n"));

        embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        embed.setTimestamp()
embed.addField(
        '\u200b', 
        '**[Invite](https://invite.pogy.xyz) | ' +
        '[Support Server](https://pogy.xyz/support) | ' +
        '[Dashboard](https://pogy.xyz/dashboard)**'
      );
        return message.channel.send({embeds: [embed]})

      
        } else if(args && args[0].toLowerCase() == "fun"){

        embed.setTitle(` ${emojis.fun} - Fun`)
        embed.setDescription(this.client.commands.filter(cmd => 
      
            cmd.category.toLowerCase() === "fun").map(cmd => `${cmd.disabled || disabledCommands.includes(cmd.name || cmd) ? red : green} \`${cmd.name} ${" ".repeat(10 - Number(cmd.name.length))}:\` ${cmd.description}`).join("\n"));

        embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        embed.setTimestamp()
embed.addField(
        '\u200b', 
        '**[Invite](https://invite.pogy.xyz) | ' +
        '[Support Server](https://pogy.xyz/support) | ' +
        '[Dashboard](https://pogy.xyz/dashboard)**'
      );
        return message.channel.send({embeds: [embed]})

      
        } else if(args && args[0].toLowerCase() == "images"  || args && args[0].toLowerCase() == "image"){

        embed.setTitle(` ${emojis.images} - Image`)
        embed.setDescription(this.client.commands.filter(cmd => 
      
            cmd.category.toLowerCase() === "images").map(cmd => `${cmd.disabled || disabledCommands.includes(cmd.name || cmd) ? red : green} \`${cmd.name} ${" ".repeat(14 - Number(cmd.name.length))}:\` ${cmd.description}`).join("\n"));

        embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        embed.setTimestamp()
embed.addField(
        '\u200b', 
        '**[Invite](https://invite.pogy.xyz) | ' +
        '[Support Server](https://pogy.xyz/support) | ' +
        '[Dashboard](https://pogy.xyz/dashboard)**'
      );
        return message.channel.send({embeds: [embed]})

      
      } else if(args && args[0].toLowerCase() == "information"  || args && args[0].toLowerCase() == "info"){

        embed.setTitle(` ${emojis.information} - Info`)
              embed.setDescription(this.client.commands.filter(cmd => 
            cmd.category.toLowerCase() === "information").map(cmd => `${cmd.disabled || disabledCommands.includes(cmd.name || cmd) ? red : green} \`${cmd.name} ${" ".repeat(11 - Number(cmd.name.length))}:\` ${cmd.description}`).join("\n"));

        embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        embed.setTimestamp()
embed.addField(
        '\u200b', 
        '**[Invite](https://invite.pogy.xyz) | ' +
        '[Support Server](https://pogy.xyz/support) | ' +
        '[Dashboard](https://pogy.xyz/dashboard)**'
      );
        return message.channel.send({embeds: [embed]})

        } else if(args && args[0].toLowerCase() == "moderation"  || args && args[0].toLowerCase() == "mod"){

        embed.setTitle(` ${emojis.moderation} - Moderation`)
            embed.setDescription(this.client.commands.filter(cmd => 
            cmd.category.toLowerCase() === "moderation").map(cmd => `${cmd.disabled || disabledCommands.includes(cmd.name || cmd) ? red : green} \`${cmd.name} ${" ".repeat(11 - Number(cmd.name.length))}:\` ${cmd.description}`).join("\n"));
        embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        embed.setTimestamp()
embed.addField(
        '\u200b', 
        '**[Invite](https://invite.pogy.xyz) | ' +
        '[Support Server](https://pogy.xyz/support) | ' +
        '[Dashboard](https://pogy.xyz/dashboard)**'
      );
        return message.channel.send({embeds: [embed]})

      
        } else if(args && args[0].toLowerCase() == "nsfw"){


        embed.setTitle(` ${emojis.nsfw} - NSFW`)
            embed.setDescription(this.client.commands.filter(cmd => 
            cmd.category.toLowerCase() === "nsfw").map(cmd => `${cmd.disabled || disabledCommands.includes(cmd.name || cmd) ? red : green} \`${cmd.name} ${" ".repeat(9 - Number(cmd.name.length))}:\` ${cmd.description}`).join("\n"));

        embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        embed.setTimestamp()
embed.addField(
        '\u200b', 
        '**[Invite](https://invite.pogy.xyz) | ' +
        '[Support Server](https://pogy.xyz/support) | ' +
        '[Dashboard](https://pogy.xyz/dashboard)**'
      );
      if(!message.channel.nsfw) embed.setDescription(`The following Menu only belongs to NSFW Channels 👀`)
        return message.channel.send({embeds: [embed]})

      } else if(args && args.slice(0).join(" ").toLowerCase() == "reaction role" || args && args[0].toLowerCase() == "rr"){

        embed.setTitle(` ${emojis.reactionrole} - Reaction Roles`)
        embed.setDescription(this.client.commands.filter(cmd => 
      
            cmd.category.toLowerCase() === "reaction role").map(cmd => `${cmd.disabled || disabledCommands.includes(cmd.name || cmd) ? red : green} \`${cmd.name} ${" ".repeat(12 - Number(cmd.name.length))}:\` ${cmd.description}`).join("\n"));

        embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        embed.setTimestamp()
embed.addField(
        '\u200b', 
        '**[Invite](https://invite.pogy.xyz) | ' +
        '[Support Server](https://pogy.xyz/support) | ' +
        '[Dashboard](https://pogy.xyz/dashboard)**'
      );
      
        return message.channel.send({embeds: [embed]})

        } else if(args && args[0].toLowerCase() == "tickets" || args && args[0].toLowerCase() == "ticketing"){

        embed.setTitle(` ${emojis.tickets} - Tickets`)
        embed.setDescription(this.client.commands.filter(cmd => 
      
            cmd.category.toLowerCase() === "tickets").map(cmd => `${cmd.disabled || disabledCommands.includes(cmd.name || cmd) ? red : green} \`${cmd.name} ${" ".repeat(11 - Number(cmd.name.length))}:\` ${cmd.description}`).join("\n"));
embed.addField(
        '\u200b', 
        '**[Invite](https://invite.pogy.xyz) | ' +
        '[Support Server](https://pogy.xyz/support) | ' +
        '[Dashboard](https://pogy.xyz/dashboard)**'
      );
        embed.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        embed.setTimestamp()

        return message.channel.send({embeds: [embed]})

      
      
      } else {




         const cmd = this.client.commands.get(args[0]) || this.client.commands.get(this.client.aliases.get(args[0]))

        if (!cmd)  return message.channel.send(`${message.client.emoji.fail} Could not find the Command you're looking for`)

        if(cmd.category === "Owner") return message.channel.send(`${message.client.emoji.fail} Could not find the Command you're looking for`)
        

        embed.setTitle(`Command: ${cmd.name}`)
        embed.setDescription(cmd.description)
        embed.setThumbnail(`${message.client.domain}/logo.png`)
        embed.setFooter(cmd.disabled || disabledCommands.includes(args[0] || args[0].toLowerCase()) ? 'This command is currently disabled.' : message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
       
        
        embed.addField('Usage',  `\`${cmd.usage}\``, true)
        embed.addField('category',  `\`${capitalize(cmd.category)}\``, true)

        if(cmd.aliases && cmd.aliases.length && typeof(cmd.aliases) === "array") embed.addField('Aliases', cmd.aliases.map(alias => `\`${alias}\``, true).join(', '), true)
        if(cmd.cooldown && cmd.cooldown > 1) embed.addField('Cooldown', `\`${cmd.cooldown}s\``, true)
        if(cmd.examples && cmd.examples.length) embed.addField('__**Examples**__', cmd.examples.map(example => `<:purple:826033456207233045> \`${example}\``).join('\n'))
  
        
        return message.channel.send({embeds: [embed]})
       
      }
    }
};

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
