import { gql } from '@apollo/client';

export const GET_RANKED_PERFORMANCES = gql`
  query getRankedPerformances($field: String!) {
    rankPerformanceByField(field: $field) {
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
      }
      date
      createdBy {
        _id
        username
        email
      }
    }
  }
`;
