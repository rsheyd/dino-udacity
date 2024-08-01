// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, facts) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.facts = facts;
}

// Create Human Object
function Human(name, height, weight, diet) {
    this.species = 'Human';
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.diet = diet;
}

// Fetch Dino Data and Create Dino Objects
fetch('dino.json')
    .then(response => response.json())
    .then(data => {
        const dinoObjects = data.Dinos.map(dino => new Dino(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, [dino.fact]));
        setup(dinoObjects);
    });

// Use IIFE to get human data from form
function setup(dinoObjects) {
    document.getElementById('btn').addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const feet = document.getElementById('feet').value;
        const inches = document.getElementById('inches').value;
        const weight = document.getElementById('weight').value;
        const diet = document.getElementById('diet').value;

        const human = new Human(name, parseInt(feet) * 12 + parseInt(inches), weight, diet);

        generateInfographic(human, dinoObjects);
    });
}

// Create Dino Compare Method 1
Dino.prototype.compareWeight = function(humanWeight) {
    return `The ${this.species} weighs ${this.weight > humanWeight ? 'more' : 'less'} than you.`;
};

// Create Dino Compare Method 2
Dino.prototype.compareHeight = function(humanHeight) {
    return `The ${this.species} is ${this.height > humanHeight ? 'taller' : 'shorter'} than you.`;
};

// Create Dino Compare Method 3
Dino.prototype.compareDiet = function(humanDiet) {
    return `The ${this.species} has a ${this.diet} diet, which is ${this.diet === humanDiet ? 'the same as' : 'different from'} yours.`;
};

// Generate Tiles for each Dino in Array
function generateInfographic(human, dinoObjects) {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';  // Clear any existing content

    // Create Dino tiles (with the human tile at the center)
    const tiles = dinoObjects.map(dino => createTile(dino, human));

    // Insert human tile in the center (4th position)
    tiles.splice(4, 0, createTile(human));

    // Append tiles to the grid
    tiles.forEach(tile => grid.appendChild(tile));

    // Remove form from screen
    document.getElementById('dino-compare').style.display = 'none';
}

// Create Tile
function createTile(creature, human = null) {
    const tile = document.createElement('div');
    tile.className = 'grid-item';

    const title = document.createElement('h3');
    title.innerText = creature.species === 'Human' ? creature.name : creature.species;
    tile.appendChild(title);

    const img = document.createElement('img');
    img.src = `./images/${creature.species.toLowerCase()}.png`;
    tile.appendChild(img);

    if (creature.species !== 'Human') {
        const fact = document.createElement('p');
        if (creature.species === 'Pigeon') {
            fact.innerText = creature.facts[0];
        } else {
            const randomFact = creature.facts[Math.floor(Math.random() * creature.facts.length)];
            fact.innerText = randomFact;
        }
        tile.appendChild(fact);
    }

    return tile;
}