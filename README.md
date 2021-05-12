<h1 align="center">
 <br>
  <a href="https://github.com/peterhanania"><img src="https://pogy.xyz/thumb.png"></a>
  <br>
  Pogy the Discord Bot
  <br>
</h1>

<h3 align=center>A fully customizable bot built with 183 commands, 12 categories and a dashboard!</h3>


<div align=center>

 <a href="https://github.com/mongodb/mongo">
    <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white" alt="mongo">
  </a>
  
  <a href="https://github.com/discordjs">
    <img src="https://img.shields.io/badge/discord.js-v12.5.3-blue.svg?logo=npm" alt="discordjs">
  </a>

  <a href="https://github.com/peterhanania/Pogy/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-GNU%20GPL%20v3-green" alt="license">
  </a>

</div>

<p align="center">
  <a href="#about">About</a>
  •
  <a href="#features">Features</a>
  •
  <a href="#installation">Installation</a>
  •
  <a href="#setting-up">Setting Up</a>
  •
  <a href="#license">License</a>
  •
  <a href="#credits">Credits</a>
</p>

## About

Pogy is a discontinued discord bot that took over 4 months of work to make. I decided to make the bot open sourced to whoever wants to run a copy in their server! You can click [this](https://pogy.xyz/invite) link to invite the official Bot! Also, you can join the official [Pogy's Support Server](https://pogy.xyz/support) for assistance.

If you liked this repository, feel free to leave a star ⭐ and follow me, it actually means a lot.

## Features

**183+** commands and **12** different categories!

  * **alt detector:** Blocks alts from the guild
  * **applications:** Manage applications from the website
  * **config:** Configure server settings
  * **utility:** Some utility commands
  * **economy:** Started but not done
  * **fun:** A ton of commands to keep your server active
  * **images:** Image Commands
  * **information:** Information Commands
  * **moderation:** Mod commands to moderate your discord server
  * **nsfw:** 👀
  * **reaction roles:** Reaction roles
  * **tickets:** Guild tickets for support 

Pogy even has the following features on the website

  * **Ticket Transcripts** + **Application Transcripts**
  * **Contact & Report** page
  * **Welcome messages** and **farewell messages** including embeds.
  * Full customizable **Logging** and **moderation**
  * Full customizable **Suggestions** and **Server Reports**
  * A built in **Premium system**
  * A built in maintenance mode
  * A members Page
  * Auto Mod, Levelling, and Commands ( not done )
  * Built in TOP.gg API
 
 <h1 align="center">
  <a href="https://github.com/peterhanania"><img src="https://i.imgur.com/On7mMNg.jpg["></a>
</h1>

  
 **Webhooks: (for Developer)**
 With Pogy You can even log everything using webhooks. ( you will have to change each webhook using visual studio code )

<h1 align="center">
  <a href="https://github.com/peterhanania"><img src="https://i.imgur.com/vbGuLdL.jpg"></a>
</h1>

## Installation

First clone the repo:
```
git clone https://github.com/peterhanania/Pogy.git
```
After cloning, run an
```
npm install
```


## Setting Up

Your `config.json` should look like this:
```
{
  "main_token": "", // bot main token
  "mongodb_url": "", //mongo db URL
  "alexflipnoteApiKey":"", //get from https://discord.gg/bsUDZqUbyz
  "developers": ["", ""], //developers ID
  "datadogApiKey": "", // for statistics (optional)
  "dashboard":"false", 
  "arc":"" //arc.io source (optional)
}
```

Your `config.js` should look like this:
```
module.exports = {
 "verification": "",
 "description": "", //description
 "domain": "", // domain
 "google_analitics": "", // google analitics
 "token": process.env.TOKEN,
 "https":"https://", // leave as is
 "port":"5003",

 "client_id":"", // bot client ID
 "secret":"",// bot client secret for auth

}

// read more on https://github.com/IgorKowalczyk/majobot
```


Pease make sure you have enabled `Privileged Intents` on your Discord [developer portal](https://discordapp.com/developers/applications/). You can find these intents under the "Bot" section, and there are two ticks you have to switch on. For more information on Gateway Intents, check out [this](https://discordjs.guide/popular-topics/intents.html#the-intents-bit-field-wrapper) link.

You can launch the bot with `node shard.js` 

**Important Note:** Pogy has so many bugs and requires a lot of js knowledge. You will have some difficulty running the bot if you have no experience in discord.js. 

### Emojis 
- You can change the emojis in: <br>
1- `assets/emojis.json` <br>
2- `data/emoji.js`

### Colors

- You can change the colors in `data/colors.js`



## License

Released under the [GNU GPL v3](https://www.gnu.org/licenses/gpl-3.0.en.html) license.

## Credits

* **Peter Hanania** - *head developer* - [github](https://github.com/peterhanania)
* **Wlegit** - *developer*  - [github](https://github.com/wlegit)
* **Slayer** - *Contributor - Command Handler base* [github](https://github.com/GhostSlayer)
* **Ace** - *Contributor - Embed builder* [github](https://github.com/Glitchii)
* **Majo** - *Dashboard base + css* - [github](https://github.com/IgorKowalczyk/)
