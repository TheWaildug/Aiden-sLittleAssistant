const fetch = require("node-fetch")
const Discord = require("discord.js")
async function GetMember(guild, id) {
    let member = await guild.members.fetch(id);
    return member;
  }
module.exports = {
    name: "dm",
    description: "dms people",
    async execute(message,args){
        if(!message.member.hasPermission(`MANAGE_MESSAGES`)){
            return message.reply("You must have the permission `MANAGE_MESSAGES`")
        }
        if(!args[0]) return message.reply('whoops something went wrong!')
     

   
  


        //Check if your bot can`t kick this user, so that show this error msg
    var cont = true;
      var memberto, mentionMember;
      //If user dont mention a member, that show him this error msg
      if (message.mentions.members.first()) {
        mentionMember = memberto = message.mentions.members.first();
      } else if (!message.mentions.members.first()) {
        console.log(args[0]);
        mentionMember = memberto = await GetMember(
          message.channel.guild,
          args[0]
        ).catch(error => {
          console.warn("Error " + error);
          cont = false;
          return message.reply("Something went wrong! `" + error + "`");
        });
      }
          
              if(message.attachments.size > 0){
            console.log('attach')
    
          message.attachments.forEach(att => {
            console.log(att.url)
            mentionMember.send({files: [att.url]}).catch((error) => {
      console.warn("Error " + error);
      cont = false
      return message.reply("Something went wrong! `" + error + "`")
    }).then(() => {
      if(cont === true){
         
              
              if(message.attachments.size > 0){
            console.log('attach')
          
         
          const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Utility')
                .setDescription("New DM!")
                .addFields(
                    { name: 'User', value: `<@${mentionMember.id}>` },
                    { name: "Sender:", value: `<@${message.member.id}>` },
               
                )
                .setTimestamp();
          
         var peerams = {
             "username": "DM LOGS", // the name of the webhook
        "avatar_url": "https://cdn.discordapp.com/avatars/755537335327916114/52aa8f1b411a325a137274327bf2ed8f.png?size=512",
        "content": `New dm to <@${mentionMember.id}>`,
      "embeds": [exampleEmbed
    ]
    
        }
                 message.attachments.forEach(att => {
            console.log(att.url)
            var params = {
        "username": "DM LOGS", // the name of the webhook
        "avatar_url": "https://cdn.discordapp.com/avatars/755537335327916114/52aa8f1b411a325a137274327bf2ed8f.png?size=512",
        "content": `New attachment to <@${mentionMember.id}>`,
      "embeds": [{
        "image": {
          "url": att.url
        }
      }]
    }
          
         fetch(process.env.DMHOOK, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    
          })
        
                
            }
        console.log(`DMed ${mentionMember.displayName}  by ${message.member.displayName}. Message: ${att.url}`)
            
             message.channel.send(`Sucessfully DMed <@${mentionMember.id}>. Message: ${att.url}`)
     
            return;
      }
    })
          })
              }
          if(message.content){
              var contrea = false
      var msg = ""
      for (i = 0; i < args.length; i++) {
        console.log(args[i]);
        
        if(i != 0){
          contrea = true
        }
        if (contrea == true) {
          msg = msg + " " + args[i];
        }
      }
      args[1] = msg
      
        if(!msg){
            message.reply('Please have a message!');
            return;
        };
      console.log(msg)
        const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Utility')
                .setDescription("New DM!")
                .addFields(
                    { name: 'User', value: `<@${mentionMember.id}>` },
                    { name: "Sender:", value: `<@${message.member.id}>` },
                    { name: 'Message: ', value: `${args[1]}`},   
                )
                .setTimestamp();
          
         
         
         
            console.log('content')
        mentionMember.send(args[1]).catch((error) => {
      console.warn("Error " + error);
      cont = false
      return message.reply("Something went wrong! `" + error + "`") 
    }).then( () => {
      if(cont === true){
      
    var params = {
        "username": "DM LOGS", // the name of the webhook
        "avatar_url": "https://cdn.discordapp.com/avatars/755537335327916114/52aa8f1b411a325a137274327bf2ed8f.png?size=512",
    
      "embeds": [
        exampleEmbed
      ]
    }
          
         fetch(process.env.DMHOOK, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    
            console.log(`DMed ${mentionMember.id}  by ${message.member.displayName}. Message: ${args[1]}`)
            
            message.channel.send(`Sucessfully DMed <@${mentionMember.id}>. Message: ${args[1]}`)
     
            return;
      }
         })}
        
    }
}