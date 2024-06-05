const { TextInputStyle } = require(`discord.js`)
const { InteractionType } = require(`discord.js`)
const Discord = require(`discord.js`)

module.exports = {
    name: `embed`,
    description: `🛠️ Embed Modernos`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "chat",
            description: "Mencione un canal.",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        },
    ],
    run: async(client, interaction) => {

      if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages))
        return interaction.reply({
            content: `**${interaction.user}, Necesitas permiso \`Administrar mensajes\` para usar este comando!**`,
            ephemeral: true,
        })

        const modal = new Discord.ModalBuilder()
        .setCustomId(`Embed`)
        .setTitle(`Crear embed 🔪`)
        const TítuloEmbed = new Discord.TextInputBuilder()
        .setCustomId(`TítuloEmbed`)
        .setLabel(`Titulo del embed`)
        .setPlaceholder(`Escriba el titulo del Embed.`)
        .setStyle(TextInputStyle.Short)
        const DescriçãoEmbed = new Discord.TextInputBuilder()
        .setCustomId(`DescriçãoEmbed`)
        .setLabel(`Descripción del embed`)
        .setPlaceholder(`Escriba la descripción del Embed`)
        .setStyle(TextInputStyle.Paragraph)
        const CorEmbed = new Discord.TextInputBuilder()
        .setCustomId(`CorEmbed`)
        .setLabel(`Color de su embed`)
        .setPlaceholder(`Escriba el color de su embed`)
        .setStyle(TextInputStyle.Short)

        





        const PrimeiraActionRow = new Discord.ActionRowBuilder().addComponents(TítuloEmbed);
        const SegundaActionRow = new Discord.ActionRowBuilder().addComponents(DescriçãoEmbed);
        const TerceiraActionRow = new Discord.ActionRowBuilder().addComponents(CorEmbed);


        let chat = interaction.options.getChannel("chat")

        modal.addComponents(PrimeiraActionRow, SegundaActionRow, TerceiraActionRow,)

        await interaction.showModal(modal);

        client.once(`interactionCreate`, async interaction => {
        if (!interaction.isModalSubmit()) return;

        if (interaction.customId === `Embed`) {

        const DescriçãoEmbed = interaction.fields.getTextInputValue(`DescriçãoEmbed`);
        const TítuloEmbed = interaction.fields.getTextInputValue(`TítuloEmbed`);
        const CorEmbed = interaction.fields.getTextInputValue(`CorEmbed`);

        let embedModal1 = new Discord.EmbedBuilder()
        .setColor(`${CorEmbed}`)
        .setTitle(`${TítuloEmbed}`)
        .setDescription(`${DescriçãoEmbed}`)
        
        
        interaction.reply({
            content: `**:green_heart: Embed Submetida com sucesso.**`, ephemeral: true
        })
        
       
        chat.send({
           embeds: [embedModal1]
        }).catch( (e) => {
            interaction.reply({ content: ` :green_heart: Algo dió error, intente nuevamente...`,ephemeral: true })
        })

    }

});


    }
}