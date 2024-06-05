const Discord = require("discord.js")

module.exports = {
  name: "userinfo", // Coloque o nome do comando
  description: "Ver la información de un usuario.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "usuario",
        description: "Mencione un usuario.",
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    }
],

  run: async (client, interaction) => {

    let user = interaction.options.getUser("usuario");
    let data_conta = user.createdAt.toLocaleString();
    let id = user.id;
    let tag = user.tag;
    let is_bot = user.bot;

    if (is_bot === true) is_bot = "Si";
    if (is_bot === false) is_bot = "No";

    let embed = new Discord.EmbedBuilder()
    .setColor("Green")
    .setAuthor({ name: user.username, iconURL: user.displayAvatarURL({ dynamic: true }) })
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .setTitle("Informacion del usuario:")
    .addFields(
        {
            name: `🎇 Tag:`,
            value: `\`${tag}\`.`,
            inline: false
        },
        {
            name: `🆔 Id:`,
            value: `\`${id}\`.`,
            inline: false
        },
        {
            name: `📅 Creación de cuenta:`,
            value: `\`${data_conta}\`.`,
            inline: false
        },
        {
            name: `🤖 Es un bot?`,
            value: `\`${is_bot}\`.`,
            inline: false
        }
    );

    let botao = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
        .setURL(user.displayAvatarURL({ dynamic: true }))
        .setEmoji("📎")
        .setStyle(Discord.ButtonStyle.Link)
        .setLabel(`Avatar de ${user.username}.`)
        
    )

    interaction.reply({ embeds: [embed], components: [botao] })


    
  }
}