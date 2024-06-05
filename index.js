const Discord = require("discord.js")

const ActivityType = require('discord.js')

const config = require("./config.json")

const client = new Discord.Client({ 
  intents: [ 
Discord.GatewayIntentBits.Guilds
       ]
    });

module.exports = client

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Error`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)

   }
})

client.on('ready', () => {
  console.log(`🔥 Estoy online como: ${client.user.username}!`)

  function updatePresence(){
    const activities = [
        {name:`💙 || estoy en ${client.guilds.cache.size} servers`, type:ActivityType.Watching},
        {name:'💙 || Soporte de Tickets', type:ActivityType.Listening},
        {name:'💙 || Desenvolvido por @nhkbryant', type:ActivityType.Playing},
        {name:'💙 || Staff 24/7', type:ActivityType.Streaming},
        {name:'💙 || La Nueva RP', type:ActivityType.Competing},
        {name:'💙.gg/LaNuevaRP => Nueva vida, Nueva Ciudad.', type:ActivityType.Custom},
    ];

    const activity = activities[Math.floor(Math.random()* activities.length)];

    client.user.setActivity(activity.name, {type:activity.type});
}

setInterval(updatePresence, 10000) // 5 Segundos
})


client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.token)

const { QuickDB } = require("quick.db")
const db = new QuickDB(); // npm i quick.db better-sqlite3

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  let confirm = await db.get(`antilink_${message.guild.id}`);
  if (confirm === false || confirm === null) {
    return;
  } else if (confirm === true) {
    if (message.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) return; // Caso o usuário tenha permissão de ADM, o bot vai permitir que o mesmo envie links
    if (message.content.toLocaleLowerCase().includes("http")) {
      message.delete()
      message.channel.send(`${message.author} No envies links en el servidor!`)
    }

  }
})

client.on("interactionCreate", (interaction) => {
  if (interaction.isSelectMenu()) {
    if (interaction.customId === "painel_ticket") {
      let opc = interaction.values[0]
      if (opc === "opc1") {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Nova opção

        let nome = `📨-${interaction.user.username}`;
        let categoria = config.ticket.ticket1.categoria // Coloque o ID da categoria

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === nome)) {
          interaction.reply({ content: `❌ Ya tienes un tickets abierto en: ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
        } else {
          interaction.guild.channels.create({
          name: nome,
          type: Discord.ChannelType.GuildText,
          parent: categoria,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [
                Discord.PermissionFlagsBits.ViewChannel
              ]
            },
            {
              id: interaction.user.id,
              allow: [
                Discord.PermissionFlagsBits.ViewChannel,
                Discord.PermissionFlagsBits.SendMessages,
                Discord.PermissionFlagsBits.AttachFiles,
                Discord.PermissionFlagsBits.EmbedLinks,
                Discord.PermissionFlagsBits.AddReactions
              ]
            }, 
            {
              id: interaction.guild.roles.cache.get(`1216868081238802514`), //si no funciona si pon (`ID_ROL_TICKETS`)
              allow: [
              Discord.PermissionFlagsBits.ViewChannel,
              Discord.PermissionFlagsBits.SendMessages,
              Discord.PermissionFlagsBits.AttachFiles,
              Discord.PermissionFlagsBits.EmbedLinks,
              Discord.PermissionFlagsBits.AddReactions
            ]
            }
          ]
        }).then( (ch) => {
          interaction.reply({ content: `✅ Hola ${interaction.user}, su ticket fue abierto en: ${ch}!`, ephemeral: true })
          let embed = new Discord.EmbedBuilder()
          .setColor("Green")
          .setDescription(`Hola ${interaction.user}, usted abrió un ticket ${config.ticket.ticket1.nome}`);
          let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
          .setCustomId("fechar_ticket")
          .setEmoji("🔒")
          .setStyle(Discord.ButtonStyle.Danger)
          );

          ch.send({ embeds: [embed], components: [botao] }).then( m => { 
            m.pin()
           })
        })
        }
        
      } else if (opc === "opc2") {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Nova opção

        let nome = `📨-${interaction.user.username}`;
        let categoria = (config.ticket.ticket2.categoria) // Coloque o ID da categoria

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === nome)) {
          interaction.reply({ content: `❌ Ya tienes un tickets abierto en: ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
        } else {
          interaction.guild.channels.create({
          name: nome,
          type: Discord.ChannelType.GuildText,
          parent: categoria,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [
                Discord.PermissionFlagsBits.ViewChannel
              ]
            },
            {
              id: interaction.user.id,
              allow: [
                Discord.PermissionFlagsBits.ViewChannel,
                Discord.PermissionFlagsBits.SendMessages,
                Discord.PermissionFlagsBits.AttachFiles,
                Discord.PermissionFlagsBits.EmbedLinks,
                Discord.PermissionFlagsBits.AddReactions
              ]
            }, 
            {
              id: interaction.guild.roles.cache.get(`1216868081238802514`), //si no funciona si pon (`ID_ROL_TICKETS`)
              allow: [
              Discord.PermissionFlagsBits.ViewChannel,
              Discord.PermissionFlagsBits.SendMessages,
              Discord.PermissionFlagsBits.AttachFiles,
              Discord.PermissionFlagsBits.EmbedLinks,
              Discord.PermissionFlagsBits.AddReactions
            ]
            }
          ]
        }).then( (ch) => {
          interaction.reply({ content: `✅ Hola ${interaction.user}, su ticket fue abierto en: ${ch}!`, ephemeral: true })
          let embed = new Discord.EmbedBuilder()
          .setColor("Random")
          .setDescription(`Hola ${interaction.user}, usted abrió un ticket ${config.ticket.ticket2.nome}.`);
          let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
          .setCustomId("fechar_ticket")
          .setEmoji("🔒")
          .setStyle(Discord.ButtonStyle.Danger)
          );

          ch.send({ embeds: [embed], components: [botao] }).then( m => { 
            m.pin()
           })
        })
        }
        
      } else if (opc === "opc3") {

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Nova opção

        let nome = `📨-${interaction.user.username}`;
        let categoria = config.ticket.ticket3.categoria // Coloque o ID da categoria

        if (!interaction.guild.channels.cache.get(categoria)) categoria = null;

        if (interaction.guild.channels.cache.find(c => c.name === nome)) {
          interaction.reply({ content: `❌ Ya tienes un tickets abierto en: ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
        } else {
          interaction.guild.channels.create({
          name: nome,
          type: Discord.ChannelType.GuildText,
          parent: categoria,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [
                Discord.PermissionFlagsBits.ViewChannel
              ]
            },
            {
              id: interaction.user.id,
              allow: [
                Discord.PermissionFlagsBits.ViewChannel,
                Discord.PermissionFlagsBits.SendMessages,
                Discord.PermissionFlagsBits.AttachFiles,
                Discord.PermissionFlagsBits.EmbedLinks,
                Discord.PermissionFlagsBits.AddReactions
              ]
            }, 
            {
              id: interaction.guild.roles.cache.get(`1216868081238802514`), //si no funciona si pon (`ID_ROL_TICKETS`)
              allow: [
              Discord.PermissionFlagsBits.ViewChannel,
              Discord.PermissionFlagsBits.SendMessages,
              Discord.PermissionFlagsBits.AttachFiles,
              Discord.PermissionFlagsBits.EmbedLinks,
              Discord.PermissionFlagsBits.AddReactions
            ]
            }
          ]
        }).then( (ch) => {
          interaction.reply({ content: `✅ Hola ${interaction.user}, su ticket fue abierto en: ${ch}!`, ephemeral: true })
          let embed = new Discord.EmbedBuilder()
          .setColor("Green")
          .setDescription(`Hola ${interaction.user}, usted abrió un ticket ${config.ticket.ticket3.nome}.`);
          let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
          .setCustomId("fechar_ticket")
          .setEmoji("🔒")
          .setStyle(Discord.ButtonStyle.Danger)
          );

          ch.send({ embeds: [embed], components: [botao] }).then( m => { 
            m.pin()
           })
        })
        }
        
      }
    }
  } else if (interaction.isButton()) {
    if (interaction.customId === "fechar_ticket") {
      interaction.reply(`Hola ${interaction.user}, este ticket será cerrado en 5 segundos...`)
      setTimeout ( () => {
        try { 
          interaction.channel.delete()
        } catch (e) {
          return;
        }
      }, 5000)
    }
  }
})

const { joinVoiceChannel } = require('@discordjs/voice');

client.on("ready", () => {
  let canal = client.channels.cache.get(config.call_connect) // coloque o ID do canal de voz
  if (!canal) return console.log("❌ No fue posible entrar al canal de voz.")
  if (canal.type !== Discord.ChannelType.GuildVoice) return console.log(`❌ No fue posible entrar al canal [ ${canal.name} ].`)

  try {

    joinVoiceChannel({
      channelId: canal.id, // ID do canal de voz
      guildId: canal.guild.id, // ID do servidor
      adapterCreator: canal.guild.voiceAdapterCreator,
    })
    console.log(`✅ Entré al canal de voz [ ${canal.name} ] con éxito!`)

  } catch(e) {
    console.log(`❌ No fue posible entrar al canal [ ${canal.name} ].`)
  }

})

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "verificar") {
      let role_id = await db.get(`cargo_verificação_${interaction.guild.id}`);
      let role = interaction.guild.roles.cache.get(role_id);
      if (!role) return;
      interaction.member.roles.add(role.id)
      interaction.reply({ content: `Hola **${interaction.user.username}**, fuiste verificado!`, ephemeral: true })
    }
  }
})

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (await db.get(`modo_afk_${message.author.id}`) === true) {
    message.reply(`Hola ${message.author}, su modo AFK fue desactivado!`)
    await db.delete(`modo_afk_${message.author.id}`)
  }

  let afk_user = message.mentions.members.first()
  if (!afk_user) return;

  if (afk_user) {
  let afk_mode = await db.get(`modo_afk_${afk_user.id}`);
  if (afk_mode === true) {
    let afk_motivo = await db.get(`motivo_afk_${afk_user.id}`);
    message.reply(`Hola ${message.author}, el usuario **${afk_user.user.username}** está con el modo AFK encendido por motivo: \`${afk_motivo}\``)
  } else {
    return;
  }
  }
});

const idServidor = "1216863604016680990"
const idCargo = "1216865276923220079"

client.on('guildMemberAdd', async member => {
    if (member.guild.id === idServidor) {
        const cargo = member.guild.roles.cache.get(idCargo)
        const canalId = member.guild.channels.cache.get('1219104704819368007')
        if (cargo) {
            member.roles.add(cargo).then(() => {
                canalId.send(`Un nuevo miembro (${member.user} entró al servidor`).then(() => {
                console.log('Cargo adicionado')
            })
            }).catch(err => {
                console.log(`Error al intentar aplicar el cargo\nErr reference: ${err}`)
           })
        } else {
          console.log("Roles no fue configurado...")
        }
    }
})

process.on('multipleResolves', (type, reason, promise) => {
  console.log(`🚫 Error Detectado\n\n` + type, promise, reason)
});
process.on('unhandRejection', (reason, promise) => {
  console.log(`🚫 Error Detectado:\n\n` + reason, promise)
});
process.on('uncaughtException', (error, origin) => {
  console.log(`🚫 Error Detectado:\n\n` + error, origin)
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`🚫 Error Detectado:\n\n` + error, origin)
});

client.on("interactionCreate", async(interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "formulario") {
      if (!interaction.guild.channels.cache.get(await db.get(`canal_logs_${interaction.guild.id}`))) return interaction.reply({ content: `O sistema está desativado.`, ephemeral: true })
      const modal = new Discord.ModalBuilder()
      .setCustomId("modal")
      .setTitle("Formulario");

      const pergunta1 = new Discord.TextInputBuilder()
      .setCustomId("pergunta1") // Coloque o ID da pergunta
      .setLabel(config.formulario.pergunta_1.pergunta) // Coloque a pergunta
      .setMaxLength(30) // Máximo de caracteres para a resposta
      .setMinLength(5) // Mínimo de caracteres para a respósta
      .setPlaceholder(config.formulario.pergunta_1.descrição) // Mensagem que fica antes de escrever a resposta
      .setRequired(true) // Deixar para responder obrigatório (true | false)
      .setStyle(Discord.TextInputStyle.Short) // Tipo de resposta (Short | Paragraph)

      const pergunta2 = new Discord.TextInputBuilder()
      .setCustomId("pergunta2") // Coloque o ID da pergunta
      .setLabel(config.formulario.pergunta_2.pergunta) // Coloque a pergunta
      .setMaxLength(30) // Máximo de caracteres para a resposta
      .setPlaceholder(config.formulario.pergunta_2.descrição) // Mensagem que fica antes de escrever a resposta
      .setStyle(Discord.TextInputStyle.Short) // Tipo de resposta (Short | Paragraph)
      .setRequired(true)

      const pergunta3 = new Discord.TextInputBuilder()
      .setCustomId("pergunta3") // Coloque o ID da pergunta
      .setLabel(config.formulario.pergunta_3.pergunta) // Coloque a pergunta
      .setPlaceholder(config.formulario.pergunta_3.descrição) // Mensagem que fica antes de escrever a resposta
      .setStyle(Discord.TextInputStyle.Paragraph) // Tipo de resposta (Short | Paragraph)
      .setRequired(true)

      modal.addComponents(
        new Discord.ActionRowBuilder().addComponents(pergunta1),
        new Discord.ActionRowBuilder().addComponents(pergunta2),
        new Discord.ActionRowBuilder().addComponents(pergunta3)
      )

      await interaction.showModal(modal)
    }
  } else if (interaction.isModalSubmit()) {
    if (interaction.customId === "modal") {
      let resposta1 = interaction.fields.getTextInputValue("pergunta1")
      let resposta2 = interaction.fields.getTextInputValue("pergunta2")
      let resposta3 = interaction.fields.getTextInputValue("pergunta3")

      if (!resposta1) resposta1 = "No informado."
      if (!resposta2) resposta2 = "No informado."
      if (!resposta3) resposta3 = "No informado."

      let embed = new Discord.EmbedBuilder()
      .setColor("Green")
      .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`El usuario ${interaction.user} envió el formulario abajo:`)
      .addFields(
        {
          name: `${config.formulario.pergunta_1.pergunta}`,
          value: `*${config.formulario.pergunta_1.descrição}:* \`${resposta1}\``,
          inline: false
        },
        {
          name: `${config.formulario.pergunta_2.nome}:`,
          value: `*${config.formulario.pergunta_2.descrição}:* \`${resposta2}\``,
          inline: false
        },
        {
          name: `${config.formulario.pergunta_3.pergunta}:`,
          value: `*${config.formulario.pergunta_3.descrição}:* \`${resposta3}\``,
          inline: false
        }
      );

      interaction.reply({ content: `Hola **${interaction.user.username}**, su formulario fue enviado con éxito!`, ephemeral: true})
      await interaction.guild.channels.cache.get(await db.get(`canal_logs_${interaction.guild.id}`)).send({ embeds: [embed] })
    }
  }
})



const fs = require('fs');

fs.readdir('./Events', (err, file) => {
  file.forEach(event => {
    require(`./Events/${event}`)
  })
})
