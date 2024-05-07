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
        league {
          _id
          name
        }
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

export const GET_PLAYERS = gql`
  query getPlayers {
    players {
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
        league {
          _id
          name
        }
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
