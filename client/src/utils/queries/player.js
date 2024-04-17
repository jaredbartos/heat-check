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
      createdBy {
        _id
        username
        email
      }
    }
  }
`;

export const GET_PLAYERS_BY_TEAM = gql`
  query getPlayersByTeam($id: ID!) {
    playersByTeam(_id: $id) {
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
    }
  }
`;
