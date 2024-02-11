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