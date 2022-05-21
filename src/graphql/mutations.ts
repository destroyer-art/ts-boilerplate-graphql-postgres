import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(input: { email: $email, password: $password }) {
      id
      token
      message
    }
  }
`;

export const SIGN_IN_USER = gql`
  mutation SignInUser($email: String!, $password: String!) {
    signInUser(input: { email: $email, password: $password }) {
      id
      token
      message
    }
  }
`;

export const SIGN_OUT_USER = gql`
  mutation SignOutUser {
    signOutUser {
      status
    }
  }
`;
