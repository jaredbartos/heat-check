const { Performance, Player, Team, User, League } = require('../models');
const { AuthenticationError, signToken } = require('../utils/auth');
const { ObjectId } = require('mongoose').Types;

const resolvers = {
  Query: {
    teams: async () => {
      return await Team.find()
        .populate({ path: 'players', options: { sort: { number: 1 } } })
        .populate('league')
        .populate('createdBy')
        .sort({ createdAt: -1 });
    },
    team: async (parent, { _id }) => {
      const team = await Team.findById(_id)
        .populate({ path: 'players', options: { sort: { number: 1 } } })
        .populate('league')
        .populate('createdBy');

      if (!team) {
        throw new Error('No team found with that ID!');
      }

      return team;
    },
    recentlyUpdatedTeams: async () => {
      return await Team.find()
        .populate({ path: 'players', options: { sort: { number: 1 } } })
        .populate('league')
        .populate('createdBy')
        .sort({ updatedAt: -1 })
        .limit(3);
    },
    player: async (parent, { _id }) => {
      const player = await Player.findById(_id)
        .populate({ path: 'team', populate: { path: 'league' } })
        .populate({ path: 'performances', options: { sort: { date: -1 } } })
        .populate('createdBy');

      if (!player) {
        throw new Error('No player found with that ID!');
      }

      return player;
    },
    performance: async (parent, { _id }) => {
      const performance = await Performance.findById(_id)
        .populate({ path: 'player', populate: { path: 'team' } })
        .populate('createdBy');

      if (!performance) {
        throw new Error('No performance found with that ID!');
      }

      return performance;
    },
    allAvgLeaderboards: async () => {
      // Get sample performance
      const performance = await Performance.findOne();
      // Extract field names with number values to use for leaderboard fetching
      let categories = [];
      for (let field in performance) {
        if (typeof performance[field] === 'number' && field !== '__v') {
          categories.push(field);
        }
      }

      let leaderboards = [];

      for (let category of categories) {
        let leaderboard = await Performance.aggregate([
          {
            $group: {
              _id: '$player',
              [category]: { $avg: `$${category}` }
            }
          },
          {
            $addFields: {
              player: '$_id'
            }
          },
          {
            $sort: {
              [category]: category === 'turnovers' ? 1 : -1,
              _id: -1
            }
          },
          {
            $limit: 5
          },
          {
            $project: {
              _id: 1,
              value: `$${category}`,
              player: 1
            }
          }
        ]);

        leaderboard = await Player.populate(leaderboard, {
          path: 'player',
          populate: { path: 'team' }
        });

        leaderboard = {
          _id: new ObjectId(),
          category,
          leaders: [...leaderboard]
        };

        leaderboards.push(leaderboard);
      }

      return leaderboards;
    },
    rankPerformanceByField: async (parent, { field }) => {
      return await Performance.find()
        .populate({
          path: 'player',
          populate: { path: 'team', populate: { path: 'league' } }
        })
        .populate('createdBy')
        .sort({ [field]: -1 })
        .limit(10);
    },
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'teams',
          populate: [
            { path: 'players', options: { sort: { number: 1 } } },
            { path: 'league' }
          ]
        });
        return user;
      }

      throw new Error('You need to be logged in!');
    }
  },
  Player: {
    averages: async ({ _id }) => {
      const averages = await Performance.aggregate([
        { $match: { player: _id } },
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

      if (averages[0]) {
        return averages[0];
      } else {
        return {
          _id,
          avgFgAtt: 0,
          avgFgMade: 0,
          avgThreePtAtt: 0,
          avgThreePtMade: 0,
          avgFtAtt: 0,
          avgFtMade: 0,
          avgOffReb: 0,
          avgRebounds: 0,
          avgAssists: 0,
          avgSteals: 0,
          avgBlocks: 0,
          avgTurnovers: 0,
          avgPoints: 0
        };
      }
    },
    percentages: async ({ _id }) => {
      const percentages = await Performance.aggregate([
        { $match: { player: new ObjectId(_id) } },
        {
          $group: {
            _id: '$player',
            totalFgMade: { $sum: '$fgMade' },
            totalFgAtt: { $sum: '$fgAtt' },
            totalThreePtMade: { $sum: '$threePtMade' },
            totalThreePtAtt: { $sum: '$threePtAtt' },
            totalFtMade: { $sum: '$ftMade' },
            totalFtAtt: { $sum: '$ftAtt' }
          }
        },
        {
          $project: {
            fgPercentage: {
              $cond: {
                if: { $eq: ['$totalFgAtt', 0] },
                then: 0,
                else: {
                  $multiply: [{ $divide: ['$totalFgMade', '$totalFgAtt'] }, 100]
                }
              }
            },
            threePtPercentage: {
              $cond: {
                if: { $eq: ['$totalThreePtAtt', 0] },
                then: 0,
                else: {
                  $multiply: [
                    { $divide: ['$totalThreePtMade', '$totalThreePtAtt'] },
                    100
                  ]
                }
              }
            },
            ftPercentage: {
              $cond: {
                if: { $eq: ['$totalFtAtt', 0] },
                then: 0,
                else: {
                  $multiply: [{ $divide: ['$totalFtMade', '$totalFtAtt'] }, 100]
                }
              }
            }
          }
        }
      ]);

      if (percentages[0]) {
        return percentages[0];
      } else {
        return {
          _id,
          fgPercentage: 0,
          threePtPercentage: 0,
          ftPercentage: 0
        };
      }
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
        { new: true }
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
        const existingLeague = await League.findOne({ name: args.league });

        const newLeague = !existingLeague
          ? await League.create({ name: args.league })
          : null;

        const leagueId = existingLeague ? existingLeague._id : newLeague._id;

        const team = await Team.create({
          ...args,
          league: leagueId
        });

        await User.findOneAndUpdate(
          { email: context.user.email },
          { $addToSet: { teams: team._id } },
          { new: true }
        );

        await League.findByIdAndUpdate(
          leagueId,
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

      throw new Error('You need to be logged in!');
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
    updateTeam: async (parent, { _id, name, league }, context) => {
      const existingTeam = await Team.findById(_id);

      if (!existingTeam) {
        throw new Error('No team found with that ID!');
      }

      const existingLeague = await League.findOne({ name: league });

      const newLeague = !existingLeague
        ? await League.create({ name: league })
        : null;

      const leagueId = existingLeague ? existingLeague._id : newLeague._id;

      const team = await Team.findOneAndUpdate(
        { _id },
        { name, league: leagueId },
        { new: true }
      );

      await League.findByIdAndUpdate(
        leagueId,
        { $addToSet: { teams: team._id } },
        { new: true }
      );

      return team;
    },
    deleteTeam: async (parent, { _id }, context) => {
      if (context.user) {
        const team = await Team.findByIdAndDelete(_id);

        if (!team) {
          throw new Error('No team found with that ID!');
        }

        const players = await Player.find({ team: _id });
        const playerIds = players.map(player => player._id);

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
      const user = await User.findOne({ email }).populate({
        path: 'teams',
        populate: 'league'
      });

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
