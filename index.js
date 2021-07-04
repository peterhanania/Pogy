const PogyClient = require("./Pogy");
const config = require("./config.json");
const domain = require("./config.js");


const Pogy = new PogyClient(config);

const color = require("./data/colors");
Pogy.color = color;

Pogy.domain = domain.domain || `https://pogy.xyz`;

const emoji = require("./data/emoji");
Pogy.emoji = emoji;

let client = Pogy
const jointocreate = require("./structures/jointocreate");
jointocreate(client);

Pogy.react = new Map()
Pogy.fetchforguild = new Map()
 if(client.shard.ids - 1 + 2 === 1){
    if(config.dashboard === "true"){
        const Dashboard = require("./dashboard/dashboard");
        Dashboard(client); 
    }
 }

        
Pogy.start();









  
