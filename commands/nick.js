async function GetMember(guild, id) {
  let member = await guild.members.fetch(id);
  return member;
}
module.exports = {
  name: "nick",
  description: "changes nickname",
 async execute(message,args){
      if (!args[0]) {
          return message.channel.send("Uh oh. That didn't work!");
        }
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
        if (cont != true) {
          return;
        }
        var member = false;
        console.log(memberto.user.tag);
        if (!memberto) {
          return message.reply("please @ a user or their id.");
        }
        if (memberto.id == message.member.id) {
          member = true;
          console.log("this man is trying to change his own nickname! man.");
        }
        if (
          memberto.roles.highest.position >= message.member.roles.highest.position &&
          member == false
        ) {
          console.log("higher");
          return message.reply("This user has an equal or higher role.");
        }
        let nick = message.content.split(" ").slice(2).join(" ")

        if (nick == "") {
          nick = mentionMember.user.username
          mentionMember
          .setNickname(nick,"Changer: " + message.member.user.tag)
          .catch(error => {
            console.warn("Error " + error);
            cont = false;
            return message.reply("Something went wrong! `" + error + "`");
          })
          .then(() => {
            if (cont === true) {
              message.reply(
                "Successfully reset <@" +
                mentionMember +
                ">'s name")
                
            }
          });
          return;
        }
      
        var oldnick = mentionMember.displayName;
        mentionMember
          .setNickname(nick," Changer: " + message.member.user.tag)
          .catch(error => {
            console.warn("Error " + error);
            cont = false;
            return message.reply("Something went wrong! `" + error + "`");
          })
          .then(() => {
            if (cont === true) {
              message.reply(
                "Successfully changed <@" +
                mentionMember +
                ">'s name from `" +
                oldnick +
                "` to `" +
                nick +
                "`"
              );
              
                
            }
          });
  }
}