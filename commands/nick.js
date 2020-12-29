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
          var i;
          var e = "";
          var reason = "";
          var contrea = false;
          for (i = 0; i < args.length; i++) {
            console.log(args[i]);
            if (contrea == true) {
              reason = reason + " " + args[i];
            }
            if (args[i].toLowerCase() == "reason:") {
              contrea = true;
            }
            if (i >= "1" && contrea == false) {
              e = e + args[i] + " ";
            }
          }
          e = e.replace(" ","")
          reason = reason.replace(" ","")
          args[1] = e;
          args[2] = reason;
          console.log(reason);
          console.log(args[1]);
          if (!args[2]) {
            args[2] = "Nickname Change by " + message.member.user.tag + ".";
          }
          if (!args[1]) {
            message.reply("Please have a nickname!");
            return;
          }
        
          var oldnick = mentionMember.displayName;
          mentionMember
            .setNickname(args[1], args[2] + " Changer: " + message.member.user.tag)
            .catch(error => {
              console.warn("Error " + error);
              cont = false;
              return message.reply("Something went wrong! `" + error + "`");
            })
            .then(() => {
              if (cont === true) {
                message.reply(
                  " Successfully changed <@" +
                  mentionMember +
                  "> 's name from `" +
                  oldnick +
                  "` to `" +
                  args[1] +
                  " ` with the reason: `" +
                  args[2] +
                  "`"
                );
                mentionMember
                  .send(
                    ` Your nickname in ${message.channel.guild}` +
                    " has been changed from `" +
                    oldnick +
                    "` to `" +
                    args[1] +
                    " ` with the reason: `" +
                    args[2] +
                    "`"
                  )
                  .catch(() =>
                    console.warn(`I cannot send a DM to ${memberto.user.tag}.`)
                  );
                  message.delete()
              }
            });
    }
}