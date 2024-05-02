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
            league {
              _id
              name
            }
          }
          averages {
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
          }
        }
      }
    }
  }
`;
