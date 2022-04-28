import { gql } from 'apollo-server-express'

export default gql`
  type User {
    id: ID!
    nom: String!
    prenom: String!
    fonction: String
    email: String
    password: String
    level: Int
    materiels: [Materiel!]
  }

  input AddUserInput {
    nom: String!
    prenom: String!
    fonction: String!
    email: String
    password: String
    level: Int
  }

  input UpdateUserInput {
    nom: String
    prenom: String
    fonction: String
    email: String
    password: String
    level: Int
  }

  extend type Query {
    users: [User!]
    user(id: ID!): User
  }

  extend type Mutation {
    addUser(addUserFields: AddUserInput!): User!
    updateUser(id: ID!, updateUserFields: UpdateUserInput): User!
    deleteUser(id: ID!): ID!
  }
`
