const Discord = require("discord.js")

module.exports = {
    name: "clear", // Coloque o nome do comando
    description: "Limpiar textos de los canales", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'cantidad',
            description: 'Número de mensajes a eliminar.',
            type: Discord.ApplicationCommandOptionType.Number,
            required: true,
        }
    ],

    run: async (client, interaction) => {

        let numero = interaction.options.getNumber('cantidad')

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            interaction.reply({ content: `No tienes permiso para usar este comando.`, ephemeral: true })
        } else {

            if (parseInt(numero) > 99 || parseInt(numero) <= 0) {

                let embed = new Discord.EmbedBuilder()
                    .setColor("Green")
                    .setDescription(`\`/clear [1 - 99]\``);

                interaction.reply({ embeds: [embed] })

            } else {

                interaction.channel.bulkDelete(parseInt(numero))

                let embed = new Discord.EmbedBuilder()
                    .setColor("Green")
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setDescription(`El canal de texo ${interaction.channel} tiene \`${numero}\` mensajes eliminados por \`${interaction.user.username}\`.`);

                interaction.reply({ embeds: [embed] })

                let apagar_mensagem = "no" // sim ou nao

                if (apagar_mensagem === "si") {
                    setTimeout(() => {
                        interaction.deleteReply()
                    }, 5000)
                } else if (apagar_mensagem === "no") {
                    return;
                }

            }

        }

    }
}