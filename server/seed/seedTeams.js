const { User, Team } = require('../models');
const db = require('../config/connection');

// Function to drop collection if teams already exist.
const seedTeams = async (data) => {
  const teams = await Team.find();

  if (teams.length) {
    await db.dropCollection('teams');
  }

  await Team.create(data);
};

// Add teams to user documents
const addTeamsToUsers = async () => {
  const users = await User.find();
  const userIds = users.map((user) => user._id);

  const teams = await Team.find();
  const teamIds = teams.map((team) => team._id);

  for (let k = 0; k < userIds.length; k++) {
    await User.findOneAndUpdate(
      { _id: userIds[k] },
      { $addToSet: { teams: teamIds[k] } }
    );

    await Team.findOneAndUpdate(
      { _id: teamIds[k] },
      { createdBy: userIds[k] }
    );
  }
};

module.exports = { seedTeams, addTeamsToUsers };