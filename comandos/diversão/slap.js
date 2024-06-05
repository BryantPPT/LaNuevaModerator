const Discord = require('discord.js')
module.exports = {
    name: "galleta",
    description: "Dale una galleta a una persona.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "miembro",
            description: "Mencione un miembro.",
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        }
    ],
    run: async (client, interaction, args) => {

        let user = interaction.options.getUser("miembro")

        var lista1 = [
            'https://media.discordapp.net/ephemeral-attachments/1227181806814494754/1232751832426877102/banner_movimiento.gif?ex=662b41dc&is=6629f05c&hm=9626b3ee0ce080b80cf308163ad2ec2bd03f03f89c758fe87be8803ec3018ac8&=',
            'https://media.discordapp.net/ephemeral-attachments/1227181806814494754/1232751832426877102/banner_movimiento.gif?ex=662b41dc&is=6629f05c&hm=9626b3ee0ce080b80cf308163ad2ec2bd03f03f89c758fe87be8803ec3018ac8&=',
            'https://media.discordapp.net/ephemeral-attachments/1227181806814494754/1232751832426877102/banner_movimiento.gif?ex=662b41dc&is=6629f05c&hm=9626b3ee0ce080b80cf308163ad2ec2bd03f03f89c758fe87be8803ec3018ac8&=',
            'https://media.discordapp.net/ephemeral-attachments/1227181806814494754/1232751832426877102/banner_movimiento.gif?ex=662b41dc&is=6629f05c&hm=9626b3ee0ce080b80cf308163ad2ec2bd03f03f89c758fe87be8803ec3018ac8&=',
            'https://media.discordapp.net/ephemeral-attachments/1227181806814494754/1232751832426877102/banner_movimiento.gif?ex=662b41dc&is=6629f05c&hm=9626b3ee0ce080b80cf308163ad2ec2bd03f03f89c758fe87be8803ec3018ac8&='
        ];

        var lista2 = [
            'https://media.discordapp.net/ephemeral-attachments/1227181806814494754/1232751832426877102/banner_movimiento.gif?ex=662b41dc&is=6629f05c&hm=9626b3ee0ce080b80cf308163ad2ec2bd03f03f89c758fe87be8803ec3018ac8&=',
            'https://media.discordapp.net/ephemeral-attachments/1227181806814494754/1232751832426877102/banner_movimiento.gif?ex=662b41dc&is=6629f05c&hm=9626b3ee0ce080b80cf308163ad2ec2bd03f03f89c758fe87be8803ec3018ac8&=',
            'https://media.discordapp.net/ephemeral-attachments/1227181806814494754/1232751832426877102/banner_movimiento.gif?ex=662b41dc&is=6629f05c&hm=9626b3ee0ce080b80cf308163ad2ec2bd03f03f89c758fe87be8803ec3018ac8&=',
            'https://media.discordapp.net/ephemeral-attachments/1227181806814494754/1232751832426877102/banner_movimiento.gif?ex=662b41dc&is=6629f05c&hm=9626b3ee0ce080b80cf308163ad2ec2bd03f03f89c758fe87be8803ec3018ac8&=',
            'https://media.discordapp.net/ephemeral-attachments/1227181806814494754/1232751832426877102/banner_movimiento.gif?ex=662b41dc&is=6629f05c&hm=9626b3ee0ce080b80cf308163ad2ec2bd03f03f89c758fe87be8803ec3018ac8&='
        ];

        var random1 = lista1[Math.floor(Math.random() * lista1.length)];
        var random2 = lista2[Math.floor(Math.random() * lista2.length)];

        const embed = new Discord.EmbedBuilder()
            .setDescription(`**${interaction.user} le dió una galleta a ${user}.**`)
            .setImage(`${random1}`)
            .setColor("Green")

        const button = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('1')
                    .setLabel('Devolver')
                    .setStyle(Discord.ButtonStyle.Primary)
                    .setDisabled(false)

            )

        const embed1 = new Discord.EmbedBuilder()
            .setDescription(`**${user} le devolvío la galleta a ${interaction.user}.**`)
            .setColor("Green")
            .setImage(`${random2}`)

        interaction.reply({ embeds: [embed], components: [button] }).then(() => {

            const filter = i => i.customId === '1' && i.user.id === user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1 });

            collector.on('collect', async i => {
                if (i.customId === '1') {
                    i.reply({ embeds: [embed1] })
                }
            });

            collector.on("end", () => {
                interaction.editReply({
                    components: [
                        new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                    .setCustomId('1')
                                    .setLabel('Devolver')
                                    .setStyle(Discord.ButtonStyle.Primary)
                                    .setDisabled(true)

                            )
                    ]
                })
            })

        })
    }
}
