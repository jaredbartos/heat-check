const typeDefs = `
  type Performance {
    _id: ID
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
    date: String
    createdBy: ID
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
    _id: ID
    firstName: String!
    lastName: String
    position: String!
    number: Int
    height: String
    weight: Int
    team: Team
    performances: [Performance]
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
    _id: ID
    name: String!
    league: String!
    players: [Player]
    createdBy: User
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
    players: [Player]
    player(_id: ID!): Player
    performances: [Performance]
    performance(_id: ID!): Performance
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