const Discord = require("discord.js")

module.exports = {
  name: "addrol", // Coloque o nome do comando
  description: "Sistema de suma de roles por reacción.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "rol",
        description: "Mencione el rol que desea agregar en el botón.",
        type: Discord.ApplicationCommandOptionType.Role,
        required: true,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageRoles)) {
        interaction.reply({ content: `No tienes permiso para usar este comando.`, ephemeral: true })
    } else {
        let cargo = interaction.options.getRole("rol");

        let embed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setDescription(`Haga clic en el botón de abajo para canjear el rol **${cargo.name}**.`);

        let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("rol_b" + interaction.id)
            .setLabel("Presiona aquí")
            .setStyle(Discord.ButtonStyle.Secondary)
        );

        interaction.reply({ embeds: [embed], components: [botao] }).then( () => {

            let coletor = interaction.channel.createMessageComponentCollector();

            coletor.on("collect", (c) => {
                if (!c.member.roles.cache.get(cargo.id)) {
                    c.member.roles.add(cargo.id)
                    c.reply({ content: `Hola **${c.user.username}**, recogiste el rol **${cargo.name}**.`, ephemeral: true })
                } else if (c.member.roles.cache.get(cargo.id)) {
                    c.member.roles.remove(cargo.id)
                    c.reply({ content: `Hola **${c.user.username}**, perdiste el rol **${cargo.name}**.`, ephemeral: true })
                }
                
            })
        })
    }


  }
}