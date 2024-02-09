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
    defReb: Int!
    assists: Int!
    steals: Int!
    blocks: Int!
    turnovers: Int!
    points: Int!
    player: ID!
    date: DateTime
  }

  input PerformanceInput {
    fgAtt: Int
    fgMade: Int
    threePtAtt: Int
    threePtMade: Int
    ftAtt: Int
    ftMade: Int
    offReb: Int
    defReb: Int
    assists: Int
    steals: Int
    blocks: Int
    turnovers: Int
    points: Int
    player: ID
    date: DateTime
  }

  type Player {
    _id: ID
    firstName: String!
    lastName: String
    position: String!
    number: Int
    height: Int
    weight: Int
    performances: [Performance]
  }

  input PlayerInput {
    firstName: String
    lastName: String
    position: String
    number: Int
    height: Int
    weight: Int
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
    players: [Player]
    performances: [Performance]
    user: User
  }

  type Mutation {
    addPerformance(input: PerformanceInput): Performance
    addPlayer(input: PlayerInput): Player
    addTeam(name: String!, league: String): Team
    updatePerformance(input: PerformanceInput): Performance
    updatePlayer(input: PlayerInput): Player
    updateTeam(name: String, league: String): Team
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;