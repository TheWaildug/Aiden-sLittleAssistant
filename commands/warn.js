

async function setData(key,data,database){
  await database.set(key,data);
  return
}
async function removeData(key,database){
  console.log('remove data')
  database.delete(key).then(() => {
    console.log(`Successfully removed the key ${key}`)
    return  })
}

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
  name: "warn",
  description: "warn the idiots",
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
    return message.reply('bro you need a user to warn')
  }
  if(mentionmember.user.bot){
    return message.reply(`why would you warn a bot idiot.`)
  }
 if (
    mentionmember.roles.highest.position >= message.member.roles.highest.position
  ) {
    console.log("higher");
    return message.reply("This user has an equal or higher role.");
  }
   let reason =  message.content.split(" ").slice(2).join(" ")
 
  args[1] = reason
  if(!reason){
    return message.reply("duude I need a reason.")
  }
  console.log(reason)
  const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Moderation')
            .setDescription("New Warn!")
            .addFields(
                { name: 'Offender', value: `<@${mentionmember.id}>` },
                { name: "Sender:", value: `<@${message.member.id}>` },
                { name: 'Reason: ', value: `${args[1]}`},   
            )
            .setTimestamp()
            .setColor('ff0000');
  const warnings = await getData(`Guild-${message.guild.id}-Warnings-${mentionmember.id}`,database)
  console.log(warnings)
  if(warnings == null){
    console.log('no warnings')
    setData(`Guild-${message.guild.id}-Warnings-${mentionmember.id}`,'1',database)
    setData(`Guild-${message.guild.id}-Warning1-${mentionmember.id}`,reason,database)
    message.reply('Successfully warned <@' + mentionmember.id + ">." )
    const channel = message.guild.channels.cache.find(channel => channel.id == "776238619588689950")
            if(channel){
            channel.send(exampleEmbed)
            }
  }else if(warnings != null){
    console.log('already 1 warning')
    const newwarn = warnings + 1
     setData(`Guild-${message.guild.id}-Warnings-${mentionmember.id}`,newwarn,database)
    setData(`Guild-${message.guild.id}-Warning${newwarn}-${mentionmember.id}`,reason,database)
    message.reply('Successfully warned <@' + mentionmember.id + ">." )
     const channel = message.guild.channels.cache.find(channel => channel.id == "776238619588689950")
            if(channel){
            channel.send(exampleEmbed)
            }
  }
  }
}