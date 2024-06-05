const { Discord, ApplicationCommandOptionType } = require('discord.js');
const { Snake } = require('discord-gamecord');
const config = require("../../config.json");

module.exports = {
  name: "culebrita",
  description: "Minijuego de la culebrita",
  type: ApplicationCommandOptionType.ChatInput,
  
  run: async (client, interaction, args) => {
    const Game = new Snake({
      message: interaction,
      isSlashGame: false,
      embed: {
        title: 'Juego de la culebrita',
        overTitle: 'Perdiste!',
        color: (config.embedgeral)
      },
      emojis: {
        board: '⬛',
        food: '🍎',
        up: '⬆️', 
        down: '⬇️',
        left: '⬅️',
        right: '➡️',
      },
      snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
      foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
      stopButton: 'parar',
      timeoutTime: 60000,
      playerOnlyMessage: 'Solamente {player} puede usar esos botones.'
    });

    Game.startGame();
    Game.on('gameOver', result => {
      console.log(result);  // => { result... }
    });
  }
};
