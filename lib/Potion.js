
// Contructor Function
function Potion(name) {
    this.types = ['strength', 'agility', 'health'];

    // Expression will be evaluated to see if name is truthy
    // if not, then generate a random potion
    this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

    if (this.name === 'health') {
        this.value = Math.floor(Math.random() * 10 + 30);
    } else {
        this.value = Math.floor(Math.random() * 5 + 7);
    }
}

module.exports = Potion;