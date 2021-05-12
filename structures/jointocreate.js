const Vc = require('../database/schemas/tempvc');
const Logging = require('../database/schemas/logging');
const jointocreatemap = new Map();
module.exports = function (client) {


    client.on("voiceStateUpdate", async(oldState, newState) => {


if(!oldState || !newState) return;





  let oldparentname = "unknown"
  let oldchannelname = "unknown"
  let oldchanelid = "unknown"
  if (oldState && oldState.channel && oldState.channel.parent && oldState.channel.parent.name) oldparentname = oldState.channel.parent.name
  if (oldState && oldState.channel && oldState.channel.name) oldchannelname = oldState.channel.name
  if (oldState && oldState.channelID) oldchanelid = oldState.channelID
  let newparentname = "unknown"
  let newchannelname = "unknown"
  let newchanelid = "unknown"
  if (newState && newState.channel && newState.channel.parent && newState.channel.parent.name) newparentname = newState.channel.parent.name
  if (newState && newState.channel && newState.channel.name) newchannelname = newState.channel.name
  if (newState && newState.channelID) newchanelid = newState.channelID
  if (oldState.channelID && oldState.channel) {
      if (typeof oldState.channel.parent !== "undefined")  oldChannelName = `${oldparentname}\n\t**${oldchannelname}**\n*${oldchanelid}*`
       else  oldChannelName = `-\n\t**${oldparentname}**\n*${oldchanelid}*`
  }
  if (newState.channelID && newState.channel) {
      if (typeof newState.channel.parent !== "undefined") newChannelName = `${newparentname}\n\t**${newchannelname}**\n*${newchanelid}*`
      else newChannelName = `-\n\t**${newchannelname}**\n*${newchanelid}*`
  }

 const vcDB = await Vc.findOne({
        guildId: oldState.guild.id || newState.guild.id
		})


  if(!vcDB) return;


  let voice = vcDB.channelID;
  
  let category = vcDB.categoryID;



  if(!voice || !category ) return;


  
  if (!oldState.channelID && newState.channelID) {
    if(newState.channelID !== voice) return;  
    jointocreatechannel(newState);   
  }
  
  if (oldState.channelID && !newState.channelID) {
            
          if (jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`)) {
            
            var vc = oldState.guild.channels.cache.get(jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`));
            
            if (vc.members.size < 1) { 
              
              jointocreatemap.delete(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`); 
              
            
              
              return vc.delete().catch(() => {})
          }
            else {
            }
          }
  }
  
  if (oldState.channelID && newState.channelID) {
  
    if (oldState.channelID !== newState.channelID) {
      
      if(newState.channelID=== voice) 
      
      jointocreatechannel(oldState);  
      
      if (jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`)) {
        
        var vc = oldState.guild.channels.cache.get(jointocreatemap.get(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`));
        
        if (vc.members.size < 1) { 
          
          jointocreatemap.delete(`tempvoicechannel_${oldState.guild.id}_${oldState.channelID}`); 
          
         
        
          return vc.delete().catch(() => {})
      }
      else {
      }
      }
    }
}
  })
    async function jointocreatechannel(user) {
        try {
           const vcDB = await Vc.findOne({
             guildId: user.guild.id
		       })
           if(!vcDB) return;

        let category = vcDB.categoryID
        if(!category ) return;
    
      
      await user.guild.channels.create(`${user.member.user.username}'s Room`, {
        type: 'voice',
        parent: category, 
      }).then(async vc => {



        user.setChannel(vc).catch(() => {})

        jointocreatemap.set(`tempvoicechannel_${vc.guild.id}_${vc.id}`, vc.id);

        await vc.overwritePermissions([
          {
            id: user.id,
            allow: ['MANAGE_CHANNELS'],
          },
          {
            id: user.guild.id,
            allow: ['VIEW_CHANNEL'],
          },
        ]);
      })
    } catch (err) {

      let vcDB = await Vc.findOne({
             guildId: user.guild.id
		       })

           vcDB.updateOne({
            channelID: null,
            categoryID: null
          }).catch(err => console.error(err));
      }
    }
}


