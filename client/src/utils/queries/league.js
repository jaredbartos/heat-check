import { gql } from '@apollo/client';

export const GET_LEAGUES = gql`
  query getLeagues {
    leagues {
      _id
      name
    }
  }
`;
