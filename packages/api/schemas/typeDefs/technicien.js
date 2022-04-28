import { gql } from 'apollo-server-express'

export default gql`
  type Technicien {
    id: ID!
    nom: String!
    prenom: String
    contact: String
    maintenances: [Materiel!]
  }

  input AddTechnicienInput {
    nom: String!
    prenom: String!
    contact: String
  }

  input UpdateTechnicienInput {
    nom: String
    prenom: String
    contact: String
  }

  extend type Query {
    techniciens: [Technicien!]
    technicien(id: ID!): Technicien
  }

  extend type Mutation {
    addTechnicien(addTechnicienFields: AddTechnicienInput!): Technicien
    updateTechnicien(
      id: ID!
      updateTechnicienFields: UpdateTechnicienInput!
    ): Technicien
    deleteTechnicien(id: ID!): ID!
  }
`
