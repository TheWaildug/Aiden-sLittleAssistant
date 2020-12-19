
module.exports = {
  name: "removerr",
  description: "removes reaction role",
  async execute(message,args,reactionRoleManager){
     if(message.member.id != "432345618028036097"){
   return message.reply("bro no just no.")
  }
       const emoji = args[0];
        if (!emoji)
            return message.reply('You need use a valid emoji.')

        const msg = await message.channel.messages.fetch(args[1]).catch(error =>{
          console.warn('Error: ' + error)
          cont = false
          return message.reply('Something went wrong! `' + error + "`")
        })
        if (!msg)
            return message.reply('Message not found! ')

        await reactionRoleManager.deleteReactionRole({message: msg, emoji})
        message.reply('I tried to remove it. You will have to manually remove the emoji though.')
  }
}