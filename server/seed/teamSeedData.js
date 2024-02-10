const teamNames = [
  'Eagles',
  'Bulls',
  'Hawks',
  'Orioles',
  'Lions',
  'Tigers',
];

const leagues = [
  'ALA',
  'BCR',
];

let teamSeedData = [];

// Randomize matching team names into a league
// Add the object to the seed data
for (let i = 0; i < teamNames.length; i++) {
  const index = Math.floor(Math.random() * 2);
  const teamObj = { name: teamNames[i], league: leagues[index] };
  teamSeedData.push(teamObj);
};

module.exports = teamSeedData;