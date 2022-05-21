import { gql } from 'apollo-server-express';

const typeDefs = gql`
  input EmailPayload {
    email: String!
  }
  input CredensPayload {
    email: String!
    password: String!
  }
  type IsAuthPayload {
    status: Int!
  }
  type User {
    id: String!
    email: String!
    password: String!
  }
  type Query {
    getUserByEmail(input: EmailPayload): User
    isAuthenticated: IsAuthPayload
  }
  type AuthRes {
    id: String
    token: String
    message: String!
  }
  type Mutation {
    createUser(input: CredensPayload): AuthRes!
    signInUser(input: CredensPayload): AuthRes!
    signOutUser: IsAuthPayload!
  }
`;

export default typeDefs;
