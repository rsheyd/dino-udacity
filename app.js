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

// Fetch Dino Data, Create Dino Objects, initialize button click event listener
fetch("dino.json")
  .then((response) => response.json())
  .then((data) => {
    const dinoObjects = data.Dinos.map(
      (dino) =>
        new Dino(
          dino.species,
          dino.weight,
          dino.height,
          dino.diet,
          dino.where,
          dino.when,
          dino.facts
        )
    );
    initializeEventListener(dinoObjects);
  });

// Create Human Constructor
function Human(name, height, weight, diet) {
  this.species = "Human";
  this.name = name;
  this.height = height;
  this.weight = weight;
  this.diet = diet;
}

// Use IIFE to get human data from form and generate inforgraphic
function initializeEventListener(dinoObjects) {
  document.getElementById("btn").addEventListener("click", function () {
    (function () {
      const name = document.getElementById("name").value;
      const feet = document.getElementById("feet").value;
      const inches = document.getElementById("inches").value;
      const weight = document.getElementById("weight").value;
      const diet = document.getElementById("diet").value.toLowerCase();

      const human = new Human(
        name,
        parseInt(feet) * 12 + parseInt(inches),
        weight,
        diet
      );

      generateInfographic(human, dinoObjects);
    })();
  });
}

// Create Dino Compare Method 1
Dino.prototype.compareWeight = function (humanWeight) {
  return `The ${this.species} weighs ${
    this.weight > humanWeight ? "more" : "less"
  } than you.`;
};

// Create Dino Compare Method 2
Dino.prototype.compareHeight = function (humanHeight) {
  return `The ${this.species} is ${
    this.height > humanHeight ? "taller" : "shorter"
  } than you.`;
};

// Create Dino Compare Method 3
Dino.prototype.compareDiet = function (humanDiet) {
  return `The ${this.species} has a ${this.diet} diet, which is ${
    this.diet === humanDiet ? "the same as" : "different from"
  } yours.`;
};

// Generate Tiles for each Dino in Array
function generateInfographic(human, dinoObjects) {
  const grid = document.getElementById("grid");
  const tiles = dinoObjects.map((dino) => createTile(dino, human));
  tiles.splice(4, 0, createTile(human));
  tiles.forEach((tile) => grid.appendChild(tile));

  // Remove form from screen
  document.getElementById("dino-compare").style.display = "none";
}

// Create Tile
function createTile(creature, human = null) {
  const tile = document.createElement("div");
  tile.className = "grid-item";

  const title = document.createElement("h3");
  title.innerText =
    creature.species === "Human" ? creature.name : creature.species;
  tile.appendChild(title);

  const img = document.createElement("img");
  img.src = `./images/${creature.species.toLowerCase()}.png`;
  tile.appendChild(img);

  if (creature.species !== "Human") {
    const fact = document.createElement("p");
    const facts = [];
    facts.push(...creature.facts);
    facts.push(creature.compareWeight(human.weight));
    facts.push(creature.compareHeight(human.height));
    facts.push(creature.compareDiet(human.diet));

    if (creature.species === "Pigeon") {
      fact.innerText = creature.facts[0];
    } else {
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      fact.innerText = randomFact;
    }
    tile.appendChild(fact);
  }

  return tile;
}
