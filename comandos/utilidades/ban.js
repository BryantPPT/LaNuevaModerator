const Discord = require("discord.js")

module.exports = {
  name: "ban", // Coloque o nome do comando
  description: "Banea un usuario", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "usuario",
        description: "Mencionar a un usuario para ser baneado.",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: "motivo",
        description: "Escriba su motivo.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
        interaction.reply(`No tienes permiso para usar este comando.`);
    } else {
        let userr = interaction.options.getUser("usuario");
        let user = interaction.guild.members.cache.get(userr.id)
        let motivo = interaction.options.getString("motivo");
        if (!motivo) motivo = "No definido.";

        let embed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setDescription(`El usuario ${user} (\`${user.id}\`) fue baneado con éxito!`);

        let erro = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`No se puede banear al usuario ${user} (\`${user.id}\`) del servidor!`);

        user.ban({ reason: [motivo] }).then( () => {
            interaction.reply({ embeds: [embed] })
        }).catch(e => {
            interaction.reply({ embeds: [erro] })
        })
    }

  }
}