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
    player: ID!
    date: String
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
    league: String
    players: [Player]
  }

  type User {
    _id: ID
    username: String!
    email: String!
    teams: [Team]
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
    addPerformance(input: PerformanceInput): Performance
    addPlayer(input: PlayerInput): Player
    addTeam(name: String!, league: String): Team
    updatePerformance(_id: ID, input: PerformanceInput): Performance
    updatePlayer(_id: ID, input: PlayerInput): Player
    updateTeam(_id: ID, name: String, league: String): Team
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;