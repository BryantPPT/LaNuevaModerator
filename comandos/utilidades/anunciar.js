const Discord = require("discord.js")

module.exports = {
  name: "anunciar", // Coloque o nome do comando
  description: "Anuncie algo en un embed.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "título",
        description: "Escriba algo.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: "descripción",
        description: "Escriba algo.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: "chat",
        description: "Mencione un canal.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true,
    },
    {
        name: "color",
        description: "Coloque un color en hexadecimal (#00ff00).",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `No tienes permiso para usar este comando.`, ephemeral: true })
    } else {
        let titulo = interaction.options.getString("título")
        let desc = interaction.options.getString("descripción")
        let cor = interaction.options.getString("color")
        if (!cor) cor = "Random"
        let chat = interaction.options.getChannel("chat")
        if (Discord.ChannelType.GuildText !== chat.type) return interaction.reply(`❌ Este canal no es un canal de texto para enviar un mensaje..`)

        let embed = new Discord.EmbedBuilder()
        .setTitle(titulo)
        .setDescription(desc)
        .setColor(cor);

        chat.send({ embeds: [embed] }).then( () => { 
            interaction.reply(`✅ Su anuncio fue enviado a ${chat} con éxito.`)
        }).catch( (e) => {
            interaction.reply(`❌ Algo dió error.`)
        })
    }

  }
}