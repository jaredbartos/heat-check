const typeDefs = `
  type Performance {
    _id: ID!
    fgAtt: Int!
    fgMade: Int!
    threePtAtt: Int!
    threePtMade: Int!
    ftAtt: Int!
    ftMade: Int!
    offReb: Int!
    rebounds: Int!
    assists: Int!
    steals: Int!
    blocks: Int!
    turnovers: Int!
    points: Int!
    player: Player!
    date: String!
    createdBy: User
  }

  type Averages {
    _id: ID!
    fgAtt: Float
    fgMade: Float
    threePtAtt: Float
    threePtMade: Float
    ftAtt: Float
    ftMade: Float
    offReb: Float
    rebounds: Float
    assists: Float
    steals: Float
    blocks: Float
    turnovers: Float
    points: Float
  }

  type Percentages {
    _id: ID!
    fgPercentage: Float
    threePtPercentage: Float
    ftPercentage: Float
  }

  input PerformanceInput {
    fgAtt: Int
    fgMade: Int
    threePtAtt: Int
    threePtMade: Int
    ftAtt: Int
    ftMade: Int
    offReb: Int
    rebounds: Int
    assists: Int
    steals: Int
    blocks: Int
    turnovers: Int
    points: Int
    player: ID
    date: String
  }

  type Player {
    _id: ID!
    firstName: String!
    lastName: String
    position: String!
    number: Int
    height: String
    weight: Int
    team: Team
    performances: [Performance]
    averages: Averages
    percentages: Percentages
    createdBy: User
  }

  input PlayerInput {
    firstName: String
    lastName: String
    position: String
    number: Int
    height: String
    weight: Int
    team: ID
  }

  type Team {
    _id: ID!
    name: String!
    league: League
    players: [Player]
    createdBy: User
  }

  type League {
    _id: ID!
    name: String!
    teams: [Team]
  }

  type User {
    _id: ID
    username: String!
    email: String!
    teams: [Team]
    players: [Player]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    teams: [Team]
    team(_id: ID!): Team
    leagues: [League]
    recentlyUpdatedTeams: [Team]
    player(_id: ID!): Player
    players: [Player]
    performance(_id: ID!): Performance
    rankPerformanceByField(field: String!): [Performance]
    me: User
  }

  type Mutation {
    addPerformance(input: PerformanceInput, createdBy: ID!): Performance
    addPlayer(input: PlayerInput, createdBy: ID!): Player
    addTeam(name: String!, league: String!, createdBy: ID!): Team
    updatePerformance(_id: ID, input: PerformanceInput): Performance
    updatePlayer(_id: ID, input: PlayerInput): Player
    updateTeam(_id: ID, name: String, league: String): Team
    deletePerformance(_id: ID!): Performance
    deletePlayer(_id: ID!): Player
    deleteTeam(_id: ID!): Team
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
