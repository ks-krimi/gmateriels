import { Form as FForm, Formik } from 'formik'
import { Typography, Grid, Divider } from '@material-ui/core'
import { useMutation } from '@apollo/client'
import { ADD_DETAIL, UPDATE_DETAIL } from '../../GraphQL/Mutations'
import { LOAD_DETAILS } from '../../GraphQL/Queries'
import Button from '../controlles/Button'
import TextField from '../controlles/TextField'
import { INITIAL_FORM_STATE, FORM_VALIDATION } from './Validation'
import Backdrop from '../Backdrop'

function Form({ initialFormState, setIsOpen }) {
  const [addDetail, { loading: loadingADD_DETAIL, error: errorADD_DETAIL }] =
    useMutation(ADD_DETAIL, {
      update(cache, { data }) {
        const newDetailFromResponse = data?.addDetail
        const existingDetails = cache.readQuery({ query: LOAD_DETAILS })
        cache.writeQuery({
          query: LOAD_DETAILS,
          data: {
            details: [...existingDetails?.details, newDetailFromResponse]
          }
        })
      }
    })

  const [updateDetail, { loading, error }] = useMutation(UPDATE_DETAIL)

  const handleSubmit = (value, helpers) => {
    if (initialFormState) {
      updateDetail({
        variables: {
          id: initialFormState.id,
          updateMaterielFields: { type: value.type, marque: value.marque }
        },
        refetchQueries: [{ query: LOAD_DETAILS }]
      })
      if (loading) return <Backdrop loading={loading} />

      setIsOpen(false)
    } else {
      addDetail({
        variables: {
          addDetailFields: { type: value.type, marque: value.marque }
        }
      })
      if (loadingADD_DETAIL) return <Backdrop loading={loadingADD_DETAIL} />

      setIsOpen(false)
    }
    helpers.resetForm()
  }

  if (errorADD_DETAIL || error) return <p>An error occured</p>

  return (
    <>
      <div style={{ paddingBottom: 16 }}>
        <Typography variant="subtitle1">
          {initialFormState
            ? `Modification de ${initialFormState.type}`
            : "Ajout d'un nouveau type de materiel"}
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
              <TextField required label="type" name="type" autoFocus />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField required label="marque" name="marque" />
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
