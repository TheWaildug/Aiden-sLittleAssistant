module.exports = {
  name:"unban",
  description: "accidents happen",
  execute(message,args,client){
    console.log("unban command sent");
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      message.reply("You must have the permission `BAN_MEMBERS`.");
      message.delete
      return;
    }
    if (!args[0]) return message.channel.send("Uh oh. That didn't work!");
    client.users.fetch(args[0]).then(member => {
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
    msg.delete({timeout: 10000})
  })
  message.delete()
      }
    });
  }
}