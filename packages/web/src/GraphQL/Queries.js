import { gql } from '@apollo/client'

export const LOAD_USERS = gql`
  {
    users {
      id
      nom
      prenom
      fonction
      email
      password
      level
      materiels {
        id
        serie
        detail {
          id
          type
          marque
        }
      }
    }
  }
`

export const LOAD_MATERIELS = gql`
  {
    materiels {
      id
      serie
      status
      detail {
        type
        marque
      }
      user {
        id
        nom
        prenom
      }
      technicien {
        id
        nom
        prenom
        contact
      }
    }
  }
`

export const LOAD_DETAILS = gql`
  {
    details {
      id
      type
      marque
      materiels {
        id
        serie
        detail {
          id
          type
          marque
        }
        user {
          id
          nom
          prenom
        }
      }
    }
  }
`

export const LOAD_TECHNICIENS = gql`
  {
    techniciens {
      id
      nom
      prenom
      contact
      maintenances {
        id
        serie
        detail {
          id
          type
          marque
        }
      }
    }
  }
`
