import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        teams {
          _id
          name
          league
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    } 
  }
`;

export const ADD_TEAM = gql`
  mutation addTeam($name: String!, $league: String!, $createdBy: ID!) {
    addTeam(name: $name, league: $league, createdBy: $createdBy){
      _id
      name
      league
    }
  }
`;

export const ADD_PLAYER = gql`
  mutation addPlayer($input: PlayerInput, $createdBy: ID!) {
    addPlayer(input: $input, createdBy: $createdBy) {
      _id
      firstName
      lastName
    }
  }
`;

export const ADD_PERFORMANCE = gql`
  mutation addPerformance($input: PerformanceInput, $createdBy: ID!) {
    addPerformance(input: $input, createdBy: $createdBy) {
      _id
      points
      date
    }
  }
`;

export const UPDATE_PERFORMANCE = gql`
  mutation updatePerformance($_id: ID, $input: PerformanceInput) {
    updatePerformance(_id: $_id, input: $input) {
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
  }
`;

export const UPDATE_PLAYER = gql`
  mutation updatePlayer($_id: ID, $input: PlayerInput) {
    updatePlayer(_id: $_id, input: $input) {
      _id
      firstName
      lastName
    }
  }
`;

export const UPDATE_TEAM = gql`
  mutation updateTeam($_id: ID, $name: String, $league: String) {
    updateTeam(_id: $_id, name: $name, league: $league) {
      _id
      name
      league
    }
  }
`;

export const DELETE_PERFORMANCE = gql`
  mutation deletePerformance($_id: ID!) {
    deletePerformance(_id: $_id) {
      _id
      points
      date
    }
  }
`;

export const DELETE_PLAYER = gql`
  mutation deletePlayer($_id: ID!) {
    deletePlayer(_id: $_id) {
      _id
      firstName
      lastName
    }
  }
`;

export const DELETE_TEAM = gql`
  mutation deleteTeam($_id: ID!) {
    deleteTeam(_id: $_id) {
      _id
      name
    }
  }
`;