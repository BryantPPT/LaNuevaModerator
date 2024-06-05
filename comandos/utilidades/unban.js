const Discord = require("discord.js")

module.exports = {
  name: "unban", // Coloque o nome do comando
  description: "Desbanear a un usuario que ha sido baneado", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "usuario",
        description: "Mencionar a un usuario para que sea desbaneado.",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: "motivo",
        description: "Escriba un motivo.",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
        interaction.reply(`No tienes permiso para usar este comando.`);
    } else {
        let user = interaction.options.getUser("usuario");
        let motivo = interaction.options.getString("motivo");
        if (!motivo) motivo = "No definido.";

        let embed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setDescription(`El usuário ${user} (\`${user.id}\`) fue desbaneado exitosamente!`);

        let erro = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`No se puede desbanear al usuario ${user} (\`${user.id}\`) del servidor!`);

        interaction.guild.members.unban(user.id, motivo).then( () => {
            interaction.reply({ embeds: [embed] })
        }).catch(e => {
            interaction.reply({ embeds: [erro] })
        })
    }

  }
}