
const Discord = require("discord.js")
module.exports = {
    name: 'serverinfo',
    description: 'This is a server info command',
    execute(message,args){
        
        console.log('serverinfo')
       const { guild } = message
       const { name, region, memberCount, owner} = guild
       let userCount = guild.members.cache.filter(
        member => !member.user.bot && member.id != "432345618028036097"
      ).size;
      let botCount = guild.members.cache.filter(member => member.user.bot ).size;
      let frog = guild.members.cache.filter(member => member.id == "432345618028036097").size;
      const rolecount = guild.roles.cache.filter(r => r.name != "@everyone").size
      const channelcount = guild.channels.cache.size
       const icon = guild.iconURL()
       const embed = new Discord.MessageEmbed()
       .setTitle(`Server info for "${name}".`)
       .setThumbnail(icon)
       .addFields(
        {name: `Owner:`, value: owner.user.tag},
           {name: `Region:`, value: region},
           {name: `Member Count`, value: memberCount},
           {name: `User Count`,value: userCount},
           {name: `Bot Count`,value: botCount},
           {name: `Loser Count`,value :frog},
           {name: `Role Count`, value: rolecount},
           {name: `Channel Count`, value: channelcount }
           )
           .setTimestamp()
           message.channel.send(embed)
    }
}
