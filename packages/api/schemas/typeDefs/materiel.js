import { gql } from 'apollo-server-express'

export default gql`
  enum AllowedStatus {
    EN_MARCHE
    EN_PANNE
  }

  type Detail {
    id: ID!
    type: String!
    marque: String!
    materiels: [Materiel!]
  }

  type Materiel {
    id: ID!
    serie: String!
    detail: Detail
    user: User
    technicien: Technicien
    status: AllowedStatus
  }

  input AddDetailInput {
    type: String!
    marque: String!
  }

  input UpdateDetailInput {
    type: String
    marque: String
  }

  input AddMaterielInput {
    serie: String!
    detailId: String!
    userId: String
    technicienId: String
    status: String
  }

  input UpdateMaterielInput {
    serie: String
    detailId: ID
    userId: ID
    technicienId: ID
    status: String
  }

  extend type Query {
    materiels: [Materiel!]
    materiel(id: ID!): Materiel
    details: [Detail!]
    detail(id: ID!): Detail
  }

  extend type Mutation {
    addDetail(addDetailFields: AddDetailInput!): Detail
    updateDetail(id: ID!, updateMaterielFields: UpdateDetailInput!): Detail
    deleteDetail(id: ID!): ID!

    addMateriel(addMaterielFields: AddMaterielInput!): Materiel
    updateMateriel(id: ID!, updateMaterielFields: UpdateMaterielInput): Materiel
    deleteMateriel(id: ID!): ID!
  }
`
