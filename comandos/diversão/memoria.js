const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { MatchPairs, TicTacToe } = require('discord-gamecord');


module.exports = {
    name: 'memorizar',
    description: 'Juego de memoria.',
    options: [
            {
                name: 'emojis',
                description: 'Juego de memoria.',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                    name: "comida",
                    value: "100",
                
                },
                {
                    name: "bandera",
                    value: "10",
                
                },
                {
                    name: "animales",
                    value: "11",
                
                },
                {
                    name: "deportes",
                    value: "12",
                
                },
                {
                    name: "carros",
                    value: "13",
                
                },
              ],
              
            }
        ],
    run: async (client, interaction, args) => {
        let emojis = interaction.options.getString('emojis');

if(emojis === '100') {
    const Game = new MatchPairs({
        message: interaction,
        isSlashGame: true,
        embed: {
            title: '``Memorizar comidas``',
            color: '#00ff00',
            description: 'Haga clic en los botones a continuación para encontrar los pares!',
        },
        timeoutTime: 6000,
        emojis: ['🍉', '🍇', '🍊', '🥭', '🍎', '🍏', '🥝', '🥥', '🍓', '🫐', '🍍', '🥕', '🥔'],
    });

    Game.startGame();

} else if (emojis === '10') {

    const Game = new MatchPairs({
        message: interaction,
        isSlashGame: true,
        embed: {
            title: '``Memorizar banderas``',
            color: '#00ff00',
            description: 'Haga clic en los botones a continuación para encontrar los pares!',
        },
        timeoutTime: 6000,
        emojis: ['🇧🇷', '🇧🇫', '🇨🇴', '🇨🇳', '🇫🇮', '🇦🇲', '🇦🇽', '🇦🇨', '🇬🇬', '🇬🇸', '🇯🇪', '🇯🇵', '🇮🇱'],
    });

    Game.startGame();

} else if (emojis === '11') {

    const Game = new MatchPairs({
        message: interaction,
        isSlashGame: true,
        embed: {
            title: '``Memorizar animales``',
            color: '#00ff00',
            description: 'Haga clic en los botones a continuación para encontrar los pares!',
        },
        timeoutTime: 6000,
        emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸'],
    });

    Game.startGame();

} else if (emojis === '12') {

    const Game = new MatchPairs({
        message: interaction,
        isSlashGame: true,
        embed: {
            title: '``Memorizar deportes``',
            color: '#00ff00',
            description: 'Haga clic en los botones a continuación para encontrar los pares!',
        },
        timeoutTime: 6000,
        emojis: ['⚽', '🏀', '🏈', '⚾', '🥎', '🏐', '🏉', '🎱', '🥏', '🏓', '🏸', '🏒', '⛳'],
    });

    Game.startGame();

} else if (emojis === '13') {

    const Game = new MatchPairs({
        message: interaction,
        isSlashGame: true,
        embed: {
            title: '``Memorizar carros``',
            color: '#00ff00',
            description: 'Haga clic en los botones a continuación para encontrar los pares!',
        },
        timeoutTime: 6000,
        emojis: ['🚔', '🚗', '🚙', '🛺', '🚌', '🚕', '🚎', '🏎', '🚓', '🚑', '🚒', '🚐', '🚛'],
    });

    Game.startGame();
     }
      }
       }