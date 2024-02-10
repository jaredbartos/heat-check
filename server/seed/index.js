const userSeedData = require('./userSeedData.json');
const teamSeedData = require('./teamSeedData');
const playerSeedData = require('./playerSeedData');
const seedUsers = require('./seedUsers');
const { seedTeams, addTeamsToUsers } = require('./seedTeams');
const { addTeamsToPlayers, seedPlayers, addPlayersToTeams } = require('./seedPlayers');
const db = require('../config/connection');

db.once('open', async () => {
  await seedUsers(userSeedData);
  await seedTeams(teamSeedData);
  await addTeamsToUsers();
  const players = await addTeamsToPlayers(playerSeedData);
  await seedPlayers(players);
  await addPlayersToTeams();
  console.log('Database seeded!');
  process.exit();
});