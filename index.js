const Discord = require('discord.js')
const Prefix = "!";
const moment = require("moment");
const ms = require('ms')
const client = new Discord.Client();
const data = require("@replit/database");
const math = require('mathjs')
const database = new data();
const fs = require("fs");
var dateFormat = require("dateformat");
const { setTimeout } = require("timers");
const keepAlive = require('./server');
const fetch = require('node-fetch')
const ytdl = require('ytdl-core')
var servers = {}
const FF000 = "#FF0000"
const { ReactionRoleManager } = require
("discord.js-collector");
var on = false  
const quotes = require('./quotes')
const facts = require('./facts')
const aidens = require('./aiden')
const reactionRoleManager = new ReactionRoleManager(client, {
    storage: true, // Enable reaction role store in a Json file
    path: __dirname + '/roles.json', // Where will save the roles if store is enabled
    mongoDbLink: process.env.MONGO 
});
reactionRoleManager.on('ready', () => {
    console.log('Reaction Role Manager is ready!');
});


reactionRoleManager.on('reactionRoleAdd', (member, role) => {
    console.log(member.displayName + ' got the role ' + role.name)
});

reactionRoleManager.on('reactionRoleRemove', (member, role) => {
    console.log(member.displayName + ' lost the role ' + role.name)
});

reactionRoleManager.on('allReactionsRemove', (message) => {
    console.log(`All reactions from message ${message.id} was removed, all roles were taken and reactions roles deleted.`)
});

reactionRoleManager.on('missingRequirements', (type, member, reactionRole) => {
    console.log(`Member '${member.id}' will not get role '${reactionRole.role}', because they don't have the requirement ${type}`);
});


const [faqQuestion, faqAnswer] = require('./faq')
client.Commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.Commands.set(command.name, command);
}
function randomIntFromIntervalmax(max) { // min and max included 
  return Math.floor(Math.random() * (max - 1 + 1) + 1);
}
function pingthingy() { // min and max included 
  return Math.floor(Math.random() * (2 - 1 + 1) + 1);
}
function getRole(guild,role){
  const rol = guild.roles.cache.find(r => r.id == role);
  console.log(rol.id)
  return rol
}
async function getmemboo(guild,id){
  const member = await guild.members.fetch(id).catch(console.log)
  if(member){
    return member
  }
}
async function IsMuted(user,guild){
  const muted = await getData(`Guild-${guild}-IsMuted-${user}`)
  console.log(muted)
  if(muted != null){
    return true
  } else if(!muted == null){
    return false
  }
}

function play(connection,message){
  var server = servers[message.guild.id]
  console.log(server.queue[0])
  server.dispatcher = connection.play(ytdl(server.queue[0],{filter: "audioonly"}))
  server.queue.shift()
  server.dispatcher.on('end', function(){
    if(server.queue[0]){
    play(connection,message)
    }else{
      connection.disconnect()
    }
  })
}
/// reeee aiden
async function getmember(id) {
  let member = await client.users.fetch(id);
  return member;
}
async function getData(key){
  
  
  const data = await database.get(key);

  return data
}


client.on("ready", async () => {
  const status = await getData("Status")
  console.log("I am ready Aiden!");
    client.user.setActivity(status, {
  type: "STREAMING",
  url: "https://www.twitch.tv/wainked"
});

})
client.on("disconnected", () => {
    client.user.setStatus("offline");

});
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
  return false
}


async function run(key,message) {
  console.log('run function')
  const data = await getData(key);
  console.log('' + data); // will print your data
  if(message){
  return message.reply("Here's the data I found from the key " + key + ": `" +   data + '`')
  }
}

async function setData(key,data){
  await database.set(key,data);
  console.log('i think it worked')
  return
}
async function removeData(key){
  console.log('remove data')
  database.delete(key).then(() => {
    console.log(`Successfully removed the key ${key}`)
    return  })
}

async function GetMember(guild, id) {
  let member = await guild.members.fetch(id);
  return member;
}

const slurs = require('./slurs')

const swears = require('./swears')
const asked = require("./asked")

const roles = require('./roles')
const threats = require('./threats')
function isbypasses(user) {
 for (var i = 0; i < roles.length; i++) {
  
   if(user.roles.cache.find(r => r.id == roles[i])){
     return true
   }
 }
 return false
}
async function dm(message,args){
  console.log('dm command sent')
      var cont = true
      //Then check if user have permissions to do that
    if(!message.member.hasPermission('MANAGE_MESSAGES')) {
        message.reply('You must have the permission `MANAGE_MESSAGES`.');
        message.delete()
        return;
    };
 if(!args[0]) return message.reply('whoops something went wrong!')
     

   
  


    //Check if your bot can`t kick this user, so that show this error msg
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
      
          if(message.attachments.size > 0){
        console.log('attach')

      message.attachments.forEach(att => {
        console.log(att.url)
        mentionMember.send({files: [att.url]}).catch((error) => {
  console.warn("Error " + error);
  cont = false
  return message.reply("Something went wrong! `" + error + "`")
}).then(() => {
  if(cont === true){
     
          
          if(message.attachments.size > 0){
        console.log('attach')
      
     
      const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Utility')
            .setDescription("New DM!")
            .addFields(
                { name: 'User', value: `<@${mentionMember.id}>` },
                { name: "Sender:", value: `<@${message.member.id}>` },
           
            )
            .setTimestamp();
      
     var peerams = {
         "username": "DM LOGS", // the name of the webhook
    "avatar_url": "https://cdn.discordapp.com/avatars/755537335327916114/52aa8f1b411a325a137274327bf2ed8f.png?size=512",
    "content": `New dm to <@${mentionMember.id}>`,
  "embeds": [exampleEmbed
]

    }
             message.attachments.forEach(att => {
        console.log(att.url)
        var params = {
    "username": "DM LOGS", // the name of the webhook
    "avatar_url": "https://cdn.discordapp.com/avatars/755537335327916114/52aa8f1b411a325a137274327bf2ed8f.png?size=512",
    "content": `New attachment to <@${mentionMember.id}>`,
  "embeds": [{
    "image": {
      "url": att.url
    }
  }]
}
      
     fetch(process.env.DMHOOK, {
    method: "POST",
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(params)
})

      })
    
            
        }
    console.log(`DMed ${mentionMember.displayName}  by ${message.member.displayName}. Message: ${att.url}`)
        
         message.channel.send(`Sucessfully DMed <@${mentionMember.id}>. Message: ${att.url}`)
 
        return;
  }
})
      })
          }
      if(message.content){
          var contrea = false
  var msg = ""
  for (i = 0; i < args.length; i++) {
    console.log(args[i]);
    
    if(i != 0){
      contrea = true
    }
    if (contrea == true) {
      msg = msg + " " + args[i];
    }
  }
  args[1] = msg
  
    if(!msg){
        message.reply('Please have a message!');
        return;
    };
  console.log(msg)
    const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Utility')
            .setDescription("New DM!")
            .addFields(
                { name: 'User', value: `<@${mentionMember.id}>` },
                { name: "Sender:", value: `<@${message.member.id}>` },
                { name: 'Message: ', value: `${args[1]}`},   
            )
            .setTimestamp();
      
     
     
     
        console.log('content')
    mentionMember.send(args[1]).catch((error) => {
  console.warn("Error " + error);
  cont = false
  return message.reply("Something went wrong! `" + error + "`") 
}).then( () => {
  if(cont === true){
  
var params = {
    "username": "DM LOGS", // the name of the webhook
    "avatar_url": "https://cdn.discordapp.com/avatars/755537335327916114/52aa8f1b411a325a137274327bf2ed8f.png?size=512",

  "embeds": [
    exampleEmbed
  ]
}
      
     fetch(process.env.DMHOOK, {
    method: "POST",
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(params)
})

        console.log(`DMed ${mentionMember.id}  by ${message.member.displayName}. Message: ${args[1]}`)
        
        message.channel.send(`Sucessfully DMed <@${mentionMember.id}>. Message: ${args[1]}`)
 
        return;
  }
     })}
    
  }
client.on("message", message => {
 const args = message.content.split(" ");
 if (message.content.toLowerCase().includes("aiden")) {
    if (!message.author.bot) {
      if(message.content.toLowerCase().includes('!aiden')){
        return;
      }
      
      console.log('someone said aiden')
      console.log(message.channel.name)
      message.channel.send(
        "Did someone say **Aiden?** I'm pretty sure that's what I heard!"
      );
    }
  }
  if(message.guild != null){for (var i = 0; i < aidens.length; i++){
 if (message.content.toLowerCase().includes(aidens[i])) {
    if (!message.author.bot) {
     
      console.log('someone said ' + aidens[i])
      console.log(message.content)
      return message.channel.send(
        "It's pronounced **Aiden** but okay."
      );
    }
  }
  }}

 
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
  }
  for (var i = 0; i < args.length; i++) {

       if(args[i].toLowerCase() == 'ok' || args[i].toLowerCase() == "okay" || args[i].toLowerCase() == "k"){
  if(!message.author.bot){message.react('🆗')}
}
if(args[i].toLowerCase() == "bro" || args[i].toLowerCase() == "bruh"){
  if(!message.author.bot){
    const emoji = message.guild.emojis.cache.find(e => e.id == '786244760338694197')
    if(emoji){
      message.react(emoji)
    }
  }
}
    
}
   
  for (var w = 0; i < slurs.length; i++) {
    
   if (message.content.toLowerCase().includes(slurs[w]))  {
  
      if (isbypasses(message.member)) {
        return console.log("this dude is important");
      }
      if (message.member.bot) {
        return console.log("boobies bot");
      }
      console.log("this man said a naughty slur!");
      console.log(message.member.user.tag);
      console.log(slurs[w]);
      console.log(message.content);
      const embed = new Discord.MessageEmbed()
        .setTitle(`You're not allowed to say that!`)
        .setColor(FF000)
        .setDescription(
          `Slurs are not allowed here. Your message has just been sent to Server Staff and will be acted upon shortly.`
        );
      message.channel.send(`<@${message.member.id}>`,embed);
 
      message.delete();
      break;
    }
  }
  
  for (var w = 0; i < swears.length; i++) {
    var continu = true;
    if (message.content.toLowerCase().includes(swears[w]))   {
      
      if (message.member.bot) {
        console.log("bot");
        return (continu = false);
      }
      if (isbypasses(message.member)) {
        console.log("this dude is important lol");
        return (continu = false);
      }
      if (continu === true) {
    
        console.log("this man said a naughty word!");
        console.log(swears[w]);
        console.log(message.content);
        console.log(message.member.user.tag);
        const embed = new Discord.MessageEmbed()
          .setTitle(`You're not allowed to say that!`)
          .setColor(FF000)
          .setDescription(
            `NSFW or sexual references are not allowed here. Your message has just been sent to Server Staff and will be acted upon shortly.`
          );
        message.channel.send(`<@${message.member.id}>`,embed);
      
        message.delete();
        break;
      }
    }
  }}
    for (var w = 0; i < threats.length; i++) {
    if (message.content.toLowerCase().includes(threats[w])){ 
  
      if (isbypasses(message.member)) {
        return console.log("this dude is important");
      }
      if (message.member.bot) {
        return console.log("boobies bot");
      }
      console.log("this man said a naughty threat!");
      console.log(message.member.user.tag);
      console.log(threats[w]);
      console.log(message.content);
      const embed = new Discord.MessageEmbed()
        .setTitle(`You're not allowed to say that!`)
        .setColor(FF000)
        .setDescription(
          `Death threats are not allowed here! Your message has just been sent to Server Staff and will be acted upon shortly.`
        );
      message.channel.send(`<@${message.member.id}>`,embed);
 
      message.delete();
      break;
    }
  }
});

client.on("messageDelete", async message => {
if(message.guild == null){
  return;
}

  const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
  var user = ""
    if (entry.extra.channel.id === message.channel.id
      && (entry.target.id === message.author.id)
      && (entry.createdTimestamp > (Date.now() - 5000))
      && (entry.extra.count >= 1)) {
    user = entry.executor
  } else { 
    user = message.author
  }
 console.log(`A message deleted in the channel ${message.channel.name}, with the content ${message.content}, created by ${message.author.tag}, was deleted by ${user.tag}.`)
  const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Chat Logs')
            .setDescription("New Message Delete!")
            .addFields(
                { name: 'Sender:', value: `<@${message.member.id}>` },
                { name: "Channel:", value: `<#${message.channel.id}>` },
                {name: "Message:", value: `${message.content}`},
                {name: "Deleter:", value: `<@${user.id}>`}
           
            )
            .setTimestamp();
      
     var peerams = {
         "username": "CHAT LOGS", // the name of the webhook
    "avatar_url": "https://cdn.discordapp.com/avatars/755537335327916114/52aa8f1b411a325a137274327bf2ed8f.png?size=512",

  "embeds": [exampleEmbed
]

    }
     fetch(process.env.DELETEHOOK, {
    method: "POST",
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(peerams)
})
})
client.on("messageUpdate", (oldMessage, message) => {
  if(oldMessage.guild == null){
  return;
}
    if(oldMessage.content == message.content){
      return;
    }

    if(message.author.bot){
      return;
    }
    if(oldMessage.content && message.content){
      console.log(`Message updated by ${message.member.user.tag} in the channel ${oldMessage.channel.name}. Old Message ${oldMessage.content}. New Message ${message.content}.`)
  for (var i = 0; i < slurs.length; i++) {
      if (message.content.toLowerCase().includes(slurs[i])) {
   
        if (isbypasses(message.member)) {
          return console.log("this dude is important");
        }
        if (message.member.bot) {
          return console.log("boobies bot");
        }
             console.log(message.content)
        console.log("this man said a naughty slur!");
        console.log(message.member.user.tag);
        console.log(slurs[i]);
        console.log(message.content);
        const embed = new Discord.MessageEmbed()
          .setTitle(`You're not allowed to say that!`)
          .setColor(FF000)
          .setDescription(
            `Slurs are not allowed here. Your message has just been sent to Server Staff and will be acted upon shortly.`
          );
        message.channel.send(`<@${message.member.id}>`,embed);
        
        message.delete();
        break;
      }
    }
  }
   for (var i = 0; i < threats.length; i++) {
    if (message.content.toLowerCase().includes(threats[i])) {
  
      if (isbypasses(message.member)) {
        return console.log("this dude is important");
      }
      if (message.member.bot) {
        return console.log("boobies bot");
      }
      console.log("this man said a naughty threat!");
      console.log(message.member.user.tag);
      console.log(threats[i]);
      console.log(message.content);
      const embed = new Discord.MessageEmbed()
        .setTitle(`You're not allowed to say that!`)
        .setColor(FF000)
        .setDescription(
          `Death threats are not allowed here! Your message has just been sent to Server Staff and will be acted upon shortly.`
        );
      message.channel.send(`<@${message.member.id}>`,embed);
 
      message.delete();
      break;
    }
  }if(!oldMessage.content && message.content){
    console.log(`Message Update by ${message.member.user.tag}. Old Message could not be found or is an image. New Message ${message.content}`)
     for (var i = 0; i < slurs.length; i++) {
      if (message.content.toLowerCase().includes(slurs[i])) {
       
        if (isbypasses(message.member)) {
          return console.log("this dude is important");
        }
        if (message.member.bot) {
          return console.log("boobies bot");
        }
            console.log(message.content)
        console.log("this man said a naughty slur!");
        console.log(message.member.user.tag);
        console.log(slurs[i]);
        console.log(message.content);
        const embed = new Discord.MessageEmbed()
          .setTitle(`You're not allowed to say that!`)
          .setColor(FF000)
          .setDescription(
            `Slurs are not allowed here. Your message has just been sent to Server Staff and will be acted upon shortly.`
          );
        message.channel.send(`<@${message.member.id}>`,embed);
        
        message.delete();
        break;
      }
    }
  }
});

function calcTime(offset) {
  var d = new Date();
  var localTime = d.getTime();
  var localOffset = d.getTimezoneOffset() * 60000;

  // obtain UTC time in msec
  var utc = localTime + localOffset;
  // create new Date object for different city
  // using supplied offset
  var nd = new Date(utc + 3600000 * offset);
  //nd = 3600000 + nd;
  utc = new Date(utc);
  // return time as a string
  return (
    "The current date for the offset " +
    offset +
    " is `" +
    nd.toLocaleString() +
    ".` The UTC date is `" +
    utc.toLocaleString() +
    "`."
  );
}
async function nick(message, args) {
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
async function ban(message, args) {
  if (!args[0]) {
    return message.channel.send("Uh oh. That didn't work! Try again.");
  }
  var memberto, mentionMember;

  var cont = true;
  if (message.mentions.members.first()) {
    mentionMember = memberto = memberto = message.mentions.members.first();
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
  var i;
  var e = "";
  for (i = 0; i < args.length; i++) {
    if (i >= "1") {
      e = e + args[i] + " ";
    }
  }
  args[1] = e;
  console.log(args[1]);
  if (!args[1]) {
    message.reply("please contain a reason!");
    return;
  }
  mentionMember
    .send(
      `You have been banned from ${message.channel.guild}. Reason: ${
      args[1]
      }. If you'd like to appeal this ban, visit our Ban Appeals website page here. https://bit.ly/36dPGg5`
    )
    .catch(() =>
      console.log(`Uh oh! I can't send a DM to ${memberto.user.tag}.`)
    );
  memberto
    .ban({
      reason: `Ban by ${message.member.user.tag} | Reason:` + args[1]
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
    `We've just banned ${mentionMember} with the reason` + "`" + args[1] + "`"
  ).then(msg =>{
    msg.delete(10000)
  })
  });

  

}

async function kick(message, args) {
  if (!args[0]) return message.channel.send("Uh oh. That didn't work!");
  var memberto, mentionMember;

  var cont = true;
  if (message.mentions.members.first()) {
    mentionMember = memberto = memberto = message.mentions.members.first();
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
  console.log(mentionMember);
  if (!mentionMember) {
    return message.reply("Please specify a user or their id.");
  }
  if (cont != true) {
    return;
  }
  if (memberto.id === message.member.id) {
    return message.reply("lol you can't kick yourself stupid");
  }
  if (
    mentionMember.roles.highest.position >=
    message.member.roles.highest.position
  ) {
    console.log("higher");
    return message.reply("This user has an equal or higher role.");
  }
  if (memberto.bot) {
    return message.reply("lol, imagine trying to kick a bot");
  }
  if (isbypasses(memberto) === true) {
    return message.reply(
      "I don't think his guy just can be kicked. They're like, Superman, or something."
    );
  }
  var i;
  var e = "";
  for (i = 0; i < args.length; i++) {
    if (i >= "1") {
      e = e + args[i] + " ";
    }
  }
  args[1] = e;
  console.log(args[1]);
  if (!args[1]) {
    message.reply("please contain a reason!");
    return;
  }
  if (!memberto.kickable) {
    message.reply(
      "Uh oh! I do not have the proper permissions to kick this user."
    );
    return;
  }
    mentionMember
    .send(
      `You have been kicked from ${message.channel.guild}. Reason:` + "`"  + args[1] + "`"
    )
    .catch(() => console.warn(`I cannot send a DM to ${memberto.user.tag}.`));
    
  memberto
    .kick(`Kick by ${message.member.user.tag} for the reason ` + args[1])
    .catch(error => {
      console.warn("Error " + error);
      cont = false;
      return message.reply("Something went wrong! `" + error + "`");
    })
    .then(() =>
      console.log(
        `Kicked ${mentionMember.user.tag} by ${
        message.member.user.tag
        } with the reason ${args[1]}`
      )
    );

  message.channel
    .send(
      `Alrighty! We've just sucessfully kicked ${mentionMember} with the reason` + "`" + 
      args[1] + "`"
    ).then(msg =>{
    msg.delete(10000)
  })
    message.delete()

    .catch(console.error);
}

client.on("message", async message => {
   if(message.guild == null){
    if(iscool(message.author.id)){
      return;
    }
    if(message.author.id == "772834188189630465"){
      return;
    }
    getmember(message.author.id).then(member =>{
   
    
      if(message.attachments.size > 0){
        console.log('attach')
       
      message.attachments.forEach(att => {
        console.log(att.url)
      var params = {
    "username": "DM LOGS", // the name of the webhook
    "avatar_url": "https://cdn.discordapp.com/avatars/755537335327916114/52aa8f1b411a325a137274327bf2ed8f.png?size=512",
    "content": `New attachment from <@${member.id}>`,
  "embeds": [{
    "image": {
      "url": att.url
    }
  }]
}
      
     fetch(process.env.DMHOOK, {
    method: "POST",
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(params)
})
      })
      }
      if(message.content){
        console.log('content')
         console.log('Author: ' + member.username + '. Message: ' + message.content)
     const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#E416FF")
      .setTitle("DM LOGS")
      .setDescription("New DM to <@772834188189630465>!")
      .addFields(
        { name: "User", value: `<@${member.id}>` },
        { name: "Message: ", value: `${message.content}` }
      )
      .setTimestamp();
      
var params = {
    username: "DM LOGS", // the name of the webhook
    avatar_url: "https://cdn.discordapp.com/avatars/755537335327916114/52aa8f1b411a325a137274327bf2ed8f.png?size=512",
    embeds: [exampleEmbed]
}
      
     fetch(process.env.DMHOOK, {
    method: "POST",
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(params)
})
    }
  })
}
getData(`Guild-${message.channel.guild.id}-IsAfk-${message.member.id}`).then(afk => {
  if(afk != null){
    message.channel.send('Welcome back, <@' + message.member.id + ">! I've removed your AFK.").then(msg =>{
      msg.delete({ timeout: 15000 })
    })
    removeData(`Guild-${message.channel.guild.id}-IsAfk-${message.member.id}`)
    message.member.setNickname(message.member.nickname.replace('[AFK]', "")).catch(error =>{
      console.log('Something went wrong! Error: ' + error)
    })
    
}})
  if (message.mentions.members) {
    if (message.mentions.members.first()) {
      var conti = true;
      console.log("mention thingy");
      console.log(message.channel.name)
      const user = message.mentions.members.first()
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
        if (message.member.id === "366369929693233163") {
          console.log("bro this is aiden. I need his autograph");
          conti = false;
      }
     

     
      if (user.id === "772834188189630465" && !message.author.bot) {
        console.log(message.member.user.tag);
        on = true;
        console.log("stop pinging meeeee");
        message.reply("lol why are you pinging me?");
        on = false;
      }
      if (user.id === "366369929693233163" && conti === true) {
        console.log(message.member.user.tag);
        on = true;
        console.log("this stupid idiot got pinged");
        const embed = new Discord.MessageEmbed()
          .setTitle("You're not allowed to do that!")
          .setColor(FF000)
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
 getData(`Guild-${message.channel.guild.id}-IsAfk-${user.id}`).then(afk => {
    if(afk != null){
        message.reply('`' + user.user.tag + '` is AFK with the reason `' + afk + '`.')
      }
      })
      }
     
      
    }
  }
 if(!message.content.startsWith(Prefix)){
   return;
 }

  const args = message.content.slice(Prefix.length).split(" ");


     
  const command = args.shift().toLowerCase();
  
  if (command === "aiden") {
    
    const embed = new Discord.MessageEmbed()
      .setTitle("Sit tight! Moderators are on the way...")
      .setColor(FF000)
      .setDescription(
        "If you need any help, contact Staff, or visit the **Aiden's House** website! We're always here to help you out. https://bit.ly/AidensHouse"
      );

    return message.channel.send("<@" + message.member.id + ">",embed);
    
  }
  
   
  if (command === "site") {
    const embed = new Discord.MessageEmbed()
      .setTitle("Click below to visit the Aiden's House official website.")
      .setColor(E416FF)
      .setDescription(`https://bit.ly/AidensHouse`);
    return message.channel.send("<@" + message.member.id + ">",embed);
  } 
else if (command === "membercount") {
    console.log("membercount command sent");
    let memberCount = message.channel.guild.members.cache.filter(
      member => !member.user.bot
    ).size;
    console.log(memberCount);
    message.channel.send(
      "The current member count is `" + `${memberCount}` + "`"
    );
  } else if (command === "advertiser") {
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
        `<@${message.member.id}> has just removed their Gam  e Night role.`
      );
    }
 
  }else if (command === "whois") {
    var mentionmember;
console.log('who is he?')
    var cont;
    console.log(args[0])
     if (message.mentions.members.first()) {
      mentionmember = await GetMember(message.guild,
        message.mentions.members
          .first().toLocaleString().replace("<@", "").replace(">", "")
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
   mentionmember.roles.cache.forEach(role => {
     rolemap = rolemap + " <@&" + role.id + ">,"
   })
    const Embed = new Discord.MessageEmbed()
      .setTitle(`Information for ${mentionmember.user.tag}`)
      .setDescription(
        `Here is the information I could find for <@${mentionmember.id}>:`)
       .addFields(
            { name: 'Account creation date:', value: `${creation}` },
             {name: "Joined:",value: `${joined}`},
            {name: 'Roles:', value: `${rolemap}`},
           
        )
     message.channel.send(Embed)
  }else if(command == "rr"){
    client.Commands.get('reactionroles').execute(message,args,reactionRoleManager)
  }else if(command == "meme"){
    console.log('meme command sent')
    client.Commands.get("meme").execute(message,args)
  }else if(command == "reddit"){
    console.log('ew a redditor')
    client.Commands.get('reddit').execute(message,args)
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
setData("Status",args[0])
client.user.setActivity(args[0], {
  type: "STREAMING",
  url: "https://www.twitch.tv/wainked"
});
return message.reply("go check it out")
  }else if(command == "rrremove"){
    client.Commands.get('removerr').execute(message,args,reactionRoleManager)
  }   else if(command == "calc"){
    var prob = ""
    if(!args[0]){
      return message.reply('bro I want some numbers.')
    }
       var i;
    for (i = 0; i < args.length; i++) {
        if(prob != ""){
          prob = prob + " " + args[i]
        }else{
          prob = args[i]
        }
      
    }const ans = math.evaluate(prob)
    console.log(ans)
  message.reply(ans)
    }else if (command === "date") {
    console.log("hehe");

    var time = await calcTime(args[0]);
    message.channel.send(time);
    console.log(time);
  } else if (command === "slowmode") {
    var yes = false;
    console.log("slowmode command sent");
    //Then check if user have permissions to do that
if(!message.member.hasPermission("MANAGE_MESSAGES")){
      message.reply("come back to be when you have the permission `MANAGE_MESSAGES`")
      message.delete(

      )
      return;
    }
    if (!args[0]) {
      if(message.channel.rateLimitPerUser == 0){
        return message.channel.send(
            "Current Slowmode in " +
            `<#${message.channel.id}>` +
            " is 0 seconds."
          ); 
      }else{
         return message.channel.send(
            "Current Slowmode in " +
            `<#${message.channel.id}>` +
            " is " +
            ms(message.channel.rateLimitPerUser * 1000, { long: true }) + "."
          ); 
      }
     
    }
    if(!args[0].startsWith("<#")){
      args[1] = args[0]
      args[0] = message.channel.id
    }
    var channel, mentionchannel;

    var cont = true;
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
    const perms = message.member.permissionsIn(channel).toArray();
    perms.forEach(function(item,index,array){
      if (item === "MANAGE_MESSAGES") {
        yes = true;
        if (!args[1])
        if(channel.rateLimitPerUser == 0){
          return message.channel.send(
            "Current Slowmode in " +
            `<#${mentionchannel.id}>` +
            " is 0 Seconds."
          );
        }else{
           return message.channel.send(
            "Current Slowmode in " +
            `<#${mentionchannel.id}>` +
            " is " +
            ms(channel.rateLimitPerUser * 1000, { long: true }) + "."
          );}
        console.log(ms(args[1]));
        if (ms(args[1])  > 21600000) {
          return message.reply("You can only go up to "+  ms(21600 * 1000, { long: true }) +".");
        }
        if (channel.type === "text") {
          var e = ms(args[1])
          e = e/1000
          console.log(e);
          channel
            .setRateLimitPerUser(
              e,
              `Slowmode changed by ${message.member.user.tag}`
            )
            .catch(error => {
              console.warn("Error " + error);
              cont = false;
              return message.reply("Something went wrong! `" + error + "`");
            }).then(() => {
              message.channel.send("Sucessfully changed slowmode in <#" +
            mentionchannel.id +
            `> to `  + ms(e * 1000, { long: true })      + ".")
          message.delete()
        })
        }
        }
    })
  } else if (command === "message") {
    console.log("message command sent");
    if (
      iscool(message.member.id) != true
    ) {
      message.reply("I don't think I'm going to let you do this.");
      return message.delete()
    }
    var channel, mentionchannel;

    var cont = true;
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
    var i;
    var e = "";
    for (i = 0; i < args.length; i++) {
      if (i == "0") {
      }
      if (i >= "1") {
        e = e + " " + args[i];
      }
    }

    const msg = e;
    if (!msg) {
      return message.reply("bro I need a message!");
    }
    console.log(msg);
    channel.send(msg);
    message.reply("Successfully sent a message to <#" + channel.id + ">");
  } else if (command === "pin") {

    var cont = true;
    console.log("pin command sent");
    var mentionchannel;

    if (message.mentions.channels.first()) {
      mentionchannel = message.mentions.channels.first();
    } else {
      mentionchannel = message.channel.guild.channels.cache.find(
        r => r.id === args[0]
      ).catch(error => {
        console.log(error)
      })
    }
    if (!mentionchannel) {
      message.reply("please # a channel or enter its ID .");
      cont = false;
    }
    var msg;
    console.log(args[1]);
  
    mentionchannel.messages.fetch(args[1]).then(msg => {
      console.log(msg.content);

      if (cont != true) {
        return;
      }
      var yes = false;
      var pleasestop = false;
      var endloop = false;
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
                return message.reply("I attempted to pin it!");
              });
          }
        });

        if (yes != true) {
          return message.reply(
            "pretty sure you're not allowed to do that but okay."
          );
        }
      }
    });
  } else if (command === "react") {

    var cont = true;
    console.log("react command sent");
    var mentionchannel;

    if (message.mentions.channels.first()) {
      mentionchannel = message.mentions.channels.first();
    } else {
      mentionchannel = message.channel.guild.channels.cache.find(
        r => r.id === args[0]
      ).catch(error => {
        console.log(error)
      })
    }
    if (!mentionchannel) {
      message.reply("please # a channel or enter its ID .");
      cont = false;
    }
    
    var msg;
    console.log(args[1]);
  
    mentionchannel.messages.fetch(args[1]).then(msg => {
      console.log(msg.content);

      if (cont != true) {
        return;
      }
      var reaction = args[2]
      if(!reaction){
        return message.reply('bro send me an emoji')
      }
      var yes = false;
      var pleasestop = false;
      var endloop = false;
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
              .react(reaction)
              .catch(error => {
                console.warn("Error: " + error);
                endloop = true;
                return message.reply("Something went wrong! `" + error + "`");
              })
              .then(() => {
                endloop = true;
message.delete()
                return message.reply("I attempted to react to it!");
              });
          }
        });

        if (yes != true) {
          return message.reply(
            "pretty sure you're not allowed to do that but okay."
          );
        }
      }
    });
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
    } else if(command == "warn"){
      console.log('warn command sent')
      client.Commands.get("warn").execute(message,args,Discord,database)
    }else if(command == "warnings"){
      client.Commands.get('warnings').execute(message,args,Discord,database)
    }else if (command === "ban") {
    console.log("ban command sent");
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      console.log("lol imagine not having this permission");
      message.reply("You must have the permission `BAN_MEMBERS`.");
      message.delete()
      return;
    }
    ban(message, args);
  } else if (command === "kick") {
    console.log("kick command sent");
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      message.reply("You must have the permission `KICK_MEMBERS`.");
      message.delete()
      return;
    }
    kick(message, args);
  } else if (command === "unban") {
    console.log("unban command sent");
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      message.reply("You must have the permission `BAN_MEMBERS`.");
      message.delete
      return;
    }
    if (!args[0]) return message.channel.send("Uh oh. That didn't work!");
    getmember(args[0]).then(member => {
      if (!member)
        return message.reply("Please specify a member's user ID to unban!");
      console.log(member);
      if (member) {
        message.guild.members
          .unban(member, `UnBan by ${message.member.user.tag}`)
          .catch(error => {
            console.warn("Error " + error);
            cont = false;
            return message.reply("Something went wrong! `" + error + "`");
          });
        console.log(`Unbanned ${member.id} by ${message.member.user.tag}`);
        message.channel.send(`Woohoo! We've just unbanned <@${member.id}>.`).then(msg =>{
    msg.delete(10000)
  })
  message.delete()
      }
    });
  } else if (command === "lock") {
    console.log("lock em down");
    if(!message.member.hasPermission("MANAGE_MESSAGES")){
      return message.reply("come back to be when you have the permission `MANAGE_MESSAGES`")
    }
    var channel;

    var cont = true;
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
    var i;
    var e = "";
    for (i = 0; i < args.length; i++) {
      if (i >= "1") {
        e = e + args[i] + " ";
      }
    }
    args[1] = e;
    var yes = false;
    console.log(args[1]);
    const everyone = message.guild.roles.cache.find(
      r => r.name === "@everyone"
    );
    if (!args[1]) {
      args[1] = "This channel has been locked. You cannot chat here.";
    }
    let canchat = channel.permissionsFor(everyone).serialize();
    if (!canchat.SEND_MESSAGES) {
      yes = false;
      cont = false;
      return message.reply("bro they already can't chat here.");
    }
    const perms = message.member.permissionsIn(channel).toArray();

    perms.forEach(function(item, index, array) {
      console.log(item, index);
      if (item === "MANAGE_MESSAGES") {
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
            message.reply(
              "Successfully locked the channel <#" + channel.id + ">"
            );
            const embed = new Discord.MessageEmbed()
              .setTitle("This channel has been locked.")
              .setColor(FF000)
              .setDescription(args[1]);
            channel.send(embed);
            message.delete()
          });
      }
    });
    if (yes === false) {
      return message.reply("dude you cannot do this!");
    }
  } else if(command === 'database'){
    console.log('database command sent')
    if(iscool(message.member.id) != true) { message.reply("no lol you can't do this"); return message.delete;}
    if(!args[0]) return message.reply('whoops something went wrong!')
    if(args[0] === "See"){
      if(!args[1]) return message.reply('Please specify a key.')
      console.log(args[1])
 return run(args[1],message)
 
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
     return setData(args[1],args[2],message)
    
    }else if(args[0] === "Remove"){
      if(!args[1]) return message.reply("Please specify a key!")
      console.log(args[1])
      return removeData(args[1],message)
    }
  
    
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
    
  }}
  else if(command == "random"){
    console.log('random')
    if(!args[0]) return message.reply('Whoops something went wrong!')
   
      var randomnumber =  randomIntFromIntervalmax(args[0])
  
      console.log(randomnumber)
      
        console.log('random number Command Sent.')
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#E416FF')
        .setTitle('Random Number')
        .setDescription(`Your random number is ${randomnumber}.`)
        .setTimestamp()
        
        message.channel.send('<@' + message.member.id + ">",exampleEmbed)
          
  }
 else if(command == "dm"){
   dm(message,args)
 }else if(command == "afk"){
   
   var afk = await getData(`Guild-${message.guild.id}-IsAfk-${message.member.id}`)
  if(afk != null){
    
    return message.reply(`you're already AFK!`)
}else if(afk == null){
    console.log('afk command sent')
    var e = "";
    for (var i = 0; i < args.length; i++) {
   
        e = e + args[i] + " ";
      
    }
    if(e == ""){
      e = "AFK"
    } 
    args[0] = e;
    console.log(args[0]);
    message.member.setNickname(`[AFK] ${message.member.displayName}`).catch(error =>{
      console.log('Something went wrong! Error: ' + error)
    }).then(() => {
      message.reply("I set your AFK, `" + args[0] + "`")
      setData(`Guild-${message.guild.id}-IsAfk-${message.member.id}`,args[0])
  
    })
}

  
 
 } else if (command === "unlock") {
   if(!message.member.hasPermission("MANAGE_MESSAGES")){
      return message.reply("come back to be when you have the permission `MANAGE_MESSAGES`")
    }
    console.log("unlock em down");
    var channel;

    var cont = true;
    var yes = true;
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
    var i;
    var e = "";
    for (i = 0; i < args.length; i++) {
      if (i >= "1") {
        e = e + args[i] + " ";
      }
    }
    args[1] = e;
    console.log(args[1]);
    const everyone = message.guild.roles.cache.find(
      r => r.name === "@everyone"
    );
    if (!args[1]) {
      args[1] = "This channel has been unlocked. You can now chat here.";
    }
    let canchat = channel.permissionsFor(everyone).serialize();
    if (canchat.SEND_MESSAGES == null || canchat.SEND_MESSAGES == true) {
      yes = false;
      cont = false;
      return message.reply("bro they already can chat here.");
    }
    const perms = message.member.permissionsIn(channel).toArray();
    if (cont == false) {
      return;
    }
    perms.forEach(function(item, index, array) {
      if (yes === false) {
        return;
      }
      if (item === "MANAGE_MESSAGES") {
        console.log("perhaps");
        yes = false;
        const everyone = message.channel.guild.roles.cache.find(
          r => r.name === "@everyone"
        );
        channel
          .updateOverwrite(
            everyone,
            {
              SEND_MESSAGES: null
            },
            `This has been changed by ${message.member.user.tag}`
          )
          .catch(error => {
            console.warn("Error " + error);
            cont = false;
            return message.reply("Something went wrong! `" + error + "`");
          })
          .then(() => {
            message.reply(
              "successfully unlocked the channel <#" + channel.id + ">"
            );
            const embed = new Discord.MessageEmbed()
              .setTitle("This channel has been unlocked.")
              .setColor(FF000)
              .setDescription(args[1]);
            channel.send(embed);
            message.delete()
            return;
          });
      }
    });
    if (yes == true) {
      console.log("just no");
      return message.reply("dude you cannot do this! ");
    }
  } else if(command == "faq"){
    console.log('faq command sent')
    if(!args[0]){
      message.reply("you can read <#763013457871241247> or do !faq (faq num).")
    }
    if(args[0] == 0){
      return message.reply("This FAQ does not exist!")
    }
    if(args[0] > 13){
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
            { name: "`" + faqq + "`", value: faqa},
            {name: "🔗 Still unsatisfied?", value: "Visit the Aiden's House Google site and navigate to our [Support Center](https://bit.ly/AidensHouse/)."}
        )
  message.channel.send(exampleEmbed)
  }else if (command === "avatar") {
    console.log("avatar command sent");
    var cont = true;  
    var memberto, mentionMember;
    //If user dont mention a member, that show him this error msg
    if (message.mentions.members.first()) {
      mentionMember = memberto = await getmember(
        message.mentions.members
          .first().toLocaleString().replace("<@", "").replace(">", "")
      );
    } else if (!message.mentions.members.first()) {
      console.log(args[0]);
      mentionMember = memberto = await getmember(args[0]).catch(error => {
        console.warn("Error " + error);
        cont = false;
        return message.reply("Something went wrong! `" + error + "`");
      });
    }
    if (cont != true) {
      return;
    }
    console.log(memberto.tag);
    if (!memberto) {
      return message.reply("please @ a user or their id.");
    }
    let embed = new Discord.MessageEmbed()
      .setTitle(memberto.tag + "'s Profile Picture")
      .setImage(memberto.displayAvatarURL());
    message.channel.send(embed);
  } else if(command == "quote"){
      var randomquote =  quotes[Math.floor(Math.random() * quotes.length)];
console.log(randomquote)
        console.log('quote Command Sent.')
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#E416FF')
        .setTitle('Quote')
        .addFields(
            { name: randomquote, value: `Do !fact to see a fact!`},
        )
        .setTimestamp()

        message.reply(exampleEmbed)    
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
  console.log(args[0])
   console.log(args[1])
  if (message.mentions.members.first()) {
    mentionMember = message.mentions.members.first();
  } else if (!message.mentions.members.first()) {
    console.log(args[0]);
    mentionMember = await GetMember(
      message.channel.guild,
      args[0]
    ).catch(error => {
      console.warn("Error " + error);
      cont = false;
      return message.reply("Something went wrong! `" + error + "`");
    });
  }
  if(!mentionMember){
    return message.reply("broooo that's crazy but I need a dude to give/remove a role to.")
  }
      console.log(mentionMember.user.tag)
      if (
    mentionMember.roles.highest.position >=
    message.member.roles.highest.position
  ) {
    console.log("higher");
    return message.reply("This user has an equal or higher role.");
  }
    var mentionrole
   
    if(message.mentions.roles.first()){
      mentionrole = getRole(message.guild,message.mentions.roles.first().toLocaleString().replace("<@&","").replace(">",""))
   
    }else if(!message.mentions.roles.first()){
       mentionrole = getRole(message.guild,args[1])
    }
    if(!mentionrole){
      return message.reply("duuuude @ a role or give me an id.")
    }
    console.log(mentionrole.name)
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
              return message.reply("Successfully gave the role `" + mentionrole.name + "` to <@" + mentionMember.id + ">.")
          }

        })
    }
  }else if(command == "mute"){
    console.log('mute command sent')
    client.Commands.get('mute').execute(message,args,Discord,database,ms)
  }else if(command == "unmute"){
    console.log('unmute command sent')
    client.Commands.get('unmute').execute(message,args,Discord,database)
    }else if(command == "fact"){
    var randomfact =  facts[Math.floor(Math.random() * facts.length)];

        console.log('fact Command Sent.')
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#E416FF')
        .setTitle('Fun Fact')
        .addFields(
            { name: randomfact, value: `Do !quote to see a quote!` },
        )
        .setTimestamp()
        message.reply(exampleEmbed) 
  
  }else if (command === "lockdown") {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
       message.reply("You must have the permission `MANAGE_CHANNELS`");
       return message.delete()
    }
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
  } else if(command == "play"){
     if(message.member.id != '432345618028036097'){
      return;
    }
    console.log('play command sent')
    if(!args[0]){
      return message.reply('bro I need a link to play.')
    }
    if(!message.member.voice.channel){
      return message.reply('bro you need to be in a voice channel.')
    }
    if(!servers[message.guild.id]) servers[message.guild.id] = {queue: []}
    var server = servers[message.guild.id]
    server.queue.push(args[0])
    if(!message.member.voice.connection) message.member.voice.channel.join().then(function(connection){
      play(connection,message)
    })
  }else if(command == "skip"){
    if(message.member.id != '432345618028036097'){
      return;
    }
    console.log('skip')
    var server = servers[message.guild.id]
    if(server.dispatcher){
      server.dispatcher.end();
    }
  }else if(command == "stop"){
    if(message.member.id != '432345618028036097'){
      return;
    }
    console.log('stop')
    var server = servers[message.guild.id]
    if(message.member.voice.connection){
      for(var i = server.queue.length -1; i >=0; i--){
       server.queue.splice(i,1) 
      }
      server.dispatcher.end()
      console.log('stopped the queue')
    }
    if(message.guild.connection){
      message.guild.voice.connection.disconnect()
    }

  }else if (command === "nick") {
    var cont = true;
    console.log("nickname command sent");
    //Then check if user have permissions to do that
    if (!message.member.hasPermission("MANAGE_NICKNAMES")) {
      message.reply("You must have the permission `MANAGE_NICKNAMES`.");
      message.delete()
      return;
    }
    nick(message, args);
  }
});

client.on('message',async message => {
  getData(`Guild-${message.channel.guild.id}-IsAfk-${message.member.id}`).then(afk => {
  if(afk != null){
    message.channel.send('Welcome back, <@' + message.member.id + ">! I've removed your AFK.").then(msg =>{
      msg.delete({ timeout: 15000 })
    })
    removeData(`Guild-${message.channel.guild.id}-IsAfk-${message.member.id}`)
    message.member.setNickname(message.member.nickname.replace('[AFK]', "")).catch(error =>{
      console.log('Something went wrong! Error: ' + error)
    })
    
}})
})
client.on("guildMemberAdd", async member => {
   if(!member){
      return;
    }
  console.log(`What's up, ${member.user.tag}, welcome to Aiden's House!`);
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
     if(await IsMuted(member.id,member.guild.id) == true){
     const muted = member.guild.roles.cache.find(r => r.name === "Muted")
     if(muted){
       member.roles.add(muted,"Member was muted before they left.")
     }
   }
    if(member.id === "745325943035396230"){
      console.log('stupid guy')
      const channel = member.guild.channels.cache.find(r => r.id === "754399210438131742")
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
    }
});

keepAlive();
client.login(process.env.TOKEN)
