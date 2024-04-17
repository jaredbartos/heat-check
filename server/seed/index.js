const { Team, Player, Performance } = require('../models');
const userSeedData = require('./userSeedData.json');
const teamSeedData = require('./teamSeedData');
const playerSeedData = require('./playerSeedData');
const seedUsers = require('./seedUsers');
const { seedTeams, addTeamsToUsers } = require('./seedTeams');
const {
  addTeamsToPlayers,
  seedPlayers,
  addPlayersToTeams
} = require('./seedPlayers');
const {
  addPlayersToPerformances,
  seedPerformances,
  addPerformancesToPlayers
} = require('./seedPerformances');
const db = require('../config/connection');

const addCreators = async () => {
  const teams = await Team.find().populate({
    path: 'players',
    populate: {
      path: 'performances'
    }
  });

  // Loop through teams and grab the createdBy user
  for (let i = 0; i < teams.length; i++) {
    // Get createdBy user ID
    const creatorId = teams[i].createdBy;

    // Loop through players of team and add creator
    for (let j = 0; j < teams[i].players.length; j++) {
      await Player.findByIdAndUpdate(teams[i].players[j]._id, {
        createdBy: creatorId
      });

      // Loop through performances and add creator
      for (let k = 0; k < teams[i].players[j].performances.length; k++) {
        await Performance.findByIdAndUpdate(
          teams[i].players[j].performances[k]._id,
          {
            createdBy: creatorId
          }
        );
      }
    }
  }
};

db.once('open', async () => {
  await seedUsers(userSeedData);
  await seedTeams(teamSeedData);
  await addTeamsToUsers();
  const players = await addTeamsToPlayers(playerSeedData);
  await seedPlayers(players);
  await addPlayersToTeams();
  const performances = await addPlayersToPerformances();
  await seedPerformances(performances);
  await addPerformancesToPlayers();
  await addCreators();
  console.log('Database seeded!');
  process.exit();
});
