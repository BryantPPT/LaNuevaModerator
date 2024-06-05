const Discord = require("discord.js")

module.exports = {
  name: "say", // Coloque o nome do comando
  description: "¿Qué debería decir por ti?", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "embed",
        description: "Hablaré por embed",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    },
    {
        name: "normal",
        description: "hablaré sin embed",
        type: Discord.ApplicationCommandOptionType.String,
        required: false,
    }
],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
        interaction.reply({ content: `No tienes permiso para usar este comando.`, ephemeral: true })
    } else {
        let embed_fala = interaction.options.getString("embed");
        let normal_fala = interaction.options.getString("normal");
        
        if (!embed_fala && !normal_fala) {
            interaction.reply(`Escribe al menos una de las opciones..`)
        } else {
            if (!embed_fala) embed_fala = "⠀";
            if (!normal_fala) normal_fala = "⠀";

            let embed = new Discord.EmbedBuilder()
            .setColor("Green")
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(embed_fala);

            if (embed_fala === "⠀") {
                interaction.reply({ content: ` Tu mensaje fue enviado!`, ephemeral: true })
                interaction.channel.send({ content: `${normal_fala}` })
            } else if (normal_fala === "⠀") {
                interaction.reply({ content: ` Tu mensaje fue enviado!`, ephemeral: true })
                interaction.channel.send({ embeds: [embed] })
            } else {
                interaction.reply({ content: ` Tu mensaje fue enviado!`, ephemeral: true })
                interaction.channel.send({ content: `${normal_fala}`, embeds: [embed] })
            }
        }
    }


  }
}