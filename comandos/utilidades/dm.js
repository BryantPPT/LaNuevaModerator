const Discord = require("discord.js")

module.exports = {
  name: "dm", // Coloque o nome do comando
  description: "Enviaré un mensaje en el DM de alguien para ti", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "usuario",
        description: "Menciona a un usuario.",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: "mensaje",
        description: "Escribe algo para enviar.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `No tienes permiso para usar este comando!`, ephemeral: true })
    } else {
        let user = interaction.options.getUser("usuario");
        let msg = interaction.options.getString("mensaje");

        let embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`${msg}`);

        user.send({ embeds: [embed] }).then( () => {
            let emb = new Discord.EmbedBuilder()
            .setColor("Green")
            .setDescription(`Hola ${interaction.user}, el mensaje fue enviado a ${user} exitosamente!`);

            interaction.reply({ embeds: [emb] })
        }).catch(e => {
            let emb = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`Hola ${interaction.user}, el mensaje no fue enviado a ${user}, ya que el usuario tiene su DM cerrado!`);

            interaction.reply({ embeds: [emb] })
        })
    }


  }
}