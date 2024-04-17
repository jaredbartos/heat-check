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

export const GET_RECENTLY_UPDATED_TEAMS = gql`
  query getRecentlyUpdatedTeams {
    recentlyUpdatedTeams {
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
      }
      createdBy {
        _id
        username
        email
      }
    }
  }
`;

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
