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

            // Method to start the first battle and then called again anytime a new round starts
            // Establishes who will take their turn first based on their agility values
            // Display the Player object's stats
            // Display the description of the current Enemy
            this.startNewBattle();
        });

    Game.prototype.startNewBattle = function() {
        if (this.player.agility > this.currentEnemy.agility) {
            this.isPlayerTurn = true;
        } else {
            this.isPlayerTurn = false;
        }

        console.log('Your stats are as follows:');
        console.table(this.player.getStats());

        console.log(this.currentEnemy.getDescription());

        // Responsible for each individual turn in the round
        // Main Event of the Game that will run an indefinite number of times
        // Each time it will either be the Player or Enemy turn
        this.battle();
    };    

    // Battle Function
    Game.prototype.battle = function() {
        if (this.isPlayerTurn) {
            inquirer // Callback Function
                // Give Player Choices
                .prompt({
                    type: 'list',
                    message: 'What would you like to do?',
                    name: 'action',
                    choices: ['Attack', 'Use Potion']
                })
                // Use a Potion
                .then(({ action }) => {
                    if (action === 'Use Potion') {
                        if (!this.player.getInventory()) {
                            console.log("You don't have any potions!");
                            return;
                        }

                        // Which Potion?
                        inquirer
                            .prompt({
                                type: 'list',
                                message: 'Which potion would you like to use?',
                                name: 'action',
                                choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                            })
                            .then(({ action }) => {
                                const potionDetails = action.split(': ');

                                this.player.usePotion(potionDetails[0] - 1);
                                console.log(`You used a ${potionDetails[1]} potion.`);
                            });
                    } else { // Player Attacks Enemy
                        const damage = this.player.getAttackValue();
                        this.currentEnemy.reduceHealth(damage);

                        console.log(`You attacked the ${this.currentEnemy.name}`);
                        console.group(this.currentEnemy.getHealth());
                    }
                });
        } else {
            const damage = this.currentEnemy.getAttackValue();
            this.player.reduceHealth(damage);

            console.log(`You were attacked by the ${this.currentEnemy.name}`);
            console.log(this.player.getHealth());
        }
    };

};

module.exports = Game;