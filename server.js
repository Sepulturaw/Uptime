require("express")().listen(1343);

const db = require("quick.db"); 
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login("Tokeniniz");
const fetch = require("node-fetch");
const fs = require('fs')

setInterval(() => {
  var links = db.get("linkler");
  if(!links) return 
  var linkA = links.map(c => c.url)
  linkA.forEach(link => {
    try {
      fetch(link)
    } catch(e) { console.log("" + e) };
  })
  console.log("Succesfuly Pinged.")
}, 60000)

client.on("ready", () => {
if(!Array.isArray(db.get("linkler"))) {
db.set("linkler", [])
}
})

client.on("ready", () => {
  client.user.setActivity(`I'm Ready Uptime`)
  console.log(`Logined`)
})


client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "u!uptime") {
  var link = spl[1]
  fetch(link).then(() => {
    if(db.get("linkler").map(z => z.url).includes(link)) return message.channel.send("**⛔ Already Attached to !!**")
    
    let yardım = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(0x6A3DB8)
        .setDescription("**✅ Successful Uptimed Boss !**")
        .setFooter(`© ${client.user.username}`, client.user.avatarURL)
        .setTimestamp()
     message.channel.send(yardım).then(msg => msg.delete(60000)); //60000/60 saniye sonra verilen yanıtı siler
    db.push("linkler", { url: link, owner: message.author.id})
  }).catch(e => {
    let yardım = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(0x6A3DB8)
        .setDescription("⛔ **Error Only Absolute URL's Supported.**")
        .setFooter(`© ${client.user.username}`, client.user.avatarURL)
        .setTimestamp()
   return message.channel.send(yardım).then(msg => msg.delete(60000)); //60000/60 saniye sonra verilen yanıtı siler
  })
  }
})


client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "u!botcount") {
  var link = spl[1]
 message.channel.send(`**${db.get("linkler").length} / 1000**`)
}})



const Discord = require('discord.js');

client.on("message", message => {
  if(message.author.bot) return;
    var spl = message.content.split(" ");
  if(spl[0] == "u!help") {
let embed = new Discord.RichEmbed()
.setColor('#070706')
.addField(`Discord Uptime Bot Yardım Sistemi`, `Discord Botlarınız Benim Sayemde 7/24`)
.setDescription(`**Komutlar**

 🌙 **u!help**  | İnforms About Commands.

 🔋 **u!uptime**  | Uptime Your Bot

 ⚡ **u!botsay** | Check How Many Bots Are İn The System

`)
.setAuthor(`Uptime`, client.user.avatarURL)
.setFooter(`Best Store`, client.user.avatarURL)
return message.channel.send(embed);
    }
 
})

  const log = message => {
  console.log(`${message}`);
}
  
  