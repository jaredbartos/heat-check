const { User, Team, League } = require('../models');
const db = require('../config/connection');

// Add teams to leagues
const addLeaguesToTeams = async data => {
  const leagues = await League.find();
  const leagueIds = leagues.map(league => league._id);

  for (let i = 0; i < data.length; i++) {
    data[i] = { ...data[i], league: leagueIds[i % 2 === 0 ? 0 : 1] };
  }

  return data;
};

// Function to drop collection if teams already exist.
const seedTeams = async data => {
  const teams = await Team.find();

  if (teams.length) {
    await db.dropCollection('teams');
  }

  await Team.create(data);
};

// Add teams to user documents
const addTeamsToUsers = async () => {
  const users = await User.find();
  const userIds = users.map(user => user._id);

  const teams = await Team.find();
  const teamIds = teams.map(team => team._id);

  for (let k = 0; k < userIds.length; k++) {
    await User.findOneAndUpdate(
      { _id: userIds[k] },
      { $addToSet: { teams: teamIds[k] } }
    );

    await Team.findOneAndUpdate({ _id: teamIds[k] }, { createdBy: userIds[k] });
  }
};

const addTeamsToLeagues = async () => {
  const leagues = await League.find();
  const leagueIds = leagues.map(league => league._id);

  const teams = await Team.find();

  leagueIds.forEach(async id => {
    const leagueTeams = teams
      .map(team => {
        if (team.league.toString() === id.toString()) {
          return team._id;
        }
      })
      .filter(item => item);

    await League.findByIdAndUpdate(id, { teams: leagueTeams });
  });
};

module.exports = {
  seedTeams,
  addTeamsToUsers,
  addLeaguesToTeams,
  addTeamsToLeagues
};
