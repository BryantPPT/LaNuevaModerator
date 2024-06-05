const Discord = require("discord.js")

const config = require('../../config.json')

module.exports = {
  name: "ticket", // Coloque o nome do comando
  description: "Abra el panel de tickets.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `No tienes permiso para usar este comando!`, ephemeral: true })
    } else {
        let embed = new Discord.EmbedBuilder()
        .setColor(config.embedgeral)
        .setTitle('***TICKETS LA NUEVA ROLEPLAY***')
        .setImage('https://media.discordapp.net/attachments/1116616140484001853/1237771862700720192/la_nueva_gif.gif?ex=663cdc60&is=663b8ae0&hm=110c2d642390c42d5fdd4f6901cb07aff0ece5501313e9bdec8ddabfb584ea66&=')
        .setThumbnail('https://media.discordapp.net/attachments/1116616140484001853/1237771837744877598/logo_png.png?ex=663cdc5a&is=663b8ada&hm=b8802a9e25ad42d4be60ab7db257f07e31879711fe693d7ef54ab88050229619&=&format=webp&quality=lossless')
        .setDescription(`***ESTO SOLO DEBE SER CREADO CON UNA BUENA BASE DE SU REPORTA, AYUDA O DUDA.***\n\n- ***AYUDA:*** _Si necesitas ayuda con ciertas cosas del server puedes comentarlo en este ticket._\n- ***DUDAS:*** _Esta opción es válida para recibir informaciones sobre sus dudas inquietantes._\n- ***REPORTES:*** _Esta opción es valida para reportar bugs, admins o jugadores del server de mta como de discord._\n\n ***FAVOR DE NO DARLE MAL USO A LOS TICKETS O ABRIRLOS SIN NECESIDAD DE HACERLO, SOLO POR QUERER PROBAR A VER SI ABREN. SI LE LLEGAN A DAR MAL USO LLEVARÁ SU SANCIÓN POR NO RESPETAR LA REGLA.*** ||@everyone||`);

        let painel = new Discord.ActionRowBuilder().addComponents(
            new Discord.SelectMenuBuilder()
            .setCustomId("painel_ticket")
            .setPlaceholder("Presione aquí para las opciones!")
            .addOptions(
                {
                    label: (config.ticket.ticket1.nome),
                    description: (config.ticket.ticket1.desc),
                    value: "opc1"
                },
                {
                    label: (config.ticket.ticket2.nome),
                    description: (config.ticket.ticket2.desc),
                    value: "opc2"
                },
                {
                    label: (config.ticket.ticket3.nome),
                    description: (config.ticket.ticket3.desc),
                    value: "opc3"
                }
            )
        );

        interaction.reply({ content: `✅ Panel enviado!`, ephemeral: true })
        interaction.channel.send({ embeds: [embed], components: [painel] })
    }


  }
}