const Discord = require("discord.js");
const config = require("../../config.json")
const DONO = config.ownerId; // ID do Owner

module.exports = {
    name: "setstatus",
    description: "Configure mi estado.",
    options: [
        {
            type: Discord.ApplicationCommandOptionType.String,
            name: "estado",
            description: "¿Qué estilo quieres aplicar (online, dnd, idle, invisible)?",
            required: true,
        },
        {
            type: Discord.ApplicationCommandOptionType.String,
            name: "descripcion",
            description: "¿Cuál será la descripción del estado??",
            required: true,
        }
    ],

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) return interaction.reply({ content: `Apenas quem tem permissão de **gerenciar servidor**pode utilizar este comando!`, ephemeral: true })

        try {

            let status = interaction.options.getString("estado");
            let desc = interaction.options.getString("descripcion");

            client.user.setStatus(`${status}`);

            client.user.setPresence({
                activities: [{
                    name: desc
                }],
            });

            let embed = new Discord.EmbedBuilder()
            .setColor("Green")
            .setTitle("Estado actualizado!")
            .addFields(
                {
                    name: `🔮 Cambié mi estado a:`,
                    value: `\`${status}\`.`,
                    inline: false
                },
                {
                    name: `📝 Cambié mi descripción a:`,
                    value: `\`${desc}\`.`,
                    inline: false
                }
            )

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            return console.log(`Ops ${interaction.user}, algo salió mal al ejecutar este comando.`)
        }
    }
}