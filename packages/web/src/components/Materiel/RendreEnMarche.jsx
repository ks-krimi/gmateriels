import React from 'react'
import { IconButton } from '@material-ui/core'
import { Check } from '@material-ui/icons'
import { useMutation } from '@apollo/client'
import { RENDRE_LIBRE_MATERIEL } from '../../GraphQL/Mutations'
import { LOAD_MATERIELS, LOAD_TECHNICIENS } from '../../GraphQL/Queries'
import Backdrop from '../Backdrop'

function RendreEnMarche({ materiel, ...props }) {
  const [updateMateriel, { loading, error }] = useMutation(
    RENDRE_LIBRE_MATERIEL
  )

  if (loading) return <Backdrop loading={loading} />

  if (error) return <p>Error occured</p>

  return (
    <IconButton
      style={props.style}
      onClick={() =>
        updateMateriel({
          variables: {
            id: materiel.id,
            updateMaterielFields: {
              status: 'en marche',
              technicienId: null
            }
          },
          refetchQueries: [
            { query: LOAD_MATERIELS },
            { query: LOAD_TECHNICIENS }
          ]
        })
      }
    >
      <Check />
    </IconButton>
  )
}

export default RendreEnMarche
