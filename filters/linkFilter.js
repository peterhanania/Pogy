const Guild = require('../database/schemas/Guild');
const logger = require('../utils/logger');

module.exports = async message => {
  const settings = await Guild.findOne({
    guildId: message.guild.id,
  }, (err, guild) => {
    if (err) console.log(err)
  });

  if (settings.antiLinks) {
    if (!message.member.hasPermission('ADMINISTRATOR' || 'MANAGE_GUILD' || 'BAN_MEMBERS' || 'KICK_MEMBERS' || 'MANAGE_MESSAGES')) {
      if (hasLink(message.content)) {
    
        return deleteLink(message);
      }
    }
  } else return;

  function hasLink(string) {
    let link = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  
    if (link.test(string)) return true;
    return false;
  }
  
  function deleteLink(message) {
    if (message.deletable) {
      message.delete().catch(() => {});
    }
    
    message.channel.send({
      embed: {
        color: 'RED',
        author: {
          name: `${message.member.user.tag}`,
          icon_url: message.member.user.displayAvatarURL({format: 'png', dynamic: true, size: 1024})
        },
        footer: {
          text: message.deletable ? '' : 'Couldn\'t delete the message due to missing permissions.'
        },
        description: 'No Links allowed here'
      }
    })
    return true;
  }
}