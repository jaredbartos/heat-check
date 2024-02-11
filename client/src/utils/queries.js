import { gql } from '@apollo/client';

export const QUERY_TEAMS = gql`
  query getTeams {
    teams {
      _id
      name
      league
      players {
        _id
        firstName
        lastName
        position
        height
      }
    }
  }
`;

export const QUERY_ME = gql`
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
        }
      }
    }
  }
`;

export const QUERY_SINGLE_PLAYER = gql`
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
    }
  }
`;