const { Discord, ApplicationCommandOptionType } = require('discord.js');
const { Minesweeper } = require('discord-gamecord'); 
  module.exports = {
    name: "mina",
    description: "Juega al juego de la mina bomba.!",
    run: async(client, interaction, args) => {
 const Game = new Minesweeper({ 
   message: interaction, 
   isSlashGame: true, 
   embed: { 
     title: 'Mina de bombas', 
     color: '#00ff00', 
     description: 'Haz clic en cualquier botón para jugar..' 
   }, 
   emojis: { flag: '🚩', mine: '💣' }, 
   mines: 5, 
   timeoutTime: 60000, 
   winMessage: '¡Felicidades! Ganaste, lograste excavar todas las partes sin explotar..', 
   loseMessage: 'Perdiste, después de cavar terminaste cayendo en la bomba..', 
   playerOnlyMessage: 'Apenas {player} puede usar estos botones.' 
 }); 
  
 Game.startGame(); 
 Game.on('gameOver', result => { 
   console.log(result);
 });
    }
  }