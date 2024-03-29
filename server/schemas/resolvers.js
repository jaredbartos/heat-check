const { Performance, Player, Team, User } = require('../models');
const { AuthenticationError, signToken } = require('../utils/auth');
const { ObjectId } = require('mongoose').Types;

const resolvers = {
  Query: {
    teams: async () => {
      return await Team.find()
        .populate('players')
        .populate('createdBy')
        .sort({ createdAt: -1 });
    },
    team: async (parent, { _id }) => {
      const team = await Team.findById(_id)
        .populate('players')
        .populate('createdBy');

      if (!team) {
        throw new Error('No team found with that ID!');
      }

      return team;
    },
    recentlyUpdatedTeams: async () => {
      return await Team.find()
        .populate('players')
        .populate('createdBy')
        .sort({ updatedAt: -1 })
        .limit(3);
    },
    players: async () => {
      return await Player.find()
        .populate('team')
        .populate('createdBy')
    },
    playersByTeam: async (parent, { _id }) => {
      return await Player.find({ team: _id })
        .populate('team')
        .sort({ number: 1 });
    },
    player: async (parent, { _id }) => {
      const player = await Player.findById(_id)
        .populate('team')
        .populate('performances')
        .populate('createdBy');

      if (!player) {
        throw new Error('No player found with that ID!');
      }

      return player;
    },
    performances: async () => {
      return await Performance.find()
        .populate('player')
        .populate('createdBy');
    },
    avgPerformanceByPlayer: async (parent, { _id }) => {
      const aggregate = await Performance.aggregate([
        { $match: { player: new ObjectId(_id) } },
        {
          $group: {
            _id: '$player',
            avgFgAtt: { $avg: '$fgAtt' },
            avgFgMade: { $avg: '$fgMade' },
            avgThreePtAtt: { $avg: '$threePtAtt' },
            avgThreePtMade: { $avg: '$threePtMade' },
            avgFtAtt: { $avg: '$ftAtt' },
            avgFtMade: { $avg: '$ftMade' },
            avgOffReb: { $avg: '$offReb' },
            avgRebounds: { $avg: '$rebounds' },
            avgAssists: { $avg: '$assists' },
            avgSteals: { $avg: '$steals' },
            avgBlocks: { $avg: '$blocks' },
            avgTurnovers: { $avg: '$turnovers' },
            avgPoints: { $avg: '$points' }
          }
        }
      ]);

      return aggregate[0];
    },
    avgPlayerPerformanceByTeam: async (parent, { _id }) => {
      const team = await Team.findById(_id)
        .populate({
          path: 'players',
          populate: { path: 'performances' }
        });

      // Declare empty averages array to push to later
      let averages = [];
      
      // Loop through players
      for (let i = 0; i < team.players.length; i++) {
        let points = 0;
        let rebounds = 0;
        let assists = 0;

        // Go through each performance and add relevant data together
        team.players[i].performances.forEach((performance) => {
          points += performance.points;
          rebounds += performance.rebounds;
          assists += performance.assists;
        });

        // Push data to averages array
        averages.push({
          _id: team.players[i]._id,
          firstName: team.players[i].firstName,
          lastName: team.players[i].lastName,
          avgPoints: (points === 0) ? 0 : (points / team.players[i].performances.length),
          avgRebounds: (rebounds === 0) ? 0 : (rebounds / team.players[i].performances.length),
          avgAssists: (assists === 0) ? 0 : (assists / team.players[i].performances.length),         
        });
      }

      return averages;
    },
    performancesByPlayer: async (parent, { _id }) => {
      return await Performance.find({ player: _id })
        .populate('player')
        .populate('createdBy')
        .sort({ date: -1 });
    },
    performance: async (parent, { _id }) => {
      const performance = await Performance.findById(_id)
        .populate({
          path: 'player',
          populate: { path: 'team' }
        })
        .populate('createdBy');

      if (!performance) {
        throw new Error('No performance found with that ID!');
      }

      return performance;
    },
    rankPerformanceByField: async (parent, { field }) => {
      return await Performance.find()
        .populate({
          path: 'player',
          populate: { path: 'team' }
        })
        .populate('createdBy')
        .sort({ [field]: -1 })
        .limit(10);
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
    addPerformance: async (parent, { input, createdBy }) => {
      const performance = await Performance.create({
        ...input,
        createdBy
      });

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
    addPlayer: async (parent, { input, createdBy }, context) => {
      if (context.user) {
        const player = await Player.create({
          ...input,
          createdBy
        });

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

      throw new Error('You need to be logged in!');
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
    updatePerformance: async (parent, { _id, input }, context) => {
      if (context.user) {
        const performance = await Performance.findOneAndUpdate(
          { _id },
          { ...input },
          { new: true }
        );
        
        if (!performance) {
          throw new Error('No performance found with that ID!');
        }

        return performance;
      }

      throw new Error('You need to be logged in!');
    },
    deletePerformance: async (parent, { _id }, context) => {
      if (context.user) {
        const performance = await Performance.findByIdAndDelete(_id);

        if (!performance) {
          throw new Error('No performance found with that ID!');
        }

        return performance;
      }

      throw new Error('You need to be logged in!')
    },
    updatePlayer: async (parent, { _id, input }, context) => {
      if (context.user) {
        const player = await Player.findOneAndUpdate(
          { _id },
          { ...input },
          { new: true }
        );

        if (!player) {
          throw new Error('No player found with that ID!');
        }

        return player;
      }

      throw new Error('You need to be logged in!');
    },
    deletePlayer: async (parent, { _id }, context) => {
      if (context.user) {
        const player = await Player.findByIdAndDelete(_id);

        if (!player) {
          throw new Error('No player found with that ID!');
        }

        await Performance.deleteMany({
          player: _id
        });

        return player;
      }

      throw new Error('You need to be logged in!');
    },
    updateTeam: async (parent, { _id, ...fields }, context) => {
      const team = await Team.findOneAndUpdate(
        { _id },
        { ...fields },
        { new: true }
      );

      if (!team) {
        throw new Error('No team found with that ID!');
      }

      return team;
    },
    deleteTeam: async (parent, { _id }, context) => {
      if (context.user) {
        const team = await Team.findByIdAndDelete(_id);

        if (!team) {
          throw new Error('No team found with that ID!');
        }

        const players = await Player.find({ team: _id });
        const playerIds = players.map((player) => player._id);

        await Performance.deleteMany({
          player: { $in: playerIds }
        });

        await Player.deleteMany({
          team: _id
        });

        return team;
      }

      throw new Error('You need to be logged in!');
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