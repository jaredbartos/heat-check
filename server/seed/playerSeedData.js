const firstNames = [
  'Jared',
  'Josh',
  'Adam',
  'Aaron',
  'Bob',
  'Chris',
  'Lance',
  'Rick',
  'Steve',
  'Dane',
  'Keith',
  'Ivan',
  'Blake',
  'Vince',
  'Otis',
  'Tom'
];

const lastNames = [
  'Johnson',
  'Curry',
  'Evans',
  'Thompson',
  'Pierce',
  'Bonds',
  'Roberts',
  'Long',
  'Jackson',
  'Knightley',
  'Quail',
  'Goodman'
];

const positions = [
  'Guard',
  'Forward',
  'Center'
];

let playerSeedData = [];

// Randomize players
for (let i = 1; i <= 60; i++) {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const position = positions[Math.floor(Math.random() * positions.length)];
  const number = Math.floor(Math.random() * 100);
  const height = Math.floor(Math.random() * 15) + 66;
  const weight = Math.floor(height * 2.5);

  playerSeedData.push({
    firstName,
    lastName,
    position,
    number,
    height,
    weight
  });
}

module.exports = playerSeedData;