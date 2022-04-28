import { Form as FForm, Formik } from 'formik'
import { Typography, Grid, Divider } from '@material-ui/core'
import { useMutation } from '@apollo/client'
import { ADD_TECHNICIEN, UPDATE_TECHNICIEN } from '../../GraphQL/Mutations'
import { LOAD_TECHNICIENS } from '../../GraphQL/Queries'
import Button from '../controlles/Button'
import TextField from '../controlles/TextField'
import { INITIAL_FORM_STATE, FORM_VALIDATION } from './Validation'
import Backdrop from '../Backdrop'

function Form({ initialFormState, setIsOpen }) {
  const [
    addTechnicien,
    { loading: loadingADD_TECHNICIEN, error: errorADD_TECHNICIEN }
  ] = useMutation(ADD_TECHNICIEN)

  const [updateTechnicien, { loading, error }] = useMutation(UPDATE_TECHNICIEN)

  const handleSubmit = (value, helpers) => {
    if (initialFormState) {
      updateTechnicien({
        variables: {
          id: initialFormState.id,
          updateTechnicienFields: {
            nom: value.nom,
            prenom: value.prenom,
            contact: value.contact
          }
        },
        refetchQueries: [{ query: LOAD_TECHNICIENS }]
      })

      if (loading) return <Backdrop loading={loading} />

      setIsOpen(false)
    } else {
      addTechnicien({
        variables: {
          addTechnicienFields: {
            nom: value.nom,
            prenom: value.prenom,
            contact: value.contact
          }
        },
        refetchQueries: [{ query: LOAD_TECHNICIENS }]
      })
      if (loadingADD_TECHNICIEN)
        return <Backdrop loading={loadingADD_TECHNICIEN} />
      setIsOpen(false)
    }
    helpers.resetForm()
  }

  if (errorADD_TECHNICIEN || error) return <p>An error occured</p>

  return (
    <>
      <div style={{ paddingBottom: 16 }}>
        <Typography variant="subtitle1">
          {initialFormState
            ? `Modification de ${initialFormState.nom}`
            : "Ajout d'un nouveau technicien"}
        </Typography>
        <Divider />
      </div>
      <Formik
        initialValues={{
          ...(initialFormState ? initialFormState : INITIAL_FORM_STATE)
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={handleSubmit}
      >
        <FForm autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField required label="nom" name="nom" autoFocus />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required label="prenom" name="prenom" />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField required label="contact" name="contact" />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button variant="outlined">
                {initialFormState ? 'Modifier' : 'Ajouter'}
              </Button>
            </Grid>
          </Grid>
        </FForm>
      </Formik>
    </>
  )
}

export default Form
