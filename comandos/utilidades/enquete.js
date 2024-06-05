const Discord = require("discord.js")
const ms = require('ms')

module.exports = {
  name: 'encuesta', // Coloque o nome do comando
  description: 'Crear una encuesta en el servidor.', // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: 'tiempo',
        description: 'Coloque un tiempo en s/m/d.',
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: 'título',
        description: '¿Cuál será el título de la encuesta?',
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: 'opcion1',
        description: 'Agregar opción de votación 1.',
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: 'opcion2',
        description: 'Agregar opción de votación 2.',
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
        interaction.reply({ ephemeral: true, content: 'No tienes permiso para usar este comando.' })
    } else {
        const tempo = interaction.options.getString('tiempo')
        const titulo = interaction.options.getString('título')
        const op1 = interaction.options.getString('opcion1')
        const op2 = interaction.options.getString('opcion2')

        let tempoms = ms(tempo)
        if (isNaN(tempoms)) return interaction.reply({ ephemeral: true, content: 'La opción de hora no es válida.: \`' + tempo + '\`.' })

        const emojis = ['1️⃣', '2️⃣']

        const embed = new Discord.EmbedBuilder()
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setColor('Yellow')
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setTitle('Nueva encuesta: ' + titulo)
        .setDescription(`Nueva encuesta creada por ${interaction.user} (${interaction.user.id}).\n\n>  ${emojis[0]} ${op1}\n> ${emojis[1]} ${op2}`)
        .setTimestamp(new Date(new Date().getTime() + tempoms))
        .setFooter({ text: `Final de la encuesta:`})

        interaction.reply({ ephemeral: true, content: 'Encuesta creada!' }).then( () => {
            interaction.channel.send({ embeds: [embed] }).then( (msgg) => {
                emojis.forEach(emoji => {
                    msgg.react(emoji)
                })

                setTimeout( async() => {

                    const msg = await interaction.channel.messages.fetch(msgg.id);

                    let emojiOpc1 = msg.reactions.cache.get(emojis[0])?.count || 0;
                    let emojiOpc2 = msg.reactions.cache.get(emojis[1])?.count || 0;
                    // if (msg.reactions.cache.get(emojis[0])?.me) {
                    //   emojiOpc1--
                    // }
                    // if (msg.reactions.cache.get(emojis[1])?.me) {
                    //   emojiOpc2--
                    // }

                    let win
                    if (emojiOpc1 > emojiOpc2) win = op1 + ` (Reacciones totales: \`${emojiOpc1}\`)`
                    if (emojiOpc2 > emojiOpc1) win = op2 + ` (Reacciones totales: \`${emojiOpc2}\`)`
                    if (emojiOpc1 === emojiOpc2) win = `Ambas opciones fueron votadas por igual (Reacciones totales: \`${emojiOpc1}\`).`

                    const embedOff = new Discord.EmbedBuilder()
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setColor(null)
                    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                    .setTitle('Encuesta cerrada: ' + titulo)
                    .setDescription(`Nueva encuesta creada por: ${interaction.user} (${interaction.user.id}).\n\n>  ${emojis[0]} ${op1}\n> ${emojis[1]} ${op2}`)
                    .setTimestamp(new Date(new Date().getTime() + tempoms))
                    .setFooter({ text: `Encuesta cerrada a las:`})

                    msg.reply({ content: `**Encuesta cerrada**\n\n> __Opción más votada:__ ${win}` })
                    msg.edit({ embeds: [embedOff] })
                }, tempoms)
            })
        })
    }
  }
}