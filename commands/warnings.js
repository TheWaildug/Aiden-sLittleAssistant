async function getData(key,database){
  console.log('get data')
  const data = await database.get(key)
  console.log(data)
  return data
}
async function GetMember(guild, id) {
  let member = await guild.members.fetch(id).catch(console.log)
  if(member){
    return true
  }
  return false
}
async function getmemboo(guild,id){
  const member = await guild.members.fetch(id).catch(console.log)
  if(member){
    return member
  }
}
module.exports = {
  name: "warnings",
  description: "views those idiot's warnings",
 async execute(message,args,Discord,database) {
  
   if(!message.member.hasPermission('KICK_MEMBERS')) {message.reply('You must have the permission `KICK_MEMBERS`.'); return message.delete()}
     if(!args[0]){
       return message.reply('uh oh spaghettios')
     }
       var cont = true;
  var memberto, mentionmember;
  //If user dont mention a member, that show him this error msg
  if (message.mentions.members.first()) {
    mentionmember = memberto = message.mentions.members.first();
  } else if (!message.mentions.members.first()) {
    console.log(args[0]);
    mentionmember = memberto =  await getmemboo(
      message.channel.guild,
      args[0]
    ).catch(error => {
      console.warn("Error " + error);
      cont = false;
      return message.reply("Something went wrong! `" + error + "`");
    });
  }
  if(cont != true){
    return;
  }
  if(!mentionmember){
    return message.reply('bro you need a user to view warnings')
  }
 
  const warnings = await getData(`Guild-${message.guild.id}-Warnings-${mentionmember.id}`,database)
  console.log(warnings)
  if(warnings == null){
    console.log('no warnings')
    return message.reply("this user has no warnings!")
  }else if(warnings != null){
    console.log('already 1 warning')
    const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Moderation')
            .setDescription(`${warnings} warnings for <@${mentionmember.id}>.`)
            .setTimestamp()
            .setColor('ff0000')
     for (i = 1; i <= warnings.length; i++){
  let warning = await getData(`Guild-${message.guild.id}-Warning${i}-${mentionmember.id}`,database)
     console.log(warnings + warning)
  exampleEmbed.addField(`Warning #${i}`, warning)
}message.channel.send(exampleEmbed)       
  }
  }
} 