<h1 align="center">
 <br>
  <a href="https://github.com/peterhanania"><img src="https://pogy.xyz/thumb.png"></a>
  <br>
  Pogy el Discord Bot [ Discord.js v12 ]
  <br>
</h1>

<h3 align=center>¡Un bot totalmente personalizable creado con 183 comandos, 12 categorías y un tablero de configuración!</h3>


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
  <a href="#sobre">Sobre</a>
  •
  <a href="#características">Características</a>
  •
  <a href="#instalación">Instalación</a>
  •
  <a href="#configuración">Configuración</a>
  •
  <a href="#licencia">Licencia</a>
  •
  <a href="#donar">Donar</a>
  •
  <a href="#créditos">Créditos</a>
</p>

## Sobre

Pogy es un bot de Discord que tomó más de 4 meses de trabajo para hacer. Decidí hacer que el bot sea de código abierto para quien quiera ejecutar una copia en su servidor.! Puede hacer clic [aquí](https://pogy.xyz/invite) para invitar al Bot oficial! Además, puedes unirte al [servidor de soporte oficial](https://pogy.xyz/support) (Ingles) para asistencia.

Si te gusta este repositorio, no dudes en dejar una estrella ⭐ y seguirme, en realidad significa mucho.

## Características

Mas de **183** comandos y **12** diferentes categorias!

  * **alt detector:** Bloquea alts del servidor
  * **applications:** Administrar las aplicaciones desde el sitio web
  * **config:** Configura los ajustes del servidor
  * **utility:** Algunos comandos de utilidad
  * **economy:** Iniciado pero no terminado
  * **fun:** Un montón de comandos para mantener tu servidor activo
  * **images:** Comandos de imagenes
  * **information:** Comandos de información
  * **moderation:** Comandos de moderación para moderar tu servidor de discordia
  * **nsfw:** 👀
  * **reaction roles:** Roles de reacción
  * **tickets:** Sistema de tickets en el servidor para soporte

Pogy incluso tiene las siguientes características en el sitio web

  * **Transcripciones de tickets** + **Transcripciones de aplicación**
  * **Contacto e informe** page
  * **Mensajes de bienvenida** y **mensajes de despedida** incluyendo incrustaciones (Embed).
  * **Registros** y **moderación** totalmente personalizables
  * **Sugerencias** e **Informes de servidor** totalmente personalizables
  * Un **sistema Premium** integrado
  * Un modo de mantenimiento incorporado
  * Una página de miembros
  * Auto Mod, Nivelado y Comandos (no hecho)
  * API TOP.gg integrada
 
 <h1 align="center">
  <a href="https://github.com/peterhanania"><img src="https://i.imgur.com/On7mMNg.jpg["></a>
</h1>

  
**Webhooks: (para desarrolladores)**
Con Pogy, incluso puede registrar todo usando webhooks. (tendrá que cambiar cada webhook usando visual studio code o tu editor de texto preferido)

<h1 align="center">
  <a href="https://github.com/peterhanania"><img src="https://i.imgur.com/vbGuLdL.jpg"></a>
</h1>

## Instalación

Primero clona el repositorio:
```
git clone https://github.com/peterhanania/Pogy.git
```
Después de la clonación, ejecute el siguiente comando:
```
npm install
```


## configuración

Tu `config.json` debería verse así:
```
{
  "main_token": process.env.token, 
  "mongodb_url": "", // Mongo DB URL
  "developers": ["", ""], // ID de los desarrolladores
  "datadogApiKey": "", // Para estadísticas (opcional)
  "dashboard": "false", 
  "prefix": "p!", // Prefix
  "arc": "", // Arc.io Source (opcional)
  "youtube_key": "", // Clave api de youtube de https://console.cloud.google.com/apis/
  "cat_api_key": "",// https://thecatapi.com/signup
  "webhook_id": "", // Leer config.json
  "webhook_url": "" // Leer config.json
}

```

Tu `config.js` debería verse así:
```
module.exports = {
 "verification": "",
 "description": "", // Descripción
 "domain": "", // domain
 "google_analitics": "", // Google Analitics
 "token": process.env.TOKEN,
 "https":"https://", // Dejalo como está
 "port":"5003",
 "client_id":"", // ID de cliente
 "secret":""// Secreto del cliente para la autenticación

}
```
Tu archivo `.env` debe de tener lo siguiente:
```
TOKEN=BOT_TOKEN
```

### Para configurar el tablero de configuración, lea https://github.com/IgorKowalczyk/majo.exe#-self-hosting-dashboard

**Devoluciones de llamada en Auth Dev Portal:**
`https://domain/callback`
`https://domain/window`
`https://domain/thanks`

Por favor, asegúrese de haber habilitado `Privileged Intents` en tu portal de [desarrollador de Discord](https://discordapp.com/developers/applications/). Puede encontrar estos intentos en la sección "Bot", y hay dos marcas que debe activar. Para obtener más información sobre Gateway Intents, consulta [este enlace](https://discordjs.guide/popular-topics/intents.html#the-intents-bit-field-wrapper).

Puedes lanzar el bot con `npm run start` (asegúrese de tener node y npm instalados).

**Nota IMPORTANTE:** Pogy tiene muchos errores y requiere mucho conocimiento de js. Tendrá algunas dificultades para ejecutar el bot si no tiene experiencia en discord.js. 

### Emojis 
- Puedes cambiar los emojis en: <br>
1- `assets/emojis.json` <br>
2- `data/emoji.js`

### Colores
- Puedes cambiar los colores en `data/colors.js`

## Licencia
Publicado bajo la licencia [Apache License](http://www.apache.org/licenses/LICENSE-2.0)

## Donar
Puedes donar a Pogy y hacerlo más fuerte que nunca [haciendo clic aquí](https://paypal.me/pogybot)!

## Créditos
* **Peter Hanania** - *Desarrollador principal* - [github](https://github.com/peterhanania)
* **Wlegit** - *Desarrollador*  - [github](https://github.com/wlegit)
* **Slayer** - *Colaborador - Base del controlador de comandos* [github](https://github.com/GhostSlayer)
* **Ace** - *Colaborador - Embed builder* [github](https://github.com/Glitchii)
* **Majo** - *Tablero base + css* - [github](https://github.com/IgorKowalczyk/)
* **loom** - *Colaborador + Traducción* - [github](https://github.com/loom4k/) [website](https://loom4k.me)
* **Mezo** - *Traducción al alemán* - [github](https://github.com/mezotv/) [website](https://devdominik.com)
* **Janisky** - *Traducción al español (README)* - [github](https://github.com/Janisky/)
