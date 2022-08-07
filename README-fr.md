<h1 align="center">
 <br>
  <a href="https://github.com/peterhanania"><img src="https://pogy.xyz/thumb.png"></a>
  <br>
  Pogy le bot Discord [ Discord.js v12 ]
  <br>
</h1>

<h3 align=center>Un bot complètement configurable avec plus de 183 commandes, 12 catégories, et un paneau de contrôle!</h3>


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
  <a href="#about">À Propos</a>
  •
  <a href="#features">Features</a>
  •
  <a href="#installation">Installation</a>
  •
  <a href="#setting-up">Configuration</a>
  •
  <a href="#license">License</a>
  •
  <a href="#donate">Donation</a>
  •
  <a href="#credits">Crédits</a>
</p>

## À propos

Pogy est un bot discord qui a demandé plus de 4 mois de travail à réaliser. J'ai décider de rendre le bot *open-source* pour que n'importe qui qui veut rouler sa propre copie dans son serveur! Vous pouvez cliquer [ici](https://pogy.xyz/invite) pour inviter le bot officiel. Rejoignez aussi [Pogy's Support Server](https://pogy.xyz/support) pour de l'aide et du support.

Si vous aimez ce repository, laissez une étoile ⭐ et suivez moi et les contributeurs!

## Features

**183+** commandes et **12** différentes catégories!

  * **alt detector:** Bloque les comptes alternatifs
  * **applications:** Gères les applications de modération
  * **config:** Configurez les paramètres du serveur
  * **utility:** Commandes misc.
  * **economy:** Incomplet
  * **fun:** Des commandes drôles et amusantes
  * **images:** Commandes de manipulation d'images
  * **information:** Commandes d'information
  * **moderation:** Commandes de modération pour le serveur
  * **nsfw:** 👀
  * **reaction roles:** Roles de réaction
  * **tickets:** Tickets pour le support

Pogy possède les features suivants sur le site web

  * **Transcripts de Tickets** + **Transcripts d'Applications**
  * Page de **Contact & Signalement**
  * **Messages de Bienvenue** et **Messages de Départ** incluants des embeds.
  * **Logging** et **Moderation** complètements configurables
  * **Suggestions** et **Signalements** complètements configurables
  * **Premium system** inclue
  * Maintenance inclue
  * Page de membres
  * *Auto Mod*, Niveaux, et Commandes (pas terminées)
  * Top.gg API inclue
 
 <h1 align="center">
  <a href="https://github.com/peterhanania"><img src="https://i.imgur.com/On7mMNg.jpg["></a>
</h1>

  
 **Webhooks: (pour les développeurs)**
 Avec Pogy vous pouvez *logger* tout ce que vous voulez avec des Webhooks (vous devrez changez les webhooks avec un éditeur de texte).

<h1 align="center">
  <a href="https://github.com/peterhanania"><img src="https://i.imgur.com/vbGuLdL.jpg"></a>
</h1>


## Installation

Premièrement, cloner le repo:
```
git clone https://github.com/peterhanania/Pogy.git
```
Après l'avoir cloné, roulez cela:
```
npm install
```

## Configuration

Votre fichier `config.json` devrait ressembler à ça:
```
{
  "main_token": process.env.token, 
  "mongodb_url": "", //mongo db URL
  "developers": ["", ""], //developers ID
  "datadogApiKey": "", // for statistics (optional)
  "dashboard":"false", 
  "prefix":"p!", //prefix
  "arc":"",//arc.io source (optional)
  "youtube_key":"", //youtube api key from https://console.cloud.google.com/apis/
  "cat_api_key":"",// https://thecatapi.com/signup
  "webhook_id":"", //read config.json
  "webhook_url":"" //read config.json
}

```

Votre fichier `config.js` devrait ressembler à ça:
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
 "secret":""// bot client secret for auth

}
```
Votre fichier `.env` devrait ressembler à ça:
```
TOKEN=BOT_TOKEN
```

### Pour la configuration du dashboard, lisez: https://github.com/IgorKowalczyk/majobot

***Callbacks dans le Dev Portal***:**
`https://domain/callback`
`https://domain/window`
`https://domain/thanks`

Assurez vous d'avoir activé `Privileged Intents` sur votre [Portail](https://discordapp.com/developers/applications/). Vous pouvez trouver ces permissions sous la section "Bot", il y a deux boutons à activer. Pour plus d'information sur les *Gateway Intents*, [cliquez ici](https://discordjs.guide/popular-topics/intents.html#the-intents-bit-field-wrapper).

Vous pouvez démarrer le bot avec `node shard.js` 

**Note Importante**: Pogy à beaucoup de bugs et demande une connaissance approfondie du Node.js. Vous aurez de la difficulté à faire fonctionner le bot sans connaissances de Discord.js.

### Emojis 
- Vous pouvez changer les émojis dans: <br>
1- `assets/emojis.json` <br>
2- `data/emoji.js`

### Colors

- Vous pouvez changer les couleurs dans `data/colors.js`

## License

Rendu public sou la license [Apache](http://www.apache.org/licenses/LICENSE-2.0).

## Donations

Vous pouvez faire une donation pour rendre Pogy encore plus fort [en cliquant ici](https://paypal.me/pogybot)!

## Crédits

* **Peter Hanania** - *Développeur en chef* - [github](https://github.com/peterhanania)
* **Wlegit** - *Développeur*  - [github](https://github.com/wlegit)
* **Slayer** - *Contributeur - Gérant de commandes* [github](https://github.com/GhostSlayer)
* **Ace** - *Contributeur - Builder d'embeds* [github](https://github.com/Glitchii)
* **Majo** - *Paneau de Contrôle + CSS* - [github](https://github.com/IgorKowalczyk/)
* **loom** - *Contributor + Traduction* - [github](https://github.com/loom4k/)
* **Mezo** - *German Translation* - [github](https://github.com/mezotv/) [website](https://devdominik.com)
* **Janisky** - *Spanish Translation (README)* - [github](https://github.com/Janisky/)
