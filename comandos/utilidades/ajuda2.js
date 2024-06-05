const Discord = require("discord.js")

const config = require("../../config.json")

module.exports = {
  name: "ayuda", // Coloque o nome do comando
  description: "Panel de comandos del bot.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    let embed_painel = new Discord.EmbedBuilder()
    .setColor(config.embedgeral)
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
    .setDescription(`Hola ${interaction.user}, vea mis comandos interactuando con el panel de abajo:`);

    let embed_utilidade = new Discord.EmbedBuilder()
    .setColor(config.embedgeral)
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
    .setDescription(`Hola ${interaction.user}, vea mis comandos de **utilidad** a continuación:
    **ayuda** - _ver todos los comandos_
    **anunciar** - _anunciar algo_
    **ban** - _banear algún usuario_
    **botinfo** - _ver información del bot_
    **addrol** -  _sistema de colocación de una posición mediante botón_
    **clear** - _eliminar una cierta cantidad de mensajes_
    **dm** - _el bot envía un mensaje a una determinada persona_
    **encuesta** - _para crear encuestas_
    **kick** - _expulsar algún usuario_
    **bloquear** - _bloquear algún chat_
    **ping** - _ping del bot_
    **say** - _hazme decir algo con/sin embed_
    **setnick** - _cambiar el nombre de un usuario_
    **setstatus** - _modificar el estado del bot_
    **modolento** - _elegir tiempo de chat_
    **sorteo** - _sistema de sorteos_
    **ticket** - _sistema de ticket_
    **transcript** - _transforme un chat en html_
    **unban** - _desbanear un usuario_
    **unlock** - _desbloquear un chat_`);

    let embed_diversao = new Discord.EmbedBuilder()
    .setColor(config.embedgeral)
    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynmiac: true }) })
    .setDescription(`Hola ${interaction.user}, vea mis comandos de **diversión** abajo:
    **cartera** - _revise su saldo en su cartera!_
    **culebrita** - _juegue a la culebrita_
    **diario** - _reciba sus monedas diaras_
    **abrazo** - _abraza a un usuario_
    **besar** - _besa a un usuario_
    **memorizar** - _juega al juego de memorizar cartas_
    **mina** - _juega el juego de minas bombas_
    **serverinfo** - _vea las informaciones del servidor_
    **galleta** - _dale una cachetada a un usuario_
    **userinfo** - _vea las informaciones de un usuario_`);

    let painel = new Discord.ActionRowBuilder().addComponents(
        new Discord.SelectMenuBuilder()
            .setCustomId("painel_help")
            .setPlaceholder("Presione aquí para ver las opciones!")
            .addOptions(
                {
                    label: "Panel Inicial",
                    //description: "",
                    emoji: "📖",
                    value: "painel"
                },
                {
                    label: "Utilidad",
                    description: "Vea mis comandos de utilidad.",
                    emoji: "✨",
                    value: "utilidade"
                },
                {
                    label: "Diversión",
                    description: "Vea mis comandos de diversión.",
                    emoji: "😅",
                    value: "diversao"
                }
            )
    )

    interaction.reply({ embeds: [embed_painel], components: [painel], ephemeral: true }).then( () => {
        interaction.channel.createMessageComponentCollector().on("collect", (c) => {
            let valor = c.values[0];

            if (valor === "painel") {
                c.deferUpdate()
                interaction.editReply({ embeds: [embed_painel] })
            } else if (valor === "utilidade") {
                c.deferUpdate()
                interaction.editReply({ embeds: [embed_utilidade] })
            } else if (valor === "diversao") {
                c.deferUpdate()
                interaction.editReply({ embeds: [embed_diversao] })
            }
        })
    })


    
  }
}