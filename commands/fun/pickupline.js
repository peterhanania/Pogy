const Command = require('../../structures/Command');
const fetch = require('node-fetch');
const Guild = require('../../database/schemas/Guild');



const line = [
    "Are you Node.js because I'd always give you a callback? I promise",
    "I hope you know CPR because you take my breath away!",
    "You've made me so nervous that I've totally forgotten my standard pick-up line.",
    "Are you a trap card? Because I’ve fallen for you.",
    "Roses are red, violets are blue, omae wa mo shindeiru",
    "Baby, come with me and you'll be Going Merry.",
    "I think I need a paralyze heal! Because you're stunning!",
    "You must be a mahou shoujo, you've got me under your spell!",
    "Do you have a Death Note? Because everytime you smile, I feel like I'm having a heart attack!",
    "Are you Saitama? Because you've got me down in one move!",
    "I don't need 99 souls, all I need is yours!",
    "You must be better than Kuuhaku. Because when I first saw you, you already won my heart!",
    "I'd take the Hunter Exam just for you!",
    "Do you believe in fate? How about you stay the night? (Fate/Night; this one wasn't too apparant..)",
    "Just say yes and I'll give you more than seven Eurekas!",
    "You're like the 3D Maneuver gear. I won't stand a chance in this world without you!",
    "You remind me of Menma. Because even when I can't see you, I still feel you inside my heart!",
    "If I just had a Geass, I'd command you to be mine!",
    "Extra cursed student or not, I wont even think of ignoring you! (From anime *another*; not too apparant..rip)",
    "I don't need a Sharingan to see how beautiful you are!",
    "Are you Kikyo? Because I think you shot an arrow through my heart!",
    "Even if it means risking my existence, I'll cross different world lines just to find you! (Steins;Gate)",
    "Hey! Are you the railgun? Because I can feel a spark! (Toaru Kagaku no Railgun)",
    "Are you from the Bath House? Because you take my spirit away. (Spirited Away)",
    "Omae wa mo shindeiru!",
    "You must be Kira, because you just gave me a heart attack!",
    "You're cooler than Grey's ice shell!",
    "You're more delicious than Ciel's soul!",
    "Our love is like Grell, it never seems to die!",
    "We were born to make history!!",
    "If you were a potato, you would be a good potato.",
    "I don't need a Death Note, your beauty is killer!",
    "I love you as much as Ryuk loves apples!",
    "I'll buy you ice cream, just be careful not to drop it  ...🍦",
    "Call me All Might, because I’m just looking to Texas Smash!",
    "...Full Homo...",
    "I don't need pickup lines, because they don't work on corpses.",
    "Kanye feel the love?",
    "You can take me to flavour town!!",
    "Hey, you're pretty good!!",
    "I'd go full homo for you!",
    "I wish they'd all die, except for you!"
]


const { MessageEmbed } = require('discord.js');
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'pickupline',
        description: 'Generate some pickuplines!',
        category: 'Fun',
        cooldown: 3
      });
    }

    async run(message, args) {

        
        const embed = new MessageEmbed()
                    .setDescription(line[Math.round(Math.random() * (line.length - 1))])
                    .setColor(message.client.color.pink);
                return message.channel.send({ embed }).catch(() => {});
    }
};