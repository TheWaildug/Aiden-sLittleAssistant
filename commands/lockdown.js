const Discord = require("discord.js")
module.exports = {
    name: "lockdown",
    description: "locks all channels",
    execute(message,args){
        console.log("lockdown command sent.");

        const channels = message.guild.channels.cache.filter(c => c.type == "text");
    
        var i;
        var e = "";
        for (i = 0; i < args.length; i++) {
          if (i >= "0") {
            e = e + args[i] + " ";
          }
        }
        args[1] = e;
    
        console.log(args[1]);
        const everyone = message.guild.roles.cache.find(
          r => r.name === "@everyone"
        );
        if (!args[1]) {
          args[1] = "This channel has been locked. You cannot chat here.";
        }
    
        channels.forEach(channel => {
          var cont = true;
          let canchat = channel.permissionsFor(everyone).serialize();
          if (canchat.SEND_MESSAGES == false) {
            cont = false;
          }
          if (cont != true) {
            return;
          }
          console.log("idk man");
    
          channel
            .updateOverwrite(
              everyone,
              {
                SEND_MESSAGES: false
              },
              `This has been changed by ${message.member.user.tag} with the !lockdown command.`
            )
            .catch(error => {
              console.warn("Error " + error);
              cont = false;
              return message.reply("Something went wrong! `" + error + "`");
            })
            .then(() => {
              console.log("Successfully locked the channel " + channel.name);
              const embed = new Discord.MessageEmbed()
                .setTitle("This channel has been locked.")
                .setColor(FF000)
                .setDescription(args[1]);
              channel.send(embed);
            });
        });
    }
}