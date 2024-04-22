import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      teams {
        _id
        name
        league {
          _id
          name
        }
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
