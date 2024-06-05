const Discord = require("discord.js")

module.exports = {
  name: "desbloquear", // Coloque o nome do comando
  description: "Desbloquee un canal.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "canal",
        description: "Menciona un canal para desbloquear el chat..",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {
        interaction.reply({ content: `No tienes permiso para usar este comando.`, ephemeral: true })
    } else {
        const canal = interaction.options.getChannel("canal")

        canal.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true }).then( () => {
            interaction.reply({ content: `🔓 El canal de texto ${canal} fue desbloqueado!` })
            if (canal.id !== interaction.channel.id) return canal.send({ content: `🔓 Este canal fue desbloqueado!` })
        }).catch(e => {
            interaction.reply({ content: `❌ Ops, algo dió error.` })
        })
    }
    
  }
}