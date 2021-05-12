const Command = require('../../structures/Command');
const fetch = require('node-fetch');
const Guild = require('../../database/schemas/Guild');
const { MessageEmbed } = require('discord.js');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'nuke',
        description: 'nuke a server (FAKE) !',
        category: 'Fun',
        cooldown: 3
      });
    }

    async run(message, args) {

        message.channel.send(`https://tenor.com/view/explosion-mushroom-cloud-atomic-bomb-bomb-boom-gif-4464831`).catch(() => {});
        message.react('790133942095183873').catch(() => {});

    }
};