import React from 'react'
import { Form as FForm, Formik } from 'formik'
import { Typography, Grid } from '@material-ui/core'
import Button from '../controlles/Button'
import TextField from '../controlles/TextField'
import Select from '../controlles/Select'
import { INITIAL_FORM_STATE, FORM_VALIDATION } from './Validation'
import { createOptionsDetailMateriel } from '../../utils'
import { LOAD_DETAILS, LOAD_MATERIELS, LOAD_USERS } from '../../GraphQL/Queries'
import { ADD_MATERIEL } from '../../GraphQL/Mutations'
import { useQuery, useMutation } from '@apollo/client'
import Backdrop from '../Backdrop'

function Form() {
  const { loading, data } = useQuery(LOAD_DETAILS)

  const [addMateriel, { loading: loadingMateriel, error }] = useMutation(
    ADD_MATERIEL,
    {
      update(cache, { data }) {
        // add a new user to the existing array
        const newMaterielFromResponse = data?.addMateriel
        const existingMateriel = cache.readQuery({ query: LOAD_MATERIELS })
        cache.writeQuery({
          query: LOAD_MATERIELS,
          data: {
            materiels: [...existingMateriel?.materiels, newMaterielFromResponse]
          }
        })
      }
    }
  )

  const handleSubmit = (value, helpers) => {
    addMateriel({
      variables: {
        addMaterielFields: {
          serie: value.serie,
          detailId: value.detailId
        }
      },
      refetchQueries: [{ query: LOAD_DETAILS }]
    })
    helpers.resetForm()
  }

  const optionsMateriel = createOptionsDetailMateriel(data?.details)

  if (loadingMateriel) return <Backdrop loading={loading} />
  if (error) return <p>An error occured</p>

  return (
    <>
      <Typography variant="h6">Ajout d'un nouveau materiel</Typography>
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={handleSubmit}
      >
        <FForm autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField required label="serie" name="serie" autoFocus />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                required
                label="type"
                name="detailId"
                options={
                  loading
                    ? [{ id: null, value: 'loading...' }]
                    : optionsMateriel
                }
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button variant="outlined">Ajouter</Button>
            </Grid>
          </Grid>
        </FForm>
      </Formik>
    </>
  )
}

export default Form
