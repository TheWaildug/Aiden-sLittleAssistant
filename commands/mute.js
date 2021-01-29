

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
  name: "mute",
  description: "mutes the idiots",
 async execute(message,args,Discord,database,ms) {
   
   if(!message.member.hasPermission('KICK_MEMBERS')) {message.reply('You must have the permission `KICK_MEMBERS`.'); return message.delete()}
        
        if(!args[0]) return message.channel.send('yeah sure I will mute invisible man.')

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
 if (
    mentionmember.roles.highest.position >= message.member.roles.highest.position
  ) {
    console.log("higher");
    return message.reply("This user has an equal or higher role.");
  }
    
  let reason = message.content.split(" ").slice(3).join(" ")
 
 let time 
 
  time = args[1]  
  if(!args[1]) return message.reply('bro I need some time (s = seconds, m = minutes, h = hours, etc.')
   if(!args[2]) message.reply('bro have a reason!')
  args[2] = reason;
  console.log("time " + time);
  console.log("reason " + args[2]);
           
            console.log(mentionmember.user.tag)  
            
            if(!mentionmember.kickable) return message.reply('This user cannot be muted!');
            const muterole = message.guild.roles.cache.find(role => role.name === "Muted");
            if(!muterole) return message.reply("I couldn't find the mute role!");
            const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Moderation')
            .setDescription("New Mute!")
            .addFields(
                { name: 'Offender', value: `<@${mentionmember.id}>` },
                { name: "Sender:", value: `<@${message.member.id}>` },
                { name: 'Reason: ', value: `${args[2]}`},   
                { name: 'Time: ', value: `${ms(ms(time), { long: true })}`},
                 
            )
            .setTimestamp()
            .setColor('ff0000');
            if(mentionmember.roles.cache.some(role => role.name === 'Muted')) return message.reply("This user is already muted!");
            mentionmember.roles.add(muterole,`Muted by ${message.member.user.tag} with the reason ${args[2]} for ${ms(ms(time), { long: true })}`)
            const release = Date.now() + ms(time)
            setData(`Guild-${message.channel.guild.id}-MuteMS-${mentionmember.id}`,String(release),database)
             setData(`Guild-${message.channel.guild.id}-IsMuted-${mentionmember.id}`,"true",database)   
            console.log(`Muted ${mentionmember.user.tag}for ${ms(ms(time), { long: true })} by ${message.member.user.tag} Reason: ${args[2]}`)
            message.channel.send(`Successfully muted <@${mentionmember.id}> for ${ms(ms(time), { long: true })}. Reason: ${args[2]}`).then(msg => {
              msg.delete({timeout: 10000})
            })
            message.delete()
            mentionmember.send(`You have been muted in ${message.guild.name} for ${ms(ms(time), { long: true })}. Reason: ${args[2]}`)
            const channel = message.guild.channels.cache.find(channel => channel.id == "776238619588689950")
            if(channel){
            channel.send(exampleEmbed).then(message =>{
              setData(`Guild-${message.guild.id}-MuteMessage-${mentionmember.id}`,message.url,database)
            })
            }
            
             
           
  
  }
}