const Discord = require("discord.js")
const client = new Discord.Client();
const prefix = "!"
const fs = require("fs");
const fetch = require("node-fetch")
const ms = require("ms")

const topgg = require("@top-gg/sdk")
const userhook = process.env.userhook
const deletehook = process.env.deletehook
const redditFetch = require("reddit-fetch")
const dmrole = require("./values/dmrole")
const pings = require("./values/aidenping")
const servers = require("./values/lockservers")
const aidens = require('./values/aiden')
const quotes = require('./values/quotes')
const facts = require('./values/facts') 
const rules = require("./values/rules")
const roles = require('./values/roles')
const asked = require("./values/asked")
const slurs = require('./values/slurs')
const threats = require('./values/threats')
const swears = require('./values/swears')
const [faqQuestion, faqAnswer] = require('./values/faq')
const Database = require("@replit/database")
const db = new Database()
let on = false
client.Commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.Commands.set(command.name, command);
}
client.on("ready", async () => {
const status = await db.get("Status")
  console.log("I am ready Aiden!"); 
    client.user.setActivity(status, {
  type: "STREAMING",
  url: "https://www.twitch.tv/wainked"
});

})

function iscool(id){
  if(id === '366369929693233163'){
    return true
  }
  if(id === '432345618028036097'){
    return true
  }
  if(id == '717149032753004625'){
    return true
  }
  if(id == "745325943035396230"){
    return true
  }
  if(id == "737825820642639883"){
    return true
  }
  return false
}

async function GetMember(guild, id) {
  let member = await guild.members.fetch(id);
  return member;
}
function moderatenumber(){
   min = Math.ceil("1");
  max = Math.floor("9");
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive

}
function pingthingy() { // min and max included 
  return Math.floor(Math.random() * (2 - 1 + 1) + 1);
}
function invitechannel(id){
  if(id === "754401455724560527"){
    return true
  }
  if(id === "763898261089812500"){
    return true
  }
}
function isbypasses(user) {
 for (var i = 0; i < roles.length; i++) {
  
   if(user.roles.cache.find(r => r.id == roles[i])){
     return true
   }
 }
 return false
}
function canpingaiden(user) {
 for (var i = 0; i < pings.length; i++) {
  
   if(user.roles.cache.find(r => r.id == pings[i])){
     return true
   }
 }
 return false
}
async function IsMuted(user,guild){
  const muted = await db.get(`Guild-${guild}-IsMuted-${user}`)
  console.log(muted)
  if(muted != null){
    return true
  } else if(!muted == null){
    return false
  }
}


setInterval(async function(){
  
   const list = await db.getAll()
  const key = Object.keys(list)
  key.forEach(async function(item, index, array) {
    if(item.toString().includes(`Guild-752978800756916444-VoteMS`)){
      const value = Object.values(list)
      value.forEach(async function(iam,ide,arra){
        if(ide == index){
          if(Date.now() >= iam){
            const userid = item.toString().replace("Guild-752978800756916444-VoteMS-","")
            console.log(userid + " voting period is over.")
            const guild = await client.guilds.fetch("752978800756916444")
            
            if(guild){
            
              db.delete(`Guild-${guild.id}-VoteMS-${userid}`)
              const role = await guild.roles.fetch("806686361628704849")
              const user = guild.members.cache.find(r => r.id == userid)
              
              if(role && user){
                user.roles.remove(role,`12 Hour Voting Period Over.`)
                
              }
            }
          }
        }
      })
    }
    if(item.toString().includes(`Guild-752978800756916444-MuteMS-`)){
      const value = Object.values(list)
      value.forEach(async function(iam,ide,arra){
        if(ide == index){
          if(Date.now() >= iam){
            const userid = item.toString().replace(`Guild-752978800756916444-MuteMS-`,"")
            console.log("user should be unmuted")
            const guild = await client.guilds.fetch("752978800756916444")
            if(guild){
              db.delete(`Guild-752978800756916444-IsMuted-${userid}`)
              db.delete(`Guild-752978800756916444-MuteMS-${userid}`)
              let notsplit = await db.get(`Guild-752978800756916444-MuteMessage-${userid}`)
              
              console.log(notsplit)
                let message
                message = notsplit.split("/")
                console.log(message[6])

                const channel = await guild.channels.cache.find(c => c.id == message[5])  
                const embed = new Discord.MessageEmbed()
                .setTitle(`Moderation`)
                .setDescription(`New Unmute`)
                if(channel){
                  channel.send(`Auto Unmuted <@${userid}>. Message link: ${notsplit}`)
                }
                db.delete(`Guild-752978800756916444-MuteMessage-${userid}`)
                const user = await guild.members.cache.find(r => r.id == userid)
                if(user){
                  const role = await guild.roles.cache.find( r => r.id == "753027833936478278")
                  if(role){
                    user.roles.remove(role,`Auto Unmute`)
                  }
                }
            }
          }
        }
      })
  }})
},10000)


//imagine editing
client.on("messageUpdate", (oldMessage, message) => {
  if(oldMessage.guild == null){
  return;
}
const newmsg = message
const oldmsg = oldMessage
 if(newmsg.guild == null || oldmsg.guild == null || oldmsg.author.bot || newmsg.author.bot){
    return;
  }
  if(newmsg.deleted == true){
    return;
  }
  if(oldmsg.content && newmsg.content && oldmsg.content != newmsg.content){
    console.log(`${oldmsg.author.tag} just edited a message in ${oldmsg.channel.name}. Old Mesage: ${oldmsg.content}. New Message: ${newmsg.content}.`)
    const embed = new Discord.MessageEmbed()
    .setTitle(`Chat Logs`)
    .setDescription(`New Message Update.`)
    .setColor("FF0000")
    .addField(`Author:`,`<@${oldmsg.author.id}>`)
    .addField(`Channel:`,`<#${oldmsg.channel.id}>`)
    .addField(`Old Content:`,`${oldmsg.content}`)
    .addField(`New Content:`,`${newmsg.content}`)
    .addField(`Message URL:`,`${newmsg.url}`)
   var peerams = {
         "username": "CHAT LOGS", // the name of the webhook
    "avatar_url": "https://cdn.discordapp.com/attachments/752989732786667610/794283704447926332/image0.jpg",

  "embeds": [embed
]

    }
     fetch(deletehook, {
    method: "POST",
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(peerams)
})
  }
  
});

///imagine deleting
client.on("messageDelete", async message => {
if(message.guild == null){
  return;
}
if(message.author.bot){
  return;
}
  const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
  try{
    let user = ""
   
    if(entry){
      
       if (entry.extra.channel.id === message.channel.id
      && (entry.target.id === message.author.id)
      && (entry.createdTimestamp > (Date.now() - 5000))
      && (entry.extra.count >= 1)) {
    user = entry.executor
  } else{
    user = message.author
  }
    }else { 
    user = message.author
  }
 console.log(`A message deleted in the channel ${message.channel.name}, with the content ${message.content}, created by ${message.author.tag}, was deleted by ${user.tag}.`)
  const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Chat Logs')
            .setDescription("New Message Delete!")
            .addFields(
                { name: 'Sender:', value: `<@${message.author.id}>` },
                { name: "Channel:", value: `<#${message.channel.id}>` },
                {name: "Message:", value: `${message.content}`},
                {name: "Deleter:", value: `<@${user.id}>`}
           
            )
            .setTimestamp();
      
     var peerams = {
         "username": "CHAT LOGS", // the name of the webhook
    "avatar_url": "https://cdn.discordapp.com/attachments/752989732786667610/794283704447926332/image0.jpg",

  "embeds": [exampleEmbed
]

    }
     fetch(deletehook, {
    method: "POST",
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(peerams)
})
  }catch(error){
    console.log(`Deleted Message Error: ${error.message}`)
  }
 
})
///mentions
client.on("message",async message => {
   if(message.guild == null){
    return;
  }
 if (message.mentions.members) {
    if (message.mentions.members.first()) {
      let conti = true;
      
    if(message.author.bot){
        return;
    }
     console.log("mention thingy");
        console.log(message.channel.name)
      message.mentions.members.forEach(user => {
        if(!user){
        return;
      }
      if (on === true) {
        return;
      }
      if(message.author.bot){
        return;
      }
   
      if (message.author.bot && user.id === "366369929693233163") {
        console.log("this a bot boobie");
        conti = false;
        return;
      }

      if (isbypasses(message.member) === true) {
        console.log("this idiot has a coolio role");
        conti = false;
      }
       if (canpingaiden(message.member) === true) {
        console.log("this idiot has a coolio role");
        conti = false;
      }
        if (message.member.id === "366369929693233163") {
          console.log("bro this is aiden. I need his autograph");
          conti = false;
      }
     

     
     
      if (user.id === "366369929693233163" && conti === true) {
        console.log(message.member.user.tag);
        console.log(message.content)
        on = true;
        console.log("this stupid idiot got pinged");
        const embed = new Discord.MessageEmbed()
          .setTitle("You're not allowed to do that!")
          .setColor("FF0000")
          .setDescription(
            `You're not allowed to ping Aiden in chat. Continuing will result in a mute.`
          );
        message.channel.send(`<@${message.member.id}>`,embed);
       
        message.delete().then(() => {
          console.log("deleted");
        });
        return (on = false);
      }
      if(user){
        
 db.get(`Guild-${message.channel.guild.id}-IsAfk-${user.id}`).then(async afk => {
    if(afk != null){
     let afkms = await db.get(`Guild-${message.guild.id}-AfkMS-${user.id}`)
        afkms = Date.now() - afkms
        message.reply('`' + user.user.tag + '` has been AFK with the reason `' + afk + '`, '  + `for ${ms(afkms,  { long: true })}.`)
      }
      })
      }
     
      
      })
      
    }
  }


})
client.on("guildBanAdd",async (guild, user) => {
  
   const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 22,
	});
  const banlog = fetchedLogs.entries.first();
  if(!banlog){
    return console.log(`${user.tag} was banned and that's all we know.`)
  }
   let { executor, target } = banlog;
  
   console.log(`${executor.username}#${executor.discriminator} banned ${target.tag} with the reason ${reason}.`)
   const embed = new Discord.MessageEmbed()
    .setTitle(`GuildMember Update`)
    .setDescription(`User Banned`)
    .setColor("FF0000")
    .addField(`User`,`<@${target.id}>`)
    .addField(`Sender`,`<@${executor.id}>`)
    .addField(`Guild`,guild.id)
    .setTimestamp()
    var peerams = {
         "username": "USER LOGS", // the name of the webhook
    "avatar_url": "https://cdn.discordapp.com/attachments/752989732786667610/794283704447926332/image0.jpg",

  "embeds": [embed
  ]
    }
     fetch(userhook, {
    method: "POST",
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(peerams)
})
})
client.on("guildBanRemove",async (guild, user) => {
  
   const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 23,
	});
  const banlog = fetchedLogs.entries.first();
  if(!banlog){
    return console.log(`${user.tag} was unbanned and that's all we know.`)
  }
   let { executor, target } = banlog;

   console.log(`${executor.username}#${executor.discriminator} unbanned ${target.tag} with the reason ${reason}.`)
   
   const embed = new Discord.MessageEmbed()
    .setTitle(`GuildMember Update`)
    .setDescription(`User Unbanned`)
    .setColor("FF0000")
    .addField(`User`,`<@${target.id}>`)
    .addField(`Sender`,`<@${executor.id}>`)
    .addField(`Guild`,guild.id)
    .setTimestamp()
    var peerams = {
         "username": "USER LOGS", // the name of the webhook
    "avatar_url": "https://cdn.discordapp.com/attachments/752989732786667610/794283704447926332/image0.jpg",

  "embeds": [embed
  ]
    }
     fetch(userhook, {
    method: "POST",
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(peerams)
})
})
client.on("guildMemberUpdate",async (oldmember,newmember) => {

   const fetchedLogs = await oldmember.guild.fetchAuditLogs({
		limit: 1,
		type: 25,
	});
  const roleLog = fetchedLogs.entries.first();
  if(oldmember.roles.cache.size > newmember.roles.cache.size){
     if(!roleLog){return console.log(`${oldmember.user.tag} had a role removed but we don't know anything else.`)}
  let { executor, target, changes, reason } = roleLog;
     let removedRole = ''
  oldmember.roles.cache.forEach(function (value) {
    if (newmember.roles.cache.find(id => id == value.id) == null) {
      removedRole = value.name
    }
  })
  if(reason == null){
    reason = "None."
  }
  console.log(`${oldmember.user.tag} had ${removedRole} removed by ${executor.tag} with the reason ${reason}.`)
  const embed = new Discord.MessageEmbed()
    .setTitle(`GuildMember Update`)
    .setDescription(`Role Remove`)
    .setColor("FF0000")
    .addField(`User`,`<@${newmember.id}>`)
    .addField(`Role Removed`, removedRole)
    .addField(`Reason`,reason)
    .addField(`Changer`,`<@${executor.id}>`)
    .addField(`Guild`,newmember.guild.id)
     .setTimestamp()
    var peerams = {
         "username": "USER LOGS", // the name of the webhook
    "avatar_url": "https://cdn.discordapp.com/attachments/752989732786667610/794283704447926332/image0.jpg",

  "embeds": [embed
]

    }
     fetch(userhook, {
    method: "POST",
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(peerams)
})
  } 
   
 
  
})
///role added 
client.on("guildMemberUpdate",async (oldmember,newmember) => {
   const fetchedLogs = await oldmember.guild.fetchAuditLogs({
		limit: 1,
		type: 25,
	});
  const roleLog = fetchedLogs.entries.first();
  if(oldmember.roles.cache.size < newmember.roles.cache.size){
     if(!roleLog){return console.log(`${oldmember.user.tag} had a role added but we don't know anything else.`)}
  let { executor, target, changes, reason } = roleLog;
     let addedrole = ''
  newmember.roles.cache.forEach(function (value) {
    if (oldmember.roles.cache.find(id => id == value.id) == null) {
      addedrole = value.name
    }
  })
  if(reason == null){
    reason = "None."
  }
  console.log(`${oldmember.user.tag} had ${addedrole} added by ${executor.tag} with the reason ${reason}.`)
  const embed = new Discord.MessageEmbed()
    .setTitle(`GuildMember Update`)
    .setDescription(`Role Add`)
    .setColor("FF0000")
    .addField(`User`,`<@${newmember.id}>`)
    .addField(`Role Added`,addedrole)
    .addField(`Reason`,reason)
    .addField(`Changer`,`<@${executor.id}>`)
     .setTimestamp()
    var peerams = {
         "username": "USER LOGS", // the name of the webhook
    "avatar_url": "https://cdn.discordapp.com/attachments/752989732786667610/794283704447926332/image0.jpg",

  "embeds": [embed
]

    }
     fetch(userhook, {
    method: "POST",
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(peerams)
})
  } 
   
 
  
})
///username change
client.on("guildMemberUpdate", async (oldmember, newmember) => {
  if(oldmember.displayName != newmember.displayName){
    const fetchedLogs = await oldmember.guild.fetchAuditLogs({
		limit: 1,
		type: 24,
	});
  const nicklog = fetchedLogs.entries.first();
  let { executor, target, reason } = nicklog;
 if(reason == null){
   reason = "None."
 }
 if(reason == "AFK"){
   return;
 }
 if(reason == "Return from AFK"){
   return;
 }
    
  if(!nicklog){
   console.log(`${oldmember.user.tag}'s username was changed from ${oldmember.displayName} to ${newmember.displayName} by an unknown user`)
    const embed = new Discord.MessageEmbed()
    .setTitle(`GuildMember Update`)
    .setDescription(`Nickname Change`)
    .setColor("FF0000")
    .addField(`User`,`<@${newmember.id}>`)
    .addField(`Old Nickname`,oldmember.displayName)
    .addField(`New Nickname`,newmember.displayName)
     .setTimestamp()
    var peerams = {
         "username": "USER LOGS", // the name of the webhook
    "avatar_url": "https://cdn.discordapp.com/attachments/752989732786667610/794283704447926332/image0.jpg",

  "embeds": [embed
]

    }
     fetch(userhook, {
    method: "POST",
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(peerams)
})
  }
  console.log(`${oldmember.user.tag}'s username was changed from ${oldmember.displayName} to ${newmember.displayName} by ${executor.tag}`)
    const embed = new Discord.MessageEmbed()
    .setTitle(`GuildMember Update`)
    .setDescription(`Nickname Change`)
    .setColor("FF0000")
    .addField(`User`,`<@${newmember.id}>`)
    .addField(`Old Nickname`,oldmember.displayName)
    .addField(`New Nickname`,newmember.displayName)
    .addField("Reason",reason)
    .addField(`Changer`,`<@${executor.id}>`)
     .setTimestamp()
     var peerams = {
         "username": "USER LOGS", // the name of the webhook
    "avatar_url": "https://cdn.discordapp.com/attachments/752989732786667610/794283704447926332/image0.jpg",

  "embeds": [embed
]

    }
     fetch(userhook, {
    method: "POST",
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(peerams)
})
  }
})
//dad bot like thing
client.on("message",async message => {
   if(message.guild == null){
    return;
  }

const botuser = message.guild.members.cache.find(r => r.id == "772834188189630465")
  const args = message.content.split(" ")
  if((args[0].toLowerCase() == "i'm" || args[0].toLowerCase() == 'im') && (args[1])){
    if(message.mentions.members.first()){
      return message.reply("no, I'm not going to ping them.");
    }
      if(args.slice(1).join(' ').includes("@everyone") || args.slice(1).join(' ').includes("@here") ){
      return message.reply(`You can't make me ping everyone loser.`)
    }
                message.channel.send(`Hi, ${args.slice(1).join(' ')}, I'm ${botuser.displayName}!`);
        }
  
}) 
///more words cause bot not like workie
client.on("message",async message => {
  if(message.guild == null){
    return;
  }
  const args = message.content.split(" ")
 const msg = args.join("")
   for (var w = 0; w < slurs.length; w++) {
    if(msg.toLowerCase().replace(/[^a-zA-Z ]/g, "").includes(slurs[w])){
      if (isbypasses(message.member)) {
        return console.log("this dude is important");
      }
      
      console.log("this man said a naughty slur!");
      console.log(message.member.user.tag);
      console.log(slurs[w]);
      
      const embed = new Discord.MessageEmbed()
        .setTitle(`You're not allowed to say that!`)
        .setColor("FF0000")
        .setDescription(
          `Slurs are not allowed here. Your message has just been sent to Server Staff and will be acted upon shortly.`
        );
      message.channel.send(`<@${message.member.id}>`,embed);
 
      message.delete();
      break;
    }
  }
   for (let i = 0; i < args.length; i++) {

if(args[i]){
  if(args[i].toLowerCase() == "ok" || args[i].toLowerCase() == "k" || args[i].toLowerCase() == "okay"){

    message.react("🆗")
    

    
  }
    
 
  for (var w = 0; w < swears.length; w++) {
 
    if(msg.toLowerCase().replace(/[^a-zA-Z ]/g, "").includes(swears[w])){
         if(message.deleted == true){
        return;
      }
      if (isbypasses(message.member)) {
        return console.log("this dude is important");
      }
  console.log(msg)
      console.log("this man said a naughty swear!");
      console.log(message.member.user.tag);
      console.log(swears[w]);
      
      const embed = new Discord.MessageEmbed()
        .setTitle(`You're not allowed to say that!`)
        .setColor("FF0000")
        .setDescription(
          `NSFW or sexual references are not allowed here. Your message has just been sent to Server Staff and will be acted upon shortly.`
        );
      message.channel.send(`<@${message.member.id}>`,embed);
 
      message.delete();
      break;
    }
  }
}}
})
///Saying words
client.on("message", async message => {
  if(message.guild == null){
    return;
  }
  const args = message.content.split(" ")
 const msg = args.join("")
  if(msg.toLowerCase().replace(/[^a-zA-Z ]/g, "").includes("waildug")){
    if(!message.author.bot){
      console.log("boobug")
      console.log(message.channel.name)
      const boobbug = await message.guild.members.fetch("432345618028036097")
      message.channel.send(`this is to prevent unwanted pings to boobbug`).then(msg => {
        msg.edit(`You mean that annoying person ${boobbug}?`)
      })
    }
  }
  if(msg.toLowerCase().replace(/[^a-zA-Z ]/g, "").includes("evan")){
    if(!message.author.bot){
      console.log("evan")
      console.log(message.channel.name)
        message.channel.send(`Can y'all like shut the fuck up?`)
    }
  }
   if(msg.toLowerCase().replace(/[^a-zA-Z ]/g, "").includes("ansh")){
    if(!message.author.bot){
      console.log("ansh")
      console.log(message.channel.name)
      const ansh = await message.guild.members.fetch("717149032753004625")
      message.channel.send(`this is to prevent unwanted pings to ansh`).then(msg => {
        msg.edit(`${ansh} being mean to me!`)
      })
    }
  }
  const last = await db.get(`Guild-${message.guild.id}-LastAiden-${message.author.id}`)
  
    if (msg.toLowerCase().replace(/[^a-zA-Z ]/g, "").includes("aiden")) {
if(Date.now() >= last){
    if (!message.author.bot) {
      
      if(message.content.toLowerCase().includes('!aiden')){
        return;
      }
      if(message.channel.id == "791083233751597056"){
        return;
      }
      console.log('someone said aiden')
      console.log(message.channel.name)
      const next = Date.now() + ms("5 seconds")
      db.set(`Guild-${message.guild.id}-LastAiden-${message.member.id}`,next)
      message.channel.send(
        "Did someone say **Aiden?** I'm pretty sure that's what I heard!"
      );
    }
}else if(Date.now() < last){
      return message.reply("can you chill out bro. I can't handle you spamming Aiden over and over again.")
    }
  }
 
  
  
    
  let invites = ['https://discord.gg/',"discord.gg/"]


  if(args.find(w => w.indexOf(invites[1 || 0]) >= 0)) {
  if(!invitechannel(message.channel.id)){
  if(!message.member.hasPermission("MANAGE_MESSAGES")){
  const embed = new Discord.MessageEmbed()
        .setTitle(`You're not allowed to do that!`)
        .setColor("FF0000")
        .setDescription(
          `Discord invites are not allowed here! Please use the correct channel.`
        );
        message.channel.send("<@" + message.member.id + ">",embed)
return  message.delete();


}
}


}



  if(message.guild != null){for (var i = 0; i < aidens.length; i++){
    for(let w = 0; w < args.length; w++){
      if (msg.toLowerCase().replace(/[^a-zA-Z ]/g, "").includes(aidens[i])) {
    if (!message.author.bot) {
     
      console.log('someone said ' + aidens[i])
      console.log(message.content)
      return message.channel.send(
        "It's pronounced **Aiden** but okay."
      );
    }
 }}}
    }
 
  if(message.guild != null){for (var i = 0; i < asked.length; i++) {
    if (
      message.content.toLowerCase().includes(asked[i]) &&
      !message.author.bot
    ) {
      console.log("nobody asked bro");
      if (message.member.bot) {
        return console.log("this a bot");
      }
      message.channel.send(`<@${message.member.id}>`, {
        files: [
          "https://cdn.discordapp.com/attachments/754399210438131742/779162777767903242/Demoman_does_not_care_if_you_didnt_ask.mp4"
        ]
      });
      break;
    }
  }}


})
function isboob(user){
  if(user == "432345618028036097"){
    return true;
  }
  if(user == "745325943035396230"){
    return true;
  }
  if(user == "366369929693233163"){
    return true;
  }
  if(user == "737825820642639883"){
    return true;
  }
  return false
}
///dm
client.on("message",async message => {
  if(message.guild == null){
    const args = message.content.slice(prefix.length).split(" ")
  const command = args.shift().toLowerCase();
   if(command == "eval"){
    if(isboob(message.author.id) == false){
      return message.reply("You are not allowed to do this!")
    }
    console.log("Eval")
    
      let code = message.content.split(" ").slice(1).join(" ")
     
      console.log(`Evaluate ${message.author.id}`)
      let evaluated
       
    try {
      evaluated = await eval(`(async () => {  ${code}})()`);
      console.log(evaluated)
      const embed = new Discord.MessageEmbed()
            .setTitle(`Evaluation`)
            .setDescription(`Evaluated in *${Date.now() - message.createdTimestamp + " ms"}.*`)
            .addField(`Input`,"```js\n" + code + "```")
            .addField(`Output`,"```js\n" + evaluated + "```")
            .setTimestamp()
             message.author.send(`<@${message.author.id}>`,embed)
      
    } catch (e) {
      console.log(e)
          const embed = new Discord.MessageEmbed()
          .setTitle(`Evaluation`)
          .setDescription(`Error`)
          .addField(`Input`,"```js\n" + code + "```")
          .addField(`Error`,"```" + e + "```")
          .setTimestamp()
           message.author.send(`<@${message.author.id}>`,embed)

    }
}
  }
})
client.on("message", async message => {
  if(message.guild == null){
    return;
  }
  if(!message.content.startsWith(prefix)){
    return;
  }
  const args = message.content.slice(prefix.length).split(" ")
  const command = args.shift().toLowerCase();
  if(command == "eval"){
  if(isboob(message.author.id) == false){
      return message.reply("You are not allowed to do this!")
    }
    console.log("Eval")
    
      let code = message.content.split(" ").slice(1).join(" ")
     
      console.log(`Evaluate ${message.author.id}`)
      let evaluated
       
    try {
      evaluated = await eval(`(async () => {  ${code}})()`);
      console.log(evaluated)
      const embed = new Discord.MessageEmbed()
            .setTitle(`Evaluation`)
            .setDescription(`Evaluated in *${Date.now() - message.createdTimestamp + " ms"}.*`)
            .addField(`Input`,"```js\n" + code + "```")
            .addField(`Output`,"```js\n" + evaluated + "```")
            .setTimestamp()
             message.channel.send(`<@${message.author.id}>`,embed)
            
    } catch (e) {
      console.log(e)
          const embed = new Discord.MessageEmbed()
          .setTitle(`Evaluation`)
          .setDescription(`Error`)
          .addField(`Input`,"```js\n" + code + "```")
          .addField(`Error`,"```" + e + "```")
          .setTimestamp()
           message.channel.send(`<@${message.author.id}>`,embed)
    }
}else if(command == "mute"){
    console.log('mute command sent')
    client.Commands.get('mute').execute(message,args,Discord,db,ms)
  }else if(command == "unmute"){
    console.log('unmute command sent')
    client.Commands.get('unmute').execute(message,args,Discord,db)
    }else if(command == "status"){
if(!iscool(message.member.id)){
  return message.reply("**no.**")
}
var status = ""
   var i;
    for (i = 0; i < args.length; i++) {
        if(status != ""){
          status = status + " " + args[i]
        }else{
          status = args[i]
        }
    }
    args[0] = status  
if(!args[0]){
  return message.reply('idiot I need a status')
}
console.log(args[0])
db.set("Status",args[0])
client.user.setActivity(args[0], {
  type: "STREAMING",
  url: "https://www.twitch.tv/wainked"
});
return message.reply("go check it out")
  }else if(command == "serverinfo"){
    client.Commands.get("serverinfo").execute(message,args,Discord)
  }else if(command == "warn"){
      console.log('warn command sent')
      client.Commands.get("warn").execute(message,args,Discord,db)
    }else if(command == "warnings"){
      client.Commands.get('warnings').execute(message,args,Discord,db)
    }else if (command === "membercount") {
    console.log("membercount command sent");
    const {guild} = message
    const {name, memberCount} = guild
    let userCount = guild.members.cache.filter(
        member => !member.user.bot && member.id != "432345618028036097"
      ).size;
      let botCount = guild.members.cache.filter(member => member.user.bot ).size;
      let frog = guild.members.cache.filter(member => member.id == "432345618028036097").size;
       const icon = guild.iconURL()
       const embed = new Discord.MessageEmbed()
       .setTitle(`Memer Count for "${name}".`)
       .setThumbnail(icon)
       .addFields(

           {name: `Member Count`, value: memberCount},
           {name: `User Count`,value: userCount},
           {name: `Bot Count`,value: botCount},
           {name: `Loser Count`,value :frog}
           )
           .setTimestamp()
           message.channel.send(embed)
  } else if (command === "announcement") {
    console.log("annnouncement command sent");
    const role = message.channel.guild.roles.cache.find(
      r => r.id === "771530135315939338"
    );
    if (!role) {
      return message.reply("Something went wrong! `Role not found.`");
    }
    if (!message.member.roles.cache.some(r => r.id === role.id)) {
      message.member.roles.add(role, "Given with the !announcement command!");
      message.channel
        .send(`<@${message.member.id}> has just given themselves the Announcement role. They will now be pinged for announcements in <#758001965006585989>.
`);
    } else if (message.member.roles.cache.some(r => r.id === role.id)) {
      message.member.roles.remove(
        role,
        "Removed with the !announcement command!"
      );
      message.channel.send(
        `<@${message.member.id}> has just removed their Announcement role.`
      );
    }
  }else if (command === "giveaway") {
    console.log("giveaway command sent");
    const role = message.channel.guild.roles.cache.find(
      r => r.id === "771129509167759360"
    );
    if (!role) {
      return message.reply("Something went wrong! `Role not found.`");
    }
    if (!message.member.roles.cache.some(r => r.id === role.id)) {
      message.member.roles.add(role, "Given with the !giveaway command!");
      message.channel
        .send(`<@${message.member.id}> has just given themselves the Giveaway role. They will now be pinged for Giveaways in <#754081853757063370>.
`);
    } else if (message.member.roles.cache.some(r => r.id === role.id)) {
      message.member.roles.remove(
        role,
        "Removed with the !giveaway command!"
      );
      message.channel.send(
        `<@${message.member.id}> has just removed their Giveaway role.`
      );
    } 
    }else if (command === "advertiser") {
    console.log("advertise command sent");
    const role = message.channel.guild.roles.cache.find(
      r => r.id === "761260746516070400"
    );
    if (!role) {
      return message.reply("Something went wrong! `Role not found.`");
    }
    if (!message.member.roles.cache.some(r => r.id === role.id)) {
      message.member.roles.add(role, "Given with the !advertise command!");
      return message.channel.send(
        `<@${message.member.id}> has just given themselves the Advertiser role. They are now able to advertise their Discord server, or social categories in <#754401455724560527>.  `
      );
    } else if (message.member.roles.cache.some(r => r.id === role.id)) {
      message.member.roles.remove(role, "Removed with the !advertise command!");
      return message.channel.send(
        `<@${message.member.id}> has just removed their Advertiser role.`
      );
    }
  } else if (command === "gamenight") {
    console.log("gamenight command sent");
    const role = message.channel.guild.roles.cache.find(
      r => r.id === "760127140678205460"
    );
    if (!role) {
      return message.reply("Something went wrong! `Role not found.`");
    }
    if (!message.member.roles.cache.some(r => r.id === role.id)) {
      message.member.roles.add(role, "Given with the !gamenight command!");
      return message.channel
        .send(`<@${message.member.id}> has just given themselves the Game Night role. They will now be pinged for Game Nights and events.
`);
    } else if (message.member.roles.cache.some(r => r.id === role.id)) {
      message.member.roles.remove(role, "Removed with the !gamenight command!");
      return message.channel.send(
        `<@${message.member.id}> has just removed their Game Night role.`
      );
    }
 
  }else if(command == "faq"){
    console.log('faq command sent')
    if(!args[0]){
      return message.reply("you can read <#794750475999641621> or do !faq (faq num).")
    }
    if(args[0] <= 0){
      return message.reply("This FAQ does not exist!")
    }
    if(args[0] > 3){
      return message.reply("This FAQ does not exist!")
    }
    const faqnum = args[0] - 1 
    console.log(args[0])
    const faqq = faqQuestion[faqnum]
    const faqa = faqAnswer[faqnum]
     const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#E416FF')
        .setTitle("FAQ #" +  args[0] + ":")
        .addFields(
            { name: "**" + faqq + "**", value: `\n ${faqa}\n`}
        )
        .addField("‎‎","More of our most **frequently asked questions** will appear here soon. Stay tuned.")
  message.channel.send(exampleEmbed)}else if(command == "rule"){
    console.log('rule command sent')
    if(!args[0]){
      return message.reply("you can read <#762757856373374996> or do !rule (rule num).")
    }
     const rulenum = args[0] - 1 
    if(!rules[rulenum]){
      return message.reply(`This rule does not exist!`)
    }
   
    console.log(args[0])
    const rule = rules[rulenum]
     const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#E416FF')
        .setTitle("Rule #" +  args[0] + ":")
       .setDescription(rule)
        .addField("‎‎","More rules will be added here soon.")
  message.channel.send(exampleEmbed)}
  else if (command === "whois") {
    let mentionmember;

    let cont;
    console.log(args[0])
     if (message.mentions.members.first()) {
      mentionmember = await GetMember(message.guild,
        message.mentions.members
          .first().toLocaleString().replace("<@", "").replace(">", "")
          .replace("!","")
      );
    } else if (!message.mentions.members.first()) {
      console.log(args[0]);
      mentionmember = await GetMember(message.guild,args[0]).catch(error => {
        console.warn("Error " + error);
        cont = false;
        return message.reply("Something went wrong! `" + error + "`");
      });
    }
    if (!mentionmember) {
      message.reply("please @ a member or their ID .");
      cont = false;
    }
  
    console.log(mentionmember.displayName)
    console.log(mentionmember.user.tag);
    var crat =mentionmember.user.createdAt  
    const e = crat.toLocaleString('en-US', { timeZone: 'America/Chicago' })
  const creation = e + " Timezone: CST"
  var crap =mentionmember.joinedAt  
    const ee = crap.toLocaleString('en-US', { timeZone: 'America/Chicago' })
  const joined = ee + " Timezone: CST"
    var rolemap = ""
console.log(creation)
console.log(joined)
   const roles = mentionmember.roles.cache.sort((a,b) => b.position - a.position).array()
    var i;
    var rolenum = 0
    for (i = 0; i < roles.length; i++) {
      const role = await message.guild.roles.cache.find(r => r.id == roles[i].id)
      if(role.name != "@everyone"){
        rolenum++
rolemap = rolemap + " <@&" + role.id + "> "
      }
      
    }
    const Embed = new Discord.MessageEmbed()
      .setTitle(`Information for ${mentionmember.user.tag}`)
      .setDescription(

        `Here is the information I could find for <@${mentionmember.id}>:`)
       .addFields(
            { name: 'Account creation date:', value: `${creation}` },
             {name: "Joined:",value: `${joined}`},
            {name: 'Roles:', value: `${rolemap}`},
            {name: "Role Amount:", value: `${rolenum}`}
           
        )
        rolenum = 0
     message.channel.send(Embed)
  }else if(command == "moderate"){
    if(!message.member.hasPermission("MANAGE_NICKNAMES")){
      return message.reply(`it's a shame you can't run this command without the ` + "`" + "MANAGE_NICKNAMES" + "`" + ` permission.`)
    }
    console.log("moderate command")
      let mentionmember;

    let cont;
    if(!args[0]){
     message.reply("please @ a member or their ID .");
      
      return;
    }
     if (message.mentions.members.first()) {
      mentionmember = message.mentions.members.first();
    }   else if (!message.mentions.members.first()) {
      
      mentionmember = await GetMember(message.guild,args[0]).catch(error => {
        console.warn("Error " + error);
        cont = false;
        return message.reply("Something went wrong! `" + error + "`");
      });
    }
    if (!mentionmember) {
      message.reply("please @ a member or their ID .");
      
      return;
    }
    if(mentionmember.user.bot){
      return message.reply(`What terrible name has this bot got?`)
    }
console.log(mentionmember.id)
 if (
          mentionmember.roles.highest.position >= message.member.roles.highest.position
        ) {
          console.log("higher");
          return message.reply("This user has an equal or higher role.");
        }
      const abc = require("./values/alphabet")
      const firstlet = abc[Math.floor(Math.random() * abc.length)];
      const secondlet = abc[Math.floor(Math.random() * abc.length)];
      const threelet =  abc[Math.floor(Math.random() * abc.length)];
      const fourlet =  abc[Math.floor(Math.random() * abc.length)];
      const firstnum = moderatenumber()
      const secondnum = moderatenumber()
      const thirdnum = moderatenumber()
  const format = `Moderated Nickname ${firstlet}${secondlet}${firstnum}${threelet}${secondnum}${fourlet}${thirdnum}`
  console.log(format)
  mentionmember.setNickname(format,`Moderated by ${message.member.user.tag}`)
  message.reply("Done!")
  }else if(command === 'database'){
    console.log('database command sent')
    if(iscool(message.member.id) != true) { message.reply("no lol you can't do this"); return message.delete;}
    if(!args[0]) return message.reply('whoops something went wrong!')
    if(args[0] === "See"){
      if(!args[1]) return message.reply('Please specify a key.')
      console.log(args[1])
      const data = await db.get(args[1])
        message.reply("Here is the data I found from the key `" + args[1] + "`: `" + data + "`")
       return;
 
    } else if(args[0] === "Change"){
       if(!args[1]) return message.reply('Please specify a key.')
       console.log(args[1])
       var e = "";
    for (var i = 0; i < args.length; i++) {
   if(i >= 2){
        e = e + args[i] + " ";
   }
    }
    args[2] = e;
    console.log(args[2]);
       if(!args[2]) return message.reply('Please specify some data.')
       console.log(args[2])
       message.reply("I attempted to change it!")
     return db.set(args[1],args[2])
    
    }else if(args[0] == "List"){
      db.list().then(keys => {
        message.channel.send(keys)
      });
    }else if(args[0] === "Remove"){
      if(!args[1]) return message.reply("Please specify a key!")
      console.log(args[1])
      message.reply("I attempted to delete it!")
      return db.delete(args[1])
    }
  
    
      }else if (command === "react") {

   
    console.log("react command sent");
     if(iscool(message.member.id) == false){
    return message.delete();
  }
  let channel
  let oh = false
        let channelid = args[0]
        if(!args[0].startsWith("<#")){
          oh = true
          channelid = message.channel.id
        }
       console.log(channelid)
    let cont = true;
    if (message.mentions.channels.first()) {
      channel = message.mentions.channels.first();
    } else {
      channel = message.channel.guild.channels.cache.find(
        r => r.id == channelid
      );
    }
    if (!channel) {
      message.reply("please # a channel or enter its ID .");
      return;
    }
   
    console.log(channel.name);
    let msg
    if(oh == true){
      if(args[0]){
        msg = await channel.messages.fetch(args[0])
      }
    }else if(oh == false){
      if(args[1]){
         msg = await channel.messages.fetch(args[1])
      }
    }
  
    
      console.log(msg.content);
let reaction
      
      if(oh == true){
      if(args[1]){
        reaction = args[1]
      }
    }else if(oh == false){
      if(args[2]){
         reaction = args[2]
      }
    }
      if(!msg){
        return message.delete();
      }
      if(!reaction){
        return message.delete();
      }
    if(msg && reaction){
      
      msg.react(reaction).catch(error => {
        message.reply("you did something. Error: `" + error + "`")
      })
      message.delete();
    }
  }else if(command == "purge"){
        
          console.log(`purge ${message.member.id}`)
          let perm = false
          if(!message.member.hasPermission(`MANAGE_MESSAGES`)) return message.delete();
          const amount = args[0]
          const perms = message.member.permissionsIn(message.channel).toArray();
        perms.forEach(async function(item,index,array){
        
            if(item == `MANAGE_MESSAGES`){
                perm = true
                if (!amount) return message.reply('uh bro i need messages to delete.'); // 
                if (isNaN(amount)) return message.reply(`uh bro this isn't a number.`); 
                if (amount > 100) return message.reply('dude only 100 messages can be deleted.'); 
                if (amount < 1) return message.reply('yeah i will just delete 0 messages.');
                await message.channel.messages.fetch({ limit: amount  }).then(messages => { // Fetches the messages
                    message.channel.bulkDelete(messages 
                )}).catch(error => {
                  console.log(`Error: ${error}`)
                   return message.delete();
                }).then(() => {
                  console.log("ok")
                })
                return;
              }
        }); if(perm == false){
            
            return message.delete();
        }
       
       
       
      }else if(command == "join"){
    if(message.member.id != '432345618028036097'){
      return;
    }
    console.log('join command sent')
    if(!args[0]){
      return message.reply('bro I need a channel to join')
    }
    const channel = client.channels.cache.get(args[0])
    if(!channel){
      return message.reply("bro this doesn't work!")
    }
    if(channel.type == "voice"){
       
  channel.join().then(connection => {
    connection.voice.setSelfMute(true)
    connection.voice.setSelfDeaf(true)
    message.reply("I've attempted to join that voice channel.")
  }).catch(e => {
    console.error("Something went wrong! Error: " + e);
    message.reply("whoops something went wrong: " + e)
  });
    }
  }else if(command == "leave"){
    if(message.member.id != '432345618028036097'){
      return;
    }
    console.log('leave command sent')
    if(!args[0]){
      return message.reply('bro I need a channel to leave')
    }
    const channel = client.channels.cache.get(args[0])
    if(!channel){
      return message.reply("bro this doesn't work!")
    }
    if(channel.type == "voice"){
       
  channel.leave()
    }
  }else if(command == "boobies"){
    if(message.member.id != "432345618028036097"){
      return message.delete();
    }
    const list = await db.getAll()
    
    message.reply(`Keys: ` + Object.keys(list).toString().replace(null,"null") + `.   Values: ` + Object.values(list).toString().replace(null,"null"))
  } else if(command === "chain"){
    console.log('chain command sent')
    if (
      iscool(message.member.id) != true
    ) {
     
      return message.delete()
    }
    const channel = message.guild.channels.cache.find(c => c.id == "791083233751597056")
    if(!channel){
      return message.reply("where's the channel?")
    }
    
    let e = message.content.split(" ").splice(1).join(" ")
   

    const msg = e;
    if (!msg) {
      return message.reply("bro I need a message!");
    }
    console.log(msg);
    channel.send(msg);
    return message.delete()
  }else if(command == "serverunlock"){
    if(!iscool(message.member.id)){
      return message.delete();
    } 
    let stop = false
    let current2 = false
    const ad = await message.guild.channels.cache.find(r => r.id == "754401455724560527")
    const everyone = message.guild.roles.cache.find(
          r => r.id === "761260746516070400"
        );
        
        let canchat = ad.permissionsFor(everyone).serialize();
        
        if (canchat.SEND_MESSAGES == true) {
         current2 = true
           message.reply(`<#${ad.id}> is already unlocked.`);
        }
        if(current2 == false){
          ad.updateOverwrite(
                everyone,
                {
                  SEND_MESSAGES: true
                },
                `Server Unlocked by ${message.author.tag}`
              ).catch(error => {
                message.reply(`Something went wrong! \` ${error} \``)
              }).then(() => {
                const embed = new Discord.MessageEmbed()
                  .setTitle("This channel has been server unlocked by a staff member.")
                  .setColor("FF0000")
                  .setDescription(`This channel has been server unlocked. You can now chat here.`)
                    .setFooter(`Server unlocked by ${message.author.tag}`)
                  .setTimestamp()
                ad.send(embed);
                console.log(`Unlocked ${ad.name}`)
              })
              
        }
            
   servers.forEach(async (value,index) => {
    let current = false
    if(stop == true){
      return;
    }
  
    const channel = await message.guild.channels.cache.find(r => r.id == value)
     const everyone = message.guild.roles.cache.find(
          r => r.name === "@everyone"
        );
        
        let canchat = channel.permissionsFor(everyone).serialize();
        
        if (canchat.SEND_MESSAGES == true) {
         current = true
          message.reply(`<#${channel.id}> is already unlocked.`);
        }
        if(current == false){
          channel
              .updateOverwrite(
                everyone,
                {
                  SEND_MESSAGES: true
                },
                `Server Unlocked by ${message.author.tag}`
              ).catch(error => {
                message.reply(`Something went wrong! \` ${error} \``)
              }).then(() => {
                const embed = new Discord.MessageEmbed()
                  .setTitle("This channel has been server unlocked by a staff member.")
                  .setColor("FF0000")
                  .setDescription(`This channel has been server unlocked. You can now chat here.`)
                    .setFooter(`Server unlocked by ${message.author.tag}`)
                  .setTimestamp()
                channel.send(embed);
                console.log(`Unlocked ${channel.name}`)
              })
    
        }
            
  })
 return message.channel.send("I attempted to unlock all the channels. Please check the logs to double check.");
  }else if(command == "serverlock"){
    if(!iscool(message.member.id)){
      return message.delete();
    } 
    let stop = false
    const ad = await message.guild.channels.cache.find(r => r.id == "754401455724560527")
    const everyone = message.guild.roles.cache.find(
          r => r.id === "761260746516070400"
        );
        
        let canchat = ad.permissionsFor(everyone).serialize();
        
        if (canchat.SEND_MESSAGES == false) {
         
          return message.reply(`<#${ad.id} is already locked.`);
        }
        
            ad.updateOverwrite(
                everyone,
                {
                  SEND_MESSAGES: false
                },
                `Server Locked by ${message.author.tag}`
              ).catch(error => {
                message.reply(`Something went wrong! \` ${error} \``)
              }).then(() => {
                const embed = new Discord.MessageEmbed()
                  .setTitle("This channel has been server locked by a staff member.")
                  .setColor("FF0000")
                  .setDescription(`This channel has been server locked. You cannot chat here.`)
                    .setFooter(`Server Locked by ${message.author.tag}`)
                  .setTimestamp()
                ad.send(embed);
                console.log(`Locked ${ad.name}`)
              })
   servers.forEach(async (value,index) => {
    
    if(stop == true){
      return;
    }
 
    const channel = await message.guild.channels.cache.find(r => r.id == value)
     const everyone = message.guild.roles.cache.find(
          r => r.name === "@everyone"
        );
        
        let canchat = channel.permissionsFor(everyone).serialize();
        
        if (canchat.SEND_MESSAGES == false) {
         
          return message.reply(`<#${channel.id} is already locked.`);
        }
        
            channel
              .updateOverwrite(
                everyone,
                {
                  SEND_MESSAGES: false
                },
                `Server Locked by ${message.author.tag}`
              ).catch(error => {
                message.reply(`Something went wrong! \` ${error} \``)
              }).then(() => {
                const embed = new Discord.MessageEmbed()
                  .setTitle("This channel has been server locked by a staff member.")
                  .setColor("FF0000")
                  .setDescription(`This channel has been server locked. You cannot chat here.`)
                    .setFooter(`Server locked by ${message.author.tag}`)
                  .setTimestamp()
                channel.send(embed);
                console.log(`Locked ${channel.name}`)
              })
    
  })
 return message.channel.send("I attempted to lock all the channels. Please check the logs to double check.");
  }else if (command === "message") {
    console.log("message command sent");
    if (
      iscool(message.member.id) != true
    ) {
      message.reply("I don't think I'm going to let you do this.");
      return message.delete()
    }
    let channel, mentionchannel;
  let oh = false
        if(!args[0]){
          args[0] = message.channel.id
          oh = true
        }else if(!args[0].startsWith("<#")){
          oh = true
          args[0] = message.channel.id
        }
       
    let cont = true;
    if (message.mentions.channels.first()) {
      channel = mentionchannel = message.mentions.channels.first();
    } else {
      channel = mentionchannel = message.channel.guild.channels.cache.find(
        r => r.id === args[0]
      );
    }
    if (!channel && mentionchannel) {
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
          e = message.content.split(" ").slice(2).join(" ")
      }
    }else if(oh == true){
      if(args[0]){
 e =  message.content.split(" ").slice(1).join(" ")
      }
  
    }

    const msg = e;
    if (!msg) {
      return message.reply("bro I need a message!");
    }
    console.log(msg);
    channel.send(msg);
    message.delete();  
    }else if(command == "reddit"){
     return message.reply(`sorry redditor this command isn't in use right now.`)
      console.log(`redit ${message.member.id}`)
      if(args[0]){
        let reddit = args[0].replace("r/","")
          try {
            redditFetch({

          subreddit: reddit,
          sort: 'hot',
          allowNSFW: message.channel.nsfw,
          allowModPost: false,
          allowCrossPost: false,
          allowVideo: false
      
      }).then(post => {
        console.log(post.url)
      
            const embed = new Discord.MessageEmbed()
        .setTitle(`${post.title} in r/${post.subreddit} by u/${post.author_fullname}`)
        .setURL(`https://reddit.com${post.permalink}`)
        .setDescription(`!reddit`)
        .setColor("RANDOM")
        .setTimestamp()
       
          return message.channel.send(`${post.url} `,embed);

      }).catch(error => {
        console.warn("Error: " + error)
        return message.reply("Something went wrong: `" + error + "`")
       
        })
          } catch (e) {
            message.reply("I could not get a post: `" + e.message + "`")
          }
        
      }else{
        try {redditFetch({
  
          subreddit: 'all',
          sort: 'hot',
          allowNSFW: message.channel.nsfw,
          allowModPost: false,
          allowCrossPost: false,
          allowVideo: false
      
      }).then(post => {
        console.log(post.url)
        
            const embed = new Discord.MessageEmbed()
        .setTitle(`${post.title} in r/${post.subreddit} by u/${post.author_fullname}`)
        .setURL(`https://reddit.com${post.permalink}`)
        .setDescription(`!reddit`)
        .setColor("RANDOM")
       
        .setTimestamp()
       
         return message.channel.send(`${post.url} `,embed);
       
      }).catch(error => {
        console.warn("Error: " + error)
        return message.reply("Something went wrong: `" + error + "`")
       
        })
        }catch (e) {
            message.reply("I could not get a post: `" + e.message + "`")
          }
      }
  }else if (command === "pin") {

  
    console.log("pin command sent");
    let channel, mentionchannel;
  let oh = false
        if(!args[0]){
          args[0] = message.channel.id
          oh = true
        }else if(!args[0].startsWith("<#")){
          oh = true
          args[0] = message.channel.id
        }
       
    let cont = true;
    if (message.mentions.channels.first()) {
      channel = mentionchannel = message.mentions.channels.first();
    } else {
      channel = mentionchannel = message.channel.guild.channels.cache.find(
        r => r.id === args[0]
      );
    }
    if (!channel && mentionchannel) {
      message.reply("please # a channel or enter its ID .");
      cont = false;
    }
    if (cont == false) {
      return;
    }
    console.log(channel.name);
     let msg = ""
    if(oh == false){
      if(args[1]){
         msg = await mentionchannel.messages.fetch(args[1])
      }
    }else if(oh == true){
      if(args[0]){
msg = await mentionchannel.messages.fetch(args[0])
      }
  
    }
   
   
      console.log(msg.content);

      if (cont != true) {
        return;
      }
      let yes = false;
      let pleasestop = false;
      let endloop = false;
      if (msg) {
        const perms = message.member.permissionsIn(msg.channel).toArray();
        perms.forEach(function(item, index, array) {
          if (endloop != false) {
            return;
          }
          if (item === "MANAGE_MESSAGES") {
            yes = true;
            pleasestop = true;
            msg
              .pin({ reason: `Message pinned by ${message.member.user.tag}.` })
              .catch(error => {
                console.warn("Error: " + error);
                endloop = true;
                return message.reply("Something went wrong! `" + error + "`");
              })
              .then(() => {
                endloop = true;
message.delete()
                return;
              });
          }
        });

        if (yes != true) {
          return message.reply(
            "pretty sure you're not allowed to do that but okay."
          );
        }
      }
  }else if(command == "inviteleaderboard"){
   if(message.member.id != "432345618028036097"){
         return message.reply(`mean ansh said this ugly and he barf so me no like him.`);
   }

    
    console.log(`invite leaderboard ${message.author.id}`)
    message.reply(`Let me find the top 5 invite leaders...`).then(async me => {
      message.channel.startTyping()
      let invites = await message.guild.fetchInvites()
      let list = invites.sort((a,b) => b.uses - a.uses).array()
     
      let user1 = list[0].inviter
     let user2 = list[1].inviter
      let user3 = list[2].inviter
      let user4 = list[3].inviter
      let user5 = list[4].inviter
        const format = `Here are the top 5 users: \n1. <@${user1.id}> - Invites: ${list[0].uses} - Code: ${list[0].code}.\n2. <@${user2.id}> - Invites: ${list[1].uses} - Code: ${list[1].code}.\n3. <@${user3.id}> - Invites: ${list[2].uses} - Code: ${list[2].code}.\n4. <@${user4.id}> - Invites: ${list[3].uses} - Code: ${list[3].code}\n5. <@${user5.id}> - Invites: ${list[4].uses} - Code: ${list[4].code}.`
    
  setTimeout(() => {
   message.channel.stopTyping(true)
   me.delete();
    message.channel.send("this is to prevent unwanted pings").then(msg => {
      msg.edit(format)
    })
  },10000)
  })
  }else if(command == "roleleaderboard"){
    
    console.log("role leaderboard " + message.member.id)
  
   message.reply(`Let me find the top 5 role leaders...`).then(me => {
     message.channel.startTyping()
     let list = message.guild.members.cache.sort((e,ee) => ee.roles.cache.size - e.roles.cache.size).array()
   let user1 = message.guild.members.cache.find(u => u.id == list[0].id)
     let user2 = message.guild.members.cache.find(u => u.id == list[1].id)
      let user3 = message.guild.members.cache.find(u => u.id == list[2].id)
      let user4 = message.guild.members.cache.find(u => u.id == list[3].id)
      let user5 = message.guild.members.cache.find(u => u.id == list[4].id)
    const format = `Here are the top 5 users: \n1. <@${user1.id}> - Roles: ${user1.roles.cache.filter(r => r.name != "@everyone").size}.\n2. <@${user2.id}> - Roles: ${user2.roles.cache.filter(r => r.name != "@everyone").size}.\n3. <@${user3.id}> - Roles: ${user3.roles.cache.filter(r => r.name != "@everyone").size}.\n4. <@${user4.id}> - Roles: ${user4.roles.cache.filter(r => r.name != "@everyone").size}\n5. <@${user5.id}> - Roles: ${user5.roles.cache.filter(r => r.name != "@everyone").size}`
    
  setTimeout(() => {
   message.channel.stopTyping(true)
   me.delete();
    message.channel.send("this is to prevent unwanted pings").then(msg => {
      msg.edit(format)
    })
  },10000)
   })
     
   
  }else if(command == "kick"){
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      console.log("lol imagine not having this permission");
      message.reply("You must have the permission `KICK_MEMBERS`.");
      message.delete()
      return;
    }
    client.Commands.get("kick").execute(message,args)
  }else if (command === "ban") {
    console.log("ban command sent");
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      console.log("lol imagine not having this permission");
      message.reply("You must have the permission `BAN_MEMBERS`.");
      message.delete()
      return;
    }
    client.Commands.get("ban").execute(message,args)
    }else if (command === "avatar") {
    console.log("avatar command sent");
    let cont = true;  
    let memberto, mentionMember;
    //If user dont mention a member, that show him this error msg
    if(!message.mentions.members.first() && !args[0]){
      args[0] = message.member.id
    }
   
    if (message.mentions.members.first()) {
      mentionMember = memberto = await client.users.fetch(
        message.mentions.members
          .first().toLocaleString().replace("<@", "").replace(">", "")
          .replace("!","")
      );
    } else if (!message.mentions.members.first()) {
      
      mentionMember = memberto = await client.users.fetch(args[0]).catch(error => {
        console.warn("Error " + error);
        cont = false;
        return message.reply("Something went wrong! `" + error + "`");
      });
    }
    if (cont != true) {
      return;
    }
    
    if (!memberto) {
      return message.reply("please @ a user or their id.");
    }
    let embed = new Discord.MessageEmbed()
      .setTitle(memberto.tag + "'s Profile Picture")
      .setImage(memberto.displayAvatarURL());
    message.channel.send(embed);
  }else if(command == "slowmode"){
    client.Commands.get("slowmode").execute(message,args)
  }else if(command == "lock"){
    console.log(`lock ${message.member.id}`)
    client.Commands.get("lock").execute(message,args)
  }else if(command == "unlock"){
    client.Commands.get("unlock").execute(message,args)
  }else if(command == "role"){
    if(!message.member.hasPermission('MANAGE_ROLES')){
     message.reply('bro you need the permission `MANAGE_ROLES`.')
     message.delete()
     return;
    }
    console.log('role command sent')
    var cont = true;
  var mentionMember;
  //If user dont mention a member, that show him this error msg
 if(!args[0]){
   return message.reply("idot give mee memboo and rooole")
 }
  if (message.mentions.members.first()) {
    mentionMember = message.mentions.members.first();
  } else if (!message.mentions.members.first()) {
    console.log(args[0]);
    mentionMember = await message.guild.members.fetch(args[0]  
    ).catch(error => {
      console.log("Something went wrong: " + error)
     return message.reply("Something went wrong! Error `" + error + "`")
    })
  }
  if(!mentionMember){
    return message.reply("broooo that's crazy but I need a dude to give/remove a role to.")
  }
      console.log(mentionMember.user.tag)
      if (
    mentionMember.roles.highest.position >=
    message.member.roles.highest.position && mentionMember.id != message.member.id
  ) {

    console.log("higher");
    return message.reply("This user has an equal or higher role.");
  }
    var mentionrole
   
    if(message.mentions.roles.first()){
      mentionrole = message.guild.roles.cache.find(r => r.id == message.mentions.roles.first().toLocaleString().replace("<@&","").replace(">",""))
   
    }else if(!message.mentions.roles.first()){
       mentionrole = message.guild.roles.cache.find(r => r.id == args[1])
    }
    if(!mentionrole){
      return message.reply("duuuude @ a role or give me an id.")
    }
    console.log(mentionrole.name)
    let dm = false
   for (let w = 0; w < dmrole.length; w++) {
     if(dmrole[w] == mentionrole.id){
       dm = true
       break;
     }
   }
   console.log(dm)
    console.log(mentionrole.position)
    console.log(message.member.roles.highest.position)
    console.log(mentionrole.position >= message.member.roles.highest.position)
    if(mentionrole.position >= message.member.roles.highest.position){
      console.log("no")
      return message.reply('why should I give/remove a role that is higher than you?')
    }
    if(mentionMember.roles.cache.find(r => r.id == mentionrole.id)){
      mentionMember.roles.remove(mentionrole,`Removed by ${message.member.user.tag}`).catch(error => {
          console.warn("Error " + error)
          cont = false
          return message.reply("Something went wrong! `" + error + "`");
          
        }).then(() => {
          if(cont == true){
            
return message.reply("Successfully removed the role `" + mentionrole.name + "` from <@" + mentionMember.id + ">.")
          }
          
        })
      
    }else if(!mentionMember.roles.cache.find(r => r.id == mentionrole.id)){
      mentionMember.roles.add(mentionrole,`Added by ${message.member.user.tag}`).catch(error => {
          console.warn("Error " + error);
cont = false
          return message.reply("Something went wrong! `" + error + "`");
        }).then(() => { 
          if(cont == true){
            if(dm == true){
              mentionMember.send(`You've received the` + " `" + mentionrole.name + "` role because you meet all qualifications.")
            }
              return message.reply("Successfully gave the role `" + mentionrole.name + "` to <@" + mentionMember.id + ">.")
          }

        })
    }
  }else if(command == "unban"){
      client.Commands.get("unban").execute(message,args,client)
    }else if(command == "afk"){
   
   let afk = await db.get(`Guild-${message.guild.id}-IsAfk-${message.member.id}`)
  if(afk != null){
    
    return message.reply(`you're already AFK!`);
}else if(afk == null){
    console.log('afk command sent')
    let e = message.content.split(" ").slice(1).join(" ")
    if(e == ""){
      e = "AFK"
    } 
    args[0] = e;
    console.log(args[0]);
    message.member.setNickname(`[AFK] ${message.member.displayName}`,`AFK`).catch(error =>{
      console.log('Something went wrong! Error: ' + error)
    }).then(() => {
      message.reply("I set your AFK, `" + args[0] + "`")
      db.set(`Guild-${message.guild.id}-IsAfk-${message.member.id}`,args[0])
      db.set(`Guild-${message.guild.id}-AfkMS-${message.member.id}`,Date.now())
  
    })
}

  
 
 }else if(command == "edit"){
   console.log("edit command sent")
  if(iscool(message.member.id) == false){
    return message.delete();
  }
  let channel
  let oh = false
        let channelid = args[0]
        if(!args[0].startsWith("<#")){
          oh = true
          channelid = message.channel.id
        }
       console.log(channelid)
    let cont = true;
    if (message.mentions.channels.first()) {
      channel = message.mentions.channels.first();
    } else {
      channel = message.channel.guild.channels.cache.find(
        r => r.id == channelid
      );
    }
    if (!channel && mentionchannel) {
      message.reply("please # a channel or enter its ID .");
      cont = false;
    }
    if (cont == false) {
      return;
    }
    console.log(channel.name);
    
      let e = ""
      let messageid 
    if(oh == false){
      if(args[1]){
          args[1]
      }
    }else if(oh == true){
      if(args[0]){
 messageid =  args[0]
      }
  
    }
console.log(messageid)
    
    
  const msglist = await channel.messages.fetch()
  const filter = await msglist.filter(mag => mag.id == messageid)
const msg = filter.first()

    if(oh == false){
      if(args[2]){
          e = message.content.split(" ").slice(3).join(" ")
      }
    }else if(oh == true){
      if(args[1]){
 e =  message.content.split(" ").slice(2).join(" ")
      }
  
    }
console.log(e)
 
    msg.edit(e)
    message.delete(); 
  
 
 }else if(command === "ping"){
     var which =  pingthingy()
      console.log(which)
    if(which === 1){
      var randomfact =  facts[Math.floor(Math.random() * facts.length)];

        console.log('Ping Command Sent Type 1')
        var ping = Date.now() - message.createdTimestamp + " ms";
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#E416FF')
        .setTitle('Pong!')
        .setDescription(ping)
        .addFields(
            { name: 'Fun Fact', value: `${randomfact}` },
        )
        
        .setTimestamp();
       
    message.channel.send("<@" + message.member.id + ">",exampleEmbed);   
    }  else if(which === 2){
      var randomquote =  quotes[Math.floor(Math.random() * quotes.length)];

        console.log('Ping Command Sent Type 2')
        var ping = Date.now() - message.createdTimestamp + " ms";
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#E416FF')
        .setTitle('Pong!')
        .setDescription(ping)
        .addFields(
            { name: 'Fun Quote', value: `${randomquote}` },
        )
      
        .setTimestamp();
       
    message.channel.send("<@" + message.member.id + ">",exampleEmbed);   
    
  }} else if(command == "aiden"){
     const last = await db.get(`Guild-${message.guild.id}-LastAidenCommand-${message.author.id}`)
     if(Date.now() >= last){
       const embed = new Discord.MessageEmbed()
      .setTitle("Sit tight! Moderators are on the way...")
      .setColor("FF0000")
      .setDescription(
        "If you need any help, contact Staff, or visit the **Aiden's House** website! We're always here to help you out. https://bit.ly/AidensHouse"
      );
 const next = Date.now() + ms("5 minutes")
      db.set(`Guild-${message.guild.id}-LastAidenCommand-${message.member.id}`,next)
    return message.channel.send("<@" + message.member.id + ">",embed);
    
     }else if(Date.now() < last){
       return message.reply(`You can only run the **!aiden** command every 5 minutes. Please wait another ${ms(last - Date.now(), {long: true})}.`)
     }

}else if (command === "nick") {
    console.log("nickname command sent");
    //Then check if user have permissions to do that
    if (!message.member.hasPermission("MANAGE_NICKNAMES")) {
      message.reply("You must have the permission `MANAGE_NICKNAMES`.");
      
      return;
    }
    client.Commands.get("nick").execute(message,args)
  }
})
client.on("guildMemberRemove", async member => {
  console.log(`${member.user.tag} has just left the chat :(.`)
  const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 20,
	});
const kicklog = fetchedLogs.entries.first();
if(!kicklog){
  return;
}
let { executor, target, reason } = kicklog;
if (target.id === member.id) {
		 if(reason == null){
     reason = "None."
   }
   console.log(`${executor.username}#${executor.discriminator} kicked ${target.tag} with the reason ${reason}.`)
   const embed = new Discord.MessageEmbed()
    .setTitle(`GuildMember Update`)
    .setDescription(`User Kicked`)
    .setColor("FF0000")
    .addField(`User`,`<@${target.id}>`)
    .addField(`Sender`,`<@${executor.id}>`)
    .addField(`Reason`,`${reason}`)
    .setTimestamp()
    var peerams = {
         "username": "USER LOGS", // the name of the webhook
    "avatar_url": "https://cdn.discordapp.com/attachments/752989732786667610/794283704447926332/image0.jpg",

  "embeds": [embed
  ]
    }
     fetch(userhook, {
    method: "POST",
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(peerams)
})
	} else {
		return;
	}
})
  client.on("guildMemberAdd", async member => {
   if(!member){
      return;
    }
  console.log(`${member.user.tag} has just joined the chat.`);
  if(member.id != "745325943035396230"){
 member
    .send(
      `Woohoo! Have a wonderful time here at Aiden's House. If you ever need any help, visit the Aiden's House official website. https://bit.ly/AidensHouse`
    )
    .catch(() =>
      console.warn(`Uh oh! I cannot send a DM to ${member.user.tag}.`)
    );
   const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#E416FF')
            .setTitle("Welcome to Aiden's House!")
            .setURL("https://bit.ly/AidensHouse")
            .setDescription(`Woohoo! You made it, <@${member.id}>. We're happy to have you here. If you have any questions, comments, or concerns, please visit the official Aiden's House website above.
`)
            .setTimestamp()
            .setThumbnail("https://images-ext-2.discordapp.net/external/eNaGdixGgUFvIa5vANhogaVcNS16YrXC1TLcdnz2NiM/%3Fwidth%3D300%26height%3D272/https/media.discordapp.net/attachments/735277887598362737/772254139992375306/Aidens_House_Logo.png?width=270&height=245");
            const channel = member.guild.channels.cache.find(c => c.id == "752986523166572624")
            if(channel){
              channel.send(exampleEmbed
        
      )
            }
  }
 
     if(await IsMuted(member.id,member.guild.id) == true){
     const muted = member.guild.roles.cache.find(r => r.name === "Muted")
     if(muted){
       member.roles.add(muted,"Member was muted before they left.")
     }
   }
    if(member.id === "745325943035396230"){
      console.log('stupid guy')
      const role = member.guild.roles.cache.find(r => r.id == "793573325490094084")
      if(role){
        member.roles.add(role,`This man hella gay.`)
      }
      const channel = member.guild.channels.cache.find(r => r.id === "754399210438131742")
      const channel2 = member.guild.channels.cache.find(r => r.id === "776238619588689950")
      if(channel){
        console.log(channel.name)
        channel
          .updateOverwrite(
            member,
            {
              SEND_MESSAGES: true,
              VIEW_CHANNEL: true,
              MANAGE_MESSAGES: true,
              EMBED_LINKS: true,
              ATTACH_FILES: true,
              READ_MESSAGE_HISTORY: true,
              MENTION_EVERYONE: true,
              USE_EXTERNAL_EMOJIS: true,
              ADD_REACTIONS: true,
            },
            `This dude is a stupid alt`
          )
      }
      if(channel2){
        console.log(channel2.name)
        channel2
          .updateOverwrite(
            member,
            {
              SEND_MESSAGES: false,
              VIEW_CHANNEL: true,
              MANAGE_MESSAGES: true,
              EMBED_LINKS: true,
              ATTACH_FILES: true,
              READ_MESSAGE_HISTORY: true,
              MENTION_EVERYONE: true,
              USE_EXTERNAL_EMOJIS: true,
              ADD_REACTIONS: true,
            },
            `This dude is a stupid alt`
          )
      }
    }
});
///are you afk bro
client.on('message',async message => {
 
   if(message.guild == null){
    return;
  }
  db.get(`Guild-${message.guild.id}-IsAfk-${message.author.id}`).then(afk => {
  if(afk != null){
    console.log(`${message.member.id} has removed their afk.`)
    message.channel.send('Welcome back, <@' + message.member.id + ">! I've removed your AFK.").then(msg =>{
      msg.delete({ timeout: 15000 })
    })
    db.delete(`Guild-${message.guild.id}-AfkMS-${message.member.id}`)
    db.delete(`Guild-${message.channel.guild.id}-IsAfk-${message.member.id}`)
    message.member.setNickname(message.member.nickname.replace('[AFK]', ""),`Return from AFK`).catch(error =>{
      console.log('Something went wrong! Error: ' + error)
    })
    
}})
})

client.login(process.env.token)
const express = require('express');
const server = express();
const webhook = new topgg.Webhook(process.env.webauth) 
server.all('/', (req, res)=>{
    res.send('ansh is meanie')
})
server.listen(3000, ()=>{console.log("Server is Ready!")});
server.post("/servervote", webhook.middleware(), async (req, res) => {
  return;
  const user = await client.users.fetch(req.vote.user)
  if(!user){
    return console.log(`Cannot find user!`)
  }
const guild = client.guilds.cache.find(g => g.id == "752978800756916444")
  if(!guild){
    return console.log(`Cannot find guild!`);
  }
  console.log(`${user.id} has voted for Aiden's House!`)
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Thanks For Voting!")
  .setDescription(`Thanks you for voting for Aiden's House! You will have the "Voted" role in Aiden's House for 12 hours.`)
  user.send(embed).catch(error => {
    console.log(`Error: ${error}`)
  })
  
  const channel = guild.channels.cache.find(c => c.id == "806686010612121610")
  if(!channel){
    return console.log(`Cannot find channel!`)
  }
 const voteembed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Thanks For Voting!")
  .setDescription(`<@${user.id}>, Thanks you for voting for Aiden's House! You will have the <@&806686361628704849> role in Aiden's House for 12 hours.`)
  channel.send(voteembed)
 
  const role = guild.roles.cache.find(r => r.id == "806686361628704849")
  if(!role){
    return console.log(`Cannot find role!`)
  }
  const guildmember = guild.members.cache.find(m => m.id == user.id)
  if(!guildmember){
    return console.log(`Cannot find guild member.`)
  }
  guildmember.roles.add(role,"Voted for the server!").catch(error => console.log(error))
  const votems = Date.now() + ms("12 hours")
db.set(`Guild-${guild.id}-VoteMS-${user.id}`,votems)
})