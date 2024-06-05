const Discord = require("discord.js")

module.exports = {
  name: "setnick", // Coloque o nome do comando
  description: "Configurar el apodo del usuario en el servidor..", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "miembro",
        description: "Mencione um membro para alterar o nick.",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: "nick",
        description: "Ingrese el nuevo apodo del miembro.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageNicknames)) {
        interaction.reply({ content: `No tienes permiso para usar este comando.`, ephemeral: true })
    } else {
        const user = interaction.options.getUser("miembro")
        const membro = interaction.guild.members.cache.get(user.id)
        const nick = interaction.options.getString("nick")

        membro.setNickname(`${nick}`).then( () => {
            let embed = new Discord.EmbedBuilder()
            .setColor("Green")
            .setDescription(`El usuario ${user} tiene su nombre alterado a: \`${nick}\` con éxito.`)
            interaction.reply({ embeds: [embed] })
        }).catch(e => {
            let embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`El nick ingresado tiene más de 32 caracteres..`)
            interaction.reply({ embeds: [embed] })
        })
    }


  }
}