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
  name: "unmute",
  description: "unmutes the idiots",
 async execute(message,args,Discord,database) {
    if(!message.member.hasPermission('KICK_MEMBERS')) {message.reply('You must have the permission `KICK_MEMBERS`.'); return message.delete()}
        
        if(!args[0]) return message.channel.send('something went wrong uh oh')
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
    return message.reply('bro you need a user to mute idiot')
  }

  const muterole = message.guild.roles.cache.find(role => role.name === "Muted");
            if(!muterole) return message.reply("I couldn't find the mute role!");
              if(await getData(`Guild-${message.guild.id}-IsMuted-${mentionmember.id}`,database) == null){
    return message.reply("bro this dude isn't muted")
  }
  if(!mentionmember.roles.cache.some(role => role.name === 'Muted')) return message.reply("This user is not muted!");
            const messageurl = await getData(`Guild-${message.guild.id}-MuteMessage-${mentionmember.id}`,database) 
            const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Moderation')
            .setDescription("New Unmute!")
            .addFields(
                { name: 'Offender', value: `<@${mentionmember.id}>` },
                { name: "Sender:", value: `<@${message.member.id}>` },
                {name: "Message URL:", value: `${messageurl}`}
            )
            .setTimestamp()
            .setColor('ff0000');
            
            mentionmember.roles.remove(muterole,`Unmuted by ${message.member.user.tag}`)
             removeData(`Guild-${message.channel.guild.id}-IsMuted-${mentionmember.id}`,database)
            console.log(`Unmuted ${mentionmember.user.tag}`)
            message.channel.send(`Successfully unmuted <@${mentionmember.id}>.`).then(msg=>{
              msg.delete(10000)
            })
            message.delete()
            removeData(`Guild-${message.guild.id}-MuteMessage-${mentionmember.id}`,database)
            const channel = message.guild.channels.cache.find(channel => channel.id == "776238619588689950")
            if(channel){
            channel.send(exampleEmbed)
            
            }
 }
}