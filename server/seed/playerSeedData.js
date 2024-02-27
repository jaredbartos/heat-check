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
  'Tom',
  'Larry',
  'Dale',
  'Derek',
  'Eddie',
  'Charles',
  'Danielle',
  'Sue',
  'Alana',
  'Tonya',
  'Rebecca',
  'Lauren',
  'Shannon',
  'Jessica',
  'Tina',
  'Ariel',
  'Crystal',
  'Maya',
  'Yolanda',
  'Monique',
  'Shawn'
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
  'Goodman',
  'Edwards',
  'Lucas',
  'Jones',
  'Robinson',
  'Russell',
  'Braxton',
  'Edwards',
  'Fowles',
  'Stewart',
  'Thomas',
  'Williams'
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
  const heightNum = Math.floor(Math.random() * 15) + 66;
  const feet = Math.floor(heightNum / 12);
  const inches = heightNum % 12;
  const height = `${feet}'${inches}"`
  const weight = Math.floor(heightNum * 2.5);

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