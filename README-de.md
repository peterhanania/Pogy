<h1 align="center">
 <br>
  <a href="https://github.com/peterhanania"><img src="https://pogy.xyz/thumb.png"></a>
  <br>
  Pogy der Discord Bot [ Discord.js v12 ]
  <br>
</h1>

<h3 align=center>Ein komplett anpassbarer discord bot mit 183 commands, 12 ketegorien und einem dashboard!</h3>


<div align=center>

 <a href="https://github.com/mongodb/mongo">
    <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white" alt="mongo">
  </a>
  
  <a href="https://github.com/discordjs">
    <img src="https://img.shields.io/badge/discord.js-v12.5.3-blue.svg?logo=npm" alt="discordjs">
  </a>

  <a href="https://github.com/peterhanania/Pogy/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-Apache%202-blue" alt="license">
  </a>

</div>

<p align="center">
  <a href="#about">Über Pogy</a>
  •
  <a href="#features">Funktionen</a>
  •
  <a href="#installation">Installation</a>
  •
  <a href="#setting-up">Einstellen</a>
  •
  <a href="#license">Lizenz</a>
  •
  <a href="#donate">Spenden</a>
  •
  <a href="#credits">Kredite</a>
</p>

## About

Pogy ist ein discord bot in dem 4 monate arbeit stecken. Ich hab mich dazu entschlossen den bot open source zu machen. Wenn du eine kopie in deinem server haben willst klick [hier](https://pogy.xyz/invite) um unseren officiellen bot einzuladen! Du kannst auch dem offiziellen [Pogys Support Server](https://pogy.xyz/support) beitreten falls du hilfe brauchst!

Wenn du dieses projekt magst gib uns doch einen stern ⭐ und folg mir. Das bedeutet uns sehr viel.

**183+** commands und **12** verschiedene kategorien!

  * **alt detector:** Sperrt alt accounts
  * **applications:** Bearbeite bewerbungen über die website
  * **config:** Konfiguriere server einstellungen
  * **utility:** Ein paar utility commands
  * **economy:** Angefangen aber noch nicht fertig
  * **fun:** Sehr viele commands um deinen server aktiv zu machen
  * **images:** Bilder Commands
  * **information:** Informations Commands
  * **moderation:** Mod commands um deinen discord server zu moderieren
  * **nsfw:** 👀
  * **reaction roles:** Reaction roles
  * **tickets:** Server tickets für support

Pogy hat die folgenden features auf der Website!

  * **Ticket Transcripts** + **Application Transcripts**
  * **Kontakt & Report** seite
  * **Willkommens und verlassens nachrichten** mit embeds.
  * Komplett anpassbares **Logging** und **moderation**
  * Komplett anpassbare **Suggestions** und **Server Reports**
  * Eingebautes **Premium system**
  * Eingebauter maintenance mode
  * Eine member seite
  * Auto Mod, Levelling, und Commands ( noch nicht fertig )
  * Gebaut mit TOP.gg's API
 
 <h1 align="center">
  <a href="https://github.com/peterhanania"><img src="https://i.imgur.com/On7mMNg.jpg["></a>
</h1>

  
**Webhooks: (für developer)**
Mit Pogy kannst du alles mit webhooks loggen. ( du musst jeden webhook einzeln in visual studio code ändern)

<h1 align="center">
  <a href="https://github.com/peterhanania"><img src="https://i.imgur.com/vbGuLdL.jpg"></a>
</h1>

## Installation

Kopier dieses repo:
```
git clone https://github.com/peterhanania/Pogy.git
```
Nach dem koppieren nutze diesen befehl
```
npm install
```


## Setting Up

Deine `config.json` sollte so aussehen:
```
{
  "main_token": process.env.token, 
  "mongodb_url": "", // Mongo DB URL
  "developers": ["", ""], // Developers ID
  "datadogApiKey": "", // For Statistics (optional)
  "dashboard": "false", 
  "prefix": "p!", // Prefix
  "arc": "", // Arc.io Source (optional)
  "youtube_key": "", // Youtube api key from https://console.cloud.google.com/apis/
  "cat_api_key": "",// https://thecatapi.com/signup
  "webhook_id": "", // Read config.json
  "webhook_url": "" // Read config.json
}

```

Deine `config.js` sollte so aussehen:
```
module.exports = {
 "verification": "",
 "description": "", // Description
 "domain": "", // domain
 "google_analitics": "", // Google Analitics
 "token": process.env.TOKEN,
 "https":"https://", // Leave as is
 "port":"5003",

 "client_id":"", // Bot client ID
 "secret":""// Bot client secret for auth

}
```
Deine `.env` sollte so sein:
```
TOKEN=BOT_TOKEN
```

### Für das dashboard lies dir bitte https://github.com/IgorKowalczyk/majo.exe#-self-hosting-dashboard durch

**Callbacks auf dem Auth Dev Portal:**
`https://domain/callback`
`https://domain/window`
`https://domain/thanks`

Bitte stelle sicher das du die `Privileged Intents` auf deinem Discord [Developer Portal](https://discordapp.com/developers/applications/). Du findest diese intents unter der "Bot" sektion hier sind zwei hacken die du anschalten solltest. Für weitere information über Gateway Intents lies dir diesen [guide](https://discordjs.guide/popular-topics/intents.html#the-intents-bit-field-wrapper). durch 

Du kannst den bot mit `npm run start` starten ( stelle sicher das du node und npm installiert hast ).

**WIchtige Notizen:** Pogy hat viele bugs und erfordert viel javascript wissen. Solltest du keine erfahrung mit discord.js haben wirst du starke probleme mit diesem bot haben.

### Emojis 
- Du kannst die emojis hier ändern: <br>
1- `assets/emojis.json` <br>
2- `data/emoji.js`

### Colors
- Du kannst die farben hier ändern `data/colors.js`

## License
Veröffentlicht unter der [Apache License](http://www.apache.org/licenses/LICENSE-2.0) Lizenz.

## Donate
Du kannst Pogy geld spenden um ihn stärker als jemals bevor zu machen [wenn du hier](https://paypal.me/pogybot) klickst! 
You can donate Pogy and make it stronger than ever [by clicking here](https://paypal.me/pogybot)!

## Credits
* **Peter Hanania** - *head developer* - [github](https://github.com/peterhanania)
* **Wlegit** - *developer*  - [github](https://github.com/wlegit)
* **Slayer** - *Contributor - Command Handler base* [github](https://github.com/GhostSlayer)
* **Ace** - *Contributor - Embed builder* [github](https://github.com/Glitchii)
* **Majo** - *Dashboard base + css* - [github](https://github.com/IgorKowalczyk/)
* **loom** - *Contributor + Translation* - [github](https://github.com/loom4k/) [website](https://loom4k.me)
* **Mezo** - *German Translation* - [github](https://github.com/mezotv/) [website](https://devdominik.com)
