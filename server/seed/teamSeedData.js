const teamNames = ['Eagles', 'Bulls', 'Hawks', 'Orioles', 'Lions', 'Tigers'];

const leagues = ['ALA', 'BCR'];

let teamSeedData = [];

for (let i = 0; i < teamNames.length; i++) {
  const teamObj = { name: teamNames[i], league: leagues[i % 2 === 0 ? 0 : 1] };
  teamSeedData.push(teamObj);
}

module.exports = teamSeedData;
