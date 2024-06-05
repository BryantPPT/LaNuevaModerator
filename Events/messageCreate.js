const Discord = require('discord.js')
const client = require('../index')

client.on("messageCreate", (message) => {
    if (message.author.bot) return;
  
    let mencoes = [`<@${client.user.id}>`, `<@!${client.user.id}>`]
  
    mencoes.forEach(element => {
      if (message.content === element) {
  
        //(message.content.includes(element))
  
        let embed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynaimc: true }) })
        .setDescription(`${message.author}Eres gay, sigues etiquetando a bot, ¿eres esquizofrénico? tu mono negro, chupa la polla`)
        
        message.reply({ embeds: [embed] })
      }
    })
  
  })