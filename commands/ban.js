const roles = [ "766669582337048607",
  "752989243646935091",
  "754465847610834945",
  "752989064977973329",
  "752989064977973329",
  "752987817612935259",
  "765301827687415818",
  "762845223386087424",
  "753002528769310770"
]
function isbypasses(user) {
 for (var i = 0; i < roles.length; i++) {
  
   if(user.roles.cache.find(r => r.id == roles[i])){
     return true
   }
 }
 return false
}
module.exports = {
  name: "ban",
  description: "Bans people duh",
  execute(message,args){
    if (!args[0]) {
    return message.channel.send("Uh oh. That didn't work! Try again.");
  }
  let memberto, mentionMember;

  let cont = true;
  if (message.mentions.members.first()) {
    mentionMember = memberto = memberto = message.mentions.members.first();
  } else if (!message.mentions.members.first()) {
    console.log(args[0]);
    mentionMember = memberto = message.guild.members.cache.find(m => m.id == args[0])
  }
  console.log(mentionMember);
  if (!mentionMember) {
    return message.reply("Please specify a user or their id.");
  }
  if (cont != true) {
    return;
  }

  if (!memberto) {
    return message.reply("Something went wrong.");
  }
  if (memberto.id === message.member.id) {
    return message.reply("lol you can't ban yourself stupid");
  }
  if (memberto.bot) {
    return message.reply("lol, imagine trying to ban a bot");
  }
  if (
    mentionMember.roles.highest.position >=
    message.member.roles.highest.position
  ) {
    console.log("higher");
    return message.reply("This user has an equal or higher role.");
  }
  if (isbypasses(memberto) === true) {
    return message.reply(
      "I don't think this guy can be banned. They're like, Superman, or something."
    );
  }

  if (!memberto.bannable) {
    message.reply(
      "uh oh! I do not have the proper permissions to ban this user."
    );
    return;
  }
let e = message.content.split(" ").slice(2).join(" ")
 
  args[1] = e;
  console.log(args[1]);
  if (!args[1]) {
    message.reply("please contain a reason!");
    return;
  }
  mentionMember
    .send(
      `You have been banned from ${message.channel.guild}. Reason:` + "`" +
      args[1] + "`" + `
      If you'd like to appeal this ban, visit our Ban Appeals website page here. https://bit.ly/36dPGg5`
    )
    .catch(() =>
      console.log(`Uh oh! I can't send a DM to ${memberto.user.tag}.`)
    );
  memberto
    .ban({
      reason: `Ban by ${message.member.user.tag} | Reason: ` + args[1]
    })
    .catch(error => {
      console.warn("Error " + error);
      cont = false;
      return message.reply("Something went wrong! `" + error + "`");
    })
    .then(() =>{
      console.log(
        `We've just banned ${mentionMember.user.tag} with the reason ${
        args[1]
        } by ${message.member.user.tag}`
        
      ),
     message.delete()
     
  return message.channel.send(
    `We've just banned ${mentionMember} with the reason ` + "`" + args[1] + "`"
  ).then(msg =>{
    msg.delete({timeout: 10000})
  })
  });

  
  }
}