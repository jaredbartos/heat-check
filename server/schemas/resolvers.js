const { Performance, Player, Team, User } = require('../models');

const resolvers = {
  Query: {
    teams: async () => {
      return await Team.find();
    },
    team: async (parent, { _id }) => {
      const team = await Team.findById(_id).populate('players');

      if (!team) {
        throw new Error('No team found with that ID!');
      }

      return team;
    },
    players: async () => {
      return await Player.find();
    },
    player: async (parent, { _id }) => {
      const player = await Player.findById(_id).populate('performances');

      if (!player) {
        throw new Error('No player found with that ID!');
      }

      return player;
    },
    performances: async () => {
      return await Performance.find();
    },
    performance: async (parent, { _id }) => {
      const performance = await Performance.findById(_id).populate('player');

      if (!performance) {
        throw new Error('No performance found with that ID!');
      }

      return performance;
    }
  },
  Mutation: {
    addPerformance: async (parent, { input }) => {
      return await Performance.create(input);
    },
    addPlayer: async (parent, { input }) => {
      return await Player.create(input);
    },
    addTeam: async (parent, args) => {
      return await Team.create(args);
    },
    updatePerformance: async (parent, { _id, input }) => {
      const performance = await Performance.findOneAndUpdate(
        { _id },
        { input },
        { new: true }
      );
      
      if (!performance) {
        throw new Error('No performance found with that ID!');
      }

      return performance;
    },
    updatePlayer: async (parent, { _id, input }) => {
      const player = await Player.findOneAndUpdate(
        { _id },
        { input },
        { new: true }
      );

      if (!player) {
        throw new Error('No player found with that ID!');
      }

      return player;
    },
    updateTeam: async (parent, { _id, ...fields }) => {
      const team = await Team.findOneAndUpdate(
        { _id },
        { fields },
        { new: true }
      );

      if (!team) {
        throw new Error('No team found with that ID!');
      }

      return team;
    }
  }
};

module.exports = resolvers;