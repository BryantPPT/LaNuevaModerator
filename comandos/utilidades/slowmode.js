const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
  name: "modolento", // Coloque o nome do comando
  description: "Poner modo lento en el chat", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "tiempo",
        description: "Establecer el tiempo en modo lento [s|m|h].",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: "canal",
        description: "Mencionar un canal de texto.",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: false,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {
        interaction.reply({ content: `No tienes permiso para usar este comando.`, ephemeral: true })
    } else {

        let t = interaction.options.getString("tiempo");
        let tempo = ms(t);
        let channel = interaction.options.getChannel("canal");
        if (!channel || channel === null) channel = interaction.channel;

        if (!tempo || tempo === false || tempo === null) {
            interaction.reply({ content: `Proporcionar una hora válida: [s|m|h].`, ephemeral: true })
        } else {
            channel.setRateLimitPerUser(tempo/1000).then( () => {
                interaction.reply({ content: `El canal de texto ${channel} tiene su modo lento configurado en \`${t}\`.` })
            }).catch( () => {
                interaction.reply({ content: `Vaya, algo salió mal al ejecutar este comando, verifique mis permisos.`, ephemeral: true })
            })
        }
    
    }



  }
}