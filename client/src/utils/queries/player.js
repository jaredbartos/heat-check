import { gql } from '@apollo/client';

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
      averages {
        _id
        avgFgAtt
        avgFgMade
        avgThreePtAtt
        avgThreePtMade
        avgFtAtt
        avgFtMade
        avgOffReb
        avgRebounds
        avgAssists
        avgSteals
        avgBlocks
        avgTurnovers
        avgPoints
      }
      percentages {
        _id
        fgPercentage
        threePtPercentage
        ftPercentage
      }
      createdBy {
        _id
        username
        email
      }
    }
  }
`;
