const Discord = require("discord.js")
const transcript = require('discord-html-transcripts') 

module.exports = {
    name: 'transcript', // Coloque o nome do comando
    description: 'Transcribe todos los mensajes de este canal a un archivo html..', // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        const canalTranscript = interaction.channel // Canal que será feito o transcript

        const attachment = await transcript.createTranscript(canalTranscript,
            {
                limit: -1, // Quantidade máxima de mensagens a serem buscadas. `-1` busca recursivamente.
                returnType: 'attachment', // Opções válidas: 'buffer' | 'string' | 'attachment' Padrão: 'attachment' OU use o enum ExportReturnType
                filename: `${canalTranscript.name}.html`, // Válido apenas com returnType é 'attachment'. Nome do anexo.
                saveImages: true, // Baixe todas as imagens e inclua os dados da imagem no HTML (permite a visualização da imagem mesmo depois de deletada) (! VAI AUMENTAR O TAMANHO DO ARQUIVO!)
                footerText: 'Fueron exportados {number} mensajes{s}!', // Altere o texto no rodapé, não se esqueça de colocar {number} para mostrar quantas mensagens foram exportadas e {s} para plural
                poweredBy: true // Se deve incluir o rodapé "Powered by discord-html-transcripts"
            })

        const embed = new Discord.EmbedBuilder()
        .setColor('Random')
        .setDescription(`Transcript del canal \`${canalTranscript.name}\` creado:`)

        interaction.reply({ embeds: [embed], files: [attachment] })

    }
}