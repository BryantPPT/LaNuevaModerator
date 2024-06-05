const Discord = require("discord.js")

module.exports = {
  name: "ping", // Coloque o nome do comando
  description: "Ver el ping que hace el bot!", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    let ping = client.ws.ping;

    let embed_1 = new Discord.EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`Hey ${interaction.user}, estamos \`calculando...\`mi ping, espere...`)
    .setColor("Red");

    let embed_2 = new Discord.EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`${interaction.user}, mi ping está en \`${client.ws.ping}ms\`.`)
    .setColor("Green");

    interaction.reply({ embeds: [embed_1] }).then( () => {
        setTimeout( () => {
            interaction.editReply({ embeds: [embed_2] })
        }, 3500)
    })
  }
}