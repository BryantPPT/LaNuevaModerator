const Discord = require("discord.js")

module.exports = {
  name: "kick", // Coloque o nome do comando
  description: "Expulsar a un miembro del servidor.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "miembro",
        description: "Menciona a un miembro.",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: "motivo",
        description: "Describa el motivo de la expulsión..",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.KickMembers)) {
        interaction.reply({ content: `No tienes permiso para usar este comando.`, epemeral: true })
    } else {
        const user = interaction.options.getUser("miembro")
        const membro = interaction.guild.members.cache.get(user.id)

        let motivo = interaction.options.getString("motivo")
        if (!motivo) motivo = "No informado"

        let embed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setDescription(`El usuario ${membro} fue expulsado exitosamente!\n\n> Motivo: \`${motivo}\`.`)

        let embed_erro = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`El usuario ${membro} no fue expulsado del servidor!\nSe produjo un error al ejecutar este comando, inténtelo nuevamente.`);

        membro.kick(motivo).then( () => {
            interaction.reply({ embeds: [embed] })
        }).catch(e => {
            interaction.reply({ embeds: [embed_erro] })
        })
    }


  }
}