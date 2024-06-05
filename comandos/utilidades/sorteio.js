const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "sorteo", // Coloque o nome do comando
  description: "Crea un sorteo en el servidor.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "premio",
      type: Discord.ApplicationCommandOptionType.String,
      description: "Cual sera el premio?",
      required: true,
    },
    {
      name: "descripcion",
      type: Discord.ApplicationCommandOptionType.String,
      description: "Describe lo que se dibujará..",
      required: true,
    },
    {
      name: "tiempo",
      type: Discord.ApplicationCommandOptionType.String,
      description: "Selecciona el tiempo del sorteo.",
      required: true,
      choices: [
        {
          name: "30 Segundos",
          value: "30s",
        },
        {
          name: "1 Minuto",
          value: "1m",
        },
        {
          name: "5 Minutos",
          value: "5m",
        },
        {
          name: "10 Minutos",
          value: "10m",
        },
        {
          name: "15 Minutos",
          value: "15m",
        },
        {
          name: "30 Minutos",
          value: "30m",
        },
        {
          name: "45 Minutos",
          value: "45m",
        },
        {
          name: "1 Hora",
          value: "1h",
        },
        {
          name: "2 Horas",
          value: "2h",
        },
        {
          name: "5 Horas",
          value: "5h",
        },
        {
          name: "12 Horas",
          value: "12h",
        },
        {
          name: "1 Dia",
          value: "24h",
        },
        {
          name: "3 dias",
          value: "72h",
        },
        {
          name: "1 Semana",
          value: "168h",
        },
      ],
    },
  ],

  run: async (client, interaction, args) => {
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {

      interaction.reply({ content: `No tienes permiso para usar este comando.`, ephemeral: true })

    } else {
      let premio = interaction.options.getString("premio");
      let tempo = interaction.options.getString("tiempo");
      let desc = interaction.options.getString("descripcion");

      let duracao = ms(tempo);

      let button = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("boton")
          .setEmoji("🎉")
          .setStyle(Discord.ButtonStyle.Secondary)
      );

      let click = [];

      let embed = new Discord.EmbedBuilder()
        .setAuthor({ name: `Nuevo sorteo!`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setDescription(`> Patrocinador: ${interaction.user}.
> Premio: **${premio}.**

> _${desc}_

> Tiempo: \`${tempo}\`.
Haz clic en el botón para participar.\n**Buena suerte!!!**`)
        .setTimestamp(Date.now() + ms(tempo))
        .setFooter({ text: "Fecha del sorteo:" })
        .setColor("Random");

      let erro = new Discord.EmbedBuilder()
        .setColor("Red")
        .setDescription(`No se puede promocionar el sorteo.!`);

      const msg = await interaction.reply({ embeds: [embed], components: [button] }).catch((e) => {
          interaction.reply({ embeds: [erro] });
        });

      const coletor = msg.createMessageComponentCollector({
        time: ms(tempo),
      });

      coletor.on("end", (i) => {
        interaction.editReply({ components: [
            new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                  .setDisabled(true)
                  .setCustomId("boton")
                  .setEmoji("🎉")
                  .setStyle(Discord.ButtonStyle.Secondary)
              )
          ] });
      });

      coletor.on("collect", (i) => {

        if (i.customId === "boton") {

          if (click.includes(i.user.id)) return i.reply({ content: `Hola ${interaction.user}, ya estás participando en el sorteo.`, ephemeral: true });

          click.push(i.user.id);

          interaction.editReply({ embeds: [embed] });

          i.reply({ content: `Hola ${interaction.user}, entraste al sorteo.`, ephemeral: true });
        }

      });

      setTimeout(() => {
        let ganhador = click[Math.floor(Math.random() * click.length)];

        if (click.length == 0) return interaction.followUp(`\n**SORTEO CANCELADO!**\nNo hubo participantes en el sorteo. \`${premio}\`.`);

        interaction.followUp(`**Felicidades <@${ganhador}> tú ganaste el sorteo de: \`${premio}\`.**`);

      }, duracao);
    }
  },
};
