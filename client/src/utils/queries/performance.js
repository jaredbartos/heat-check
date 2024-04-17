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
          league
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

export const GET_PERFORMANCES_BY_PLAYER = gql`
  query getPerformancesByPlayer($id: ID!) {
    performancesByPlayer(_id: $id) {
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

export const GET_AVG_PERFORMANCE_BY_PLAYER = gql`
  query getAvgPerformanceByPlayer($id: ID!) {
    avgPerformanceByPlayer(_id: $id) {
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
  }
`;

export const GET_AVG_PLAYER_PERFORMANCE_BY_TEAM = gql`
  query getAvgPlayerPerformanceByTeam($id: ID!) {
    avgPlayerPerformanceByTeam(_id: $id) {
      _id
      firstName
      lastName
      avgRebounds
      avgAssists
      avgPoints
    }
  }
`;
