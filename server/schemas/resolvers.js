const { Performance, Player, Team, User } = require('../models');
const { AuthenticationError, signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    teams: async () => {
      return await Team.find().populate('players').sort({ createdAt: -1 });
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
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'teams',
          populate: { path: 'players' }
        }).populate('players');
        return user;
      }

      throw new Error('You need to be logged in!');
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
    addPlayer: async (parent, { input }, context) => {
      if (context.user) {
        const player = await Player.create(input);

        const updatedTeam = await Team.findOneAndUpdate(
          { _id: input.team },
          { $addToSet: { players: player._id } },
          { new: true }
        );
        
        if (!updatedTeam) {
          throw new Error('Something went wrong adding player to the team');
        }

        const updatedUser = await User.findOneAndUpdate(
          { email: context.user.email },
          { $addToSet: { players: player._id } }
        );

        if (!updatedUser) {
          throw new Error('Something went wrong adding player to the user');
        }

        return player;
      }

    },
    addTeam: async (parent, args, context) => {
      if (context.user) {
        const team = await Team.create(args);
        await User.findOneAndUpdate(
          { email: context.user.email },
          { $addToSet: { teams: team._id } },
          { new: true }
        );

        return team;
      }

      throw new Error('You need to be logged in!');
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
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email }).populate('teams');

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;