const Discord = require("discord.js")

const config = require('../../config.json')

module.exports = {
  name: "botinfo", // Coloque o nome do comando
  description: "Proporciona información sobre el bot.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    let dono = config.ownerId; 
    let membros = client.users.cache.size;
    let servidores = client.guilds.cache.size;
    let canais = client.channels.cache.size;
    let bot = client.user.tag;
    let avatar_bot = client.user.displayAvatarURL({ dynamic: true });
    let linguagem = "JavaScript";
    let livraria = "Discord.Js";
    let ping = client.ws.ping;

    let embed = new Discord.EmbedBuilder()
    .setColor("Green")
    .setAuthor({ name: bot, iconURL: avatar_bot })
    .setFooter({ text: bot, iconURL: avatar_bot })
    .setTimestamp(new Date())
    .setThumbnail(avatar_bot)
    .setDescription(`Hola ${interaction.user}, vea mis informaciones abajo:\n\n> 🤖 Nombre: \`${bot}\`.\n> 🤖 Dueño: ${client.users.cache.get(dono)}.
\n> ⚙ Miembros: \`${membros}\`.\n> ⚙ Servidores: \`${servidores}\`.\n> ⚙ Canales: \`${canais}\`.\n> ⚙ Ping: \`${ping}\`.
\n> 📚 Lenguaje de programación: \`${linguagem}\`.\n> 📚 Libreria: \`${livraria}\`.`);

    interaction.reply({ embeds: [embed] })


  }
}