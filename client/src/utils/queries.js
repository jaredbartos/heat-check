import { gql } from '@apollo/client';

export const GET_TEAMS = gql`
  query getTeams {
    teams {
      _id
      name
      league
      players {
        _id
        number
        firstName
        lastName
        position
        height
      }
      createdBy {
        _id
        username
        email
      }
    }
  }
`;

export const GET_SINGLE_TEAM = gql`
  query getSingleTeam($id: ID!) {
    team(_id: $id) {
      _id
      name
      league
      players {
        _id
        firstName
        lastName
        position
        number
        height
        weight
      }
      createdBy {
        _id
        username
        email
      }
    }
  }
`;

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      teams {
        _id
        name
        league
        players {
          _id
          firstName
          lastName
          position
          number
        }
      }
      players {
        _id
        firstName
        lastName
        position
        number
      }
    }
  }
`;

export const GET_SINGLE_PLAYER = gql`
  query getSinglePlayer($id: ID!) {
    player(_id: $id) {
      _id
      firstName
      lastName
      position
      number
      height
      weight
      team {
        _id
        name
        league
      }
      performances {
        _id
        fgAtt
        fgMade
        threePtAtt
        threePtMade
        ftAtt
        ftMade
        offReb
        rebounds
        assists
        steals
        blocks
        turnovers
        points
        date
      }
      createdBy {
        _id
        username
        email
      }
    }
  }
`;