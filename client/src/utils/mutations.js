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
  mutation addTeam($name: String!, $league: String!) {
    addTeam(name: $name, league: $league){
      _id
      name
      league
    }
  }
`;

export const ADD_PLAYER = gql`
  mutation addPlayer($input: PlayerInput) {
    addPlayer(input: $input) {
      _id
      firstName
      lastName
    }
  }
`;

export const ADD_PERFORMANCE = gql`
  mutation addPerformance($input: PerformanceInput) {
    addPerformance(input: $input) {
      _id
      player
      points
      date
    }
  }
`;