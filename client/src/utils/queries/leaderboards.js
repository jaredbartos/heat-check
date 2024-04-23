import { gql } from '@apollo/client';

export const GET_ALL_AVG_LEADERBOARDS = gql`
  query getAllAvgLeaderboards {
    allAvgLeaderboards {
      _id
      category
      leaders {
        _id
        player {
          _id
          firstName
          lastName
          team {
            _id
            name
          }
        }
        value
      }
    }
  }
`;
