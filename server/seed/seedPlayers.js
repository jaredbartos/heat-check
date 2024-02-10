const { Team, Player } = require('../models');
const db = require('../config/connection');

const addTeamsToPlayers = async (data) => {
  const teams = await Team.find();
  const teamIds = teams.map((team) => team._id);

  for (let i = 0; i < data.length; i++) {
    if (i <= 9) {
      data[i].team = teamIds[0];
    } else if (i >= 10 && i <= 19) {
      data[i].team = teamIds[1];
    } else if (i >= 20 && i <= 29) {
      data[i].team = teamIds[2];
    } else if (i >= 30 && i <= 39) {
      data[i].team = teamIds[3];
    } else if (i >= 40 && i <= 49) {
      data[i].team = teamIds[4];
    } else {
      data[i].team = teamIds[5];
    }
  }

  return data;
};

const seedPlayers = async (data) => {
  const players = await Player.find();

  if (players.length) {
    db.dropCollection('players');
  }

  await Player.create(data);
};

const addPlayersToTeams = async () => {
  const players = await Player.find();
  const teams = await Team.find();
  const teamIds = teams.map((team) => team._id);

  for (let j = 0; j < players.length; j++) {
    const teamId = teamIds.find((id) => id.toString() === players[j].team.toString());
    await Team.findOneAndUpdate(
      { _id: teamId },
      { $addToSet: { players: players[j]._id } }
    );
  }
};

module.exports = {
  addTeamsToPlayers,
  seedPlayers,
  addPlayersToTeams
}