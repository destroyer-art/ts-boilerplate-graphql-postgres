import { gql } from '@apollo/client';

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    getUserByEmail(input: { email: $email }) {
      id
      email
    }
  }
`;

export const IS_AUTHENTICATED = gql`
  query IsAuthenticated {
    isAuthenticated {
      status
    }
  }
`;
