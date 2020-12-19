  const Discord = require("discord.js")
  const api = require("imageapi.js")
  module.exports = {
    name: "reddit",
    description: "sends a image from a subreddit of your choice",
   async execute(message,args){
    if(!args[0]){
      return message.reply('bro I need a subreddit')
    }
      var cont = true
     const subreddit = args[0]
     console.log(subreddit)
     const image = await api(subreddit.toLocaleString()).catch(error =>{
       cont = false
       console.log(error)
       message.reply("Something went wrong! `" + error + "`")
     })
  console.log(image)

  if(!image){
    cont = false
    return message.channel.send("I could not find an image or the subreddit does not exist.")
  }
  if(cont = false){
    return;
  }
         const exampleEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Here's a random image from r/${subreddit}`)
            .setURL(`https://reddit.com/r/${subreddit}`)
            .setImage(image)
            .setTimestamp();
      
     message.channel.send(exampleEmbed)
   }
  }
  