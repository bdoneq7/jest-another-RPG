const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

// Game Object Properties
function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    // Array of Enemies
    this.enemies = [];
    this.currentEnemy;
    this.player;
}

// Initialize Game Method
// Set Up Enemy and Player Objects
Game.prototype.initializeGame = function() {
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));
    // First enemy object in array will fight player when game starts
    this.currentEnemy = this.enemies[0];

    // Player Prompt Object
    inquirer
        .prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
        // destructure name from the prompt object
        .then(({ name }) => {
            this.player = new Player(name);

            // test the object creation
            // console.log(this.currentEnemy, this.player);

            this.startNewBattle();
        });

};

module.exports = Game;