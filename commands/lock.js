const Discord = require("discord.js")
module.exports = {
    name: "lock",
    description: "locks channels",
    async execute(message,args){
        if(!message.member.hasPermission(`MANAGE_CHANNELS`)){
            return message.delete();
        }
        let oh = false
        if(!args[0]){
          args[0] = message.channel.id
          oh = true
        }else if(!args[0].startsWith("<#")){
          oh = true
          args[0] = message.channel.id
        }
        let channel;

        let cont = true;
        if (message.mentions.channels.first()) {
          channel = message.mentions.channels.first();
        } else {
          channel = message.channel.guild.channels.cache.find(
            r => r.id === args[0]
          );
        }
        if (!channel) {
          message.reply("please # a channel or enter its ID .");
          cont = false;
        }
        if (cont == false) {
          return;
        }
        console.log(channel.name);

   let e = " "
    if(oh == false){
      if(args[1]){
          e = "Reason: " + message.content.split(" ").slice(2).join(" ")
      }
    }else if(oh == true){
      if(args[0]){
 e = "Reason: " + message.content.split(" ").slice(1).join(" ")
      }
  
    }
    
    if(e == "Reason: "){
      e = " "
    }
        
        args[1] = e;
        let yes = false;
        console.log(args[1]);
        const everyone = message.guild.roles.cache.find(
          r => r.name === "@everyone"
        );
        
        let canchat = channel.permissionsFor(everyone).serialize();
        console.log(canchat.SEND_MESSAGES)
        if (canchat.SEND_MESSAGES == false) {
          yes = false;
          cont = false;
          return message.reply("They already can't chat here.");
        }
        
        const perms = message.member.permissionsIn(channel).toArray();
    
        perms.forEach(function(item, index, array) {
          
          if (item === "MANAGE_CHANNELS") {
            console.log("idk man");
            yes = true;
            const everyone = message.channel.guild.roles.cache.find(
              r => r.name === "@everyone"
            );
            channel
              .updateOverwrite(
                everyone,
                {
                  SEND_MESSAGES: false
                },
                `This has been changed by ${message.member.user.tag}`
              )
              .catch(error => {
                console.warn("Error " + error);
                cont = false;
                return message.reply("Something went wrong! `" + error + "`");
              })
              .then(() => {
                
                const embed = new Discord.MessageEmbed()
                  .setTitle("This channel has been locked by a staff member.")
                  .setColor("FF0000")
                  .setDescription(`This channel has been locked. You cannot chat here. ${args[1]}`)
                    .setFooter(`Locked by ${message.author.tag}`)
                  .setTimestamp()
                channel.send(embed);
                message.delete()
              });
          }
        });
        if (yes === false) {
          return message.reply("dude you cannot do this!");
        }
    }
}