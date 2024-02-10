const { Player, Performance } = require('../models');
const db = require('../config/connection');

const randomizePerformances = () => {
  let performances = [];

  for (let i = 1; i <= 10; i++) {
    const threePtAtt = Math.floor(Math.random() * 11);
    const threePtMade = Math.floor(threePtAtt * Math.random());
    let fgAtt = Math.floor(Math.random() * 15);
    let fgMade = Math.floor(fgAtt * Math.random());
    fgAtt += threePtAtt;
    fgMade += threePtMade;
    const ftAtt = Math.floor(Math.random() * 11);
    const ftMade = Math.floor(ftAtt * Math.random());
    const offReb = Math.floor(Math.random() * 9);
    const rebounds = Math.floor(Math.random() * 13);
    const assists = Math.floor(Math.random() * 13);
    const steals = Math.floor(Math.random() * 6);
    const blocks = Math.floor(Math.random() * 6);
    const turnovers = Math.floor(Math.random() * 7);
    const points = (threePtMade * 3) + ((fgMade - threePtMade) * 2) + ftMade;
  
    const performance = {
      fgAtt,
      fgMade,
      threePtAtt,
      threePtMade,
      ftAtt,
      ftMade,
      offReb,
      rebounds,
      assists,
      steals,
      blocks,
      turnovers,
      points
    };
  
    performances.push(performance);
  }
  
  return performances;
};

const addPlayersToPerformances = async () => {
  const players = await Player.find();
  let performances = [];

  for (let i = 0; i < players.length; i++) {
    const randomPerformances = randomizePerformances();
    const playerPerformances = randomPerformances.map((performance) => {
      return { ...performance, player: players[i]._id };
    });
    performances = [...performances, ...playerPerformances];
  }
  return performances;
};

const seedPerformances = async (data) => {
  const performances = await Performance.find();

  if (performances.length) {
    await db.dropCollection('performances');
  };

  await Performance.create(data);
};

const addPerformancesToPlayers = async () => {
  const performances = await Performance.find();
  const players = await Player.find();
  const playerIds = players.map((player) => player._id);

  for (let j = 0; j < performances.length; j++) {
    const playerId = playerIds.find((id) => id.toString() === performances[j].player.toString());
    
    await Player.findOneAndUpdate(
      { _id: playerId },
      { $addToSet: { performances: performances[j]._id } }
    );
  }
};

module.exports = {
  addPlayersToPerformances,
  seedPerformances,
  addPerformancesToPlayers
};