  const Discord = require("discord.js")
  const api = require("imageapi.js")
  module.exports = {
    name: "meme",
    description: "sends a meme from r/memes",
   async execute(message,args){
     const subreddits = [
       "memes",
       "dankmemes",
       "ComedyHeaven",
     ]
     const subreddit = subreddits[Math.floor(Math.random() * (subreddits.length))]
     console.log(subreddit)
     const image = await api(subreddit.toLocaleString());
     if(!image){
       return message.reply('Something went wrong! Image not found.')
     }
  console.log(image); // logs the image;
         const exampleEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Here's a meme from r/${subreddit}`)
            .setURL(`https://reddit.com/r/${subreddit}`)
            .setImage(image)
            .setTimestamp();
      
     message.channel.send(exampleEmbed)
   }
  }
  