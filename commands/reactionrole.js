function getRole(guild,role){
  const rol = guild.roles.cache.find(r => r.id == role);
  if(rol){
    return rol
  }
}
module.exports = {
  name: "reactionroles",
  description: "reaction role",
  async execute(message,args,reactionRoleManager){
  if(message.member.id != "432345618028036097"){
   return message.reply("bro no just no.")
  }
  var cont = true
  var role
    if(message.mentions.roles.first()){
      role = getRole(message.guild,message.mentions.roles.first().toLocaleString().replace("<@&","").replace(">",""))
      
    }else{
      if(args[0]){
         role = getRole(message.guild,args[0])
    }
    if(!role){
      return message.reply("duuuude @ a role of give me an id.")
    }
        const emoji = args[1];
        if (!emoji)
            return message.reply('You need use a valid emoji.')

        const msg = await message.channel.messages.fetch(args[2] || message.id).catch(error =>{
          console.warn('Error: ' + error)
          cont = false
          return message.reply('Something went wrong! `' + error + "`")
        })
        if(cont != true){
          return;
        }
        reactionRoleManager.createReactionRole({
            message: msg,
            roles: [role],
            emoji
        });
        message.reply('Done')
    }
  }
}