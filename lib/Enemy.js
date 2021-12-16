const Character = require('./Character');
const Potion = require('./Potion');

class Enemy extends Character { // Enemy Class inherits from the Character Class
    constructor(name = '') {
        // call parent constructor here:
        super(name);

        this.weapon = weapon;
        this.potion = new Potion();
    }

    getDescription() {
        return `A ${this.name} holding a ${this.weapon} has appeared!`;
    }
}


module.exports = Enemy;