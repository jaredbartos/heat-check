const { League } = require('../models');
const db = require('../config/connection');

const seedLeagues = async () => {
  const leagues = await League.find();

  if (leagues.length) {
    db.dropCollection('leagues');
  }

  const leagueData = [{ name: 'FL YMCA' }, { name: 'MN AAU' }];

  await League.create(leagueData);
};

module.exports = { seedLeagues };
