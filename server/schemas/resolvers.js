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
      return await Player.find().populate('team');
    },
    player: async (parent, { _id }) => {
      const player = await Player.findById(_id).populate('team').populate('performances');

      if (!player) {
        throw new Error('No player found with that ID!');
      }

      return player;
    },
    performances: async () => {
      return await Performance.find().populate('player');
    },
    performance: async (parent, { _id }) => {
      const performance = await Performance.findById(_id).populate({
        path: 'player',
        populate: { path: 'team' }
      });

      if (!performance) {
        throw new Error('No performance found with that ID!');
      }

      return performance;
    }
  },
  Mutation: {
    addPerformance: async (parent, { input }) => {
      const performance = await Performance.create(input);

      const updatedPlayer = await Player.findOneAndUpdate(
        { _id: input.player },
        { $addToSet: { performances: performance._id } },
        { new: true}
      );

      if (!updatedPlayer) {
        throw new Error('Something went wrong adding performance to player');
      }

      return performance;
    },
    addPlayer: async (parent, { input }) => {
      const player = await Player.create(input);

      const updatedTeam = await Team.findOneAndUpdate(
        { _id: input.team },
        { $addToSet: { players: player._id } },
        { new: true }
      );

      if (!updatedTeam) {
        throw new Error('Something went wrong adding player to the team');
      }

      return player;
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