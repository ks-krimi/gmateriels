import { IconButton } from '@material-ui/core'
import { PersonAddDisabled, Delete } from '@material-ui/icons'
import { useMutation } from '@apollo/client'
import { RENDRE_LIBRE_MATERIEL } from '../../GraphQL/Mutations'
import React from 'react'
import Backdrop from '../Backdrop'

function RendreLibre(props) {
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
            id: props.id,
            updateMaterielFields: { userId: null }
          }
        })
      }
    >
      {props.ilikedeleteicon ? <Delete /> : <PersonAddDisabled />}
    </IconButton>
  )
}

export default RendreLibre
