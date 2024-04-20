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
        averages {
          _id
          avgRebounds
          avgAssists
          avgPoints
        }
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
