import { useMutation } from '@apollo/client'
import { IconButton } from '@material-ui/core'
import { Delete as MDelete } from '@material-ui/icons'
import { DELETE_MATERIEL } from '../../GraphQL/Mutations'
import { LOAD_DETAILS, LOAD_MATERIELS } from '../../GraphQL/Queries'
import Backdrop from '../Backdrop'

function Delete(props) {
  const [deleteMateriel, { loading, error }] = useMutation(DELETE_MATERIEL, {
    update(cache, { data }) {
      // add a new user to the existing array
      const deletedMaterielFromResponse = data?.deleteMateriel
      const existingMateriel = cache.readQuery({ query: LOAD_MATERIELS })
      cache.writeQuery({
        query: LOAD_MATERIELS,
        data: {
          materiels: existingMateriel?.materiels.filter(
            (materiel) => materiel.id !== deletedMaterielFromResponse
          )
        }
      })
    }
  })

  if (loading) return <Backdrop loading={loading} />
  if (error) return <p>Error occured</p>

  return (
    <IconButton
      onClick={() =>
        deleteMateriel({
          variables: {
            id: props.id
          },
          refetchQueries: [{ query: LOAD_DETAILS }]
        })
      }
    >
      <MDelete />
    </IconButton>
  )
}

export default Delete
