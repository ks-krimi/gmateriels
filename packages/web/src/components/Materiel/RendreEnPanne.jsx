import { IconButton, Typography, Grid } from '@material-ui/core'
import { NotInterested } from '@material-ui/icons'
import { useState } from 'react'
import Dialog from '../Dialog'
import { Form as FForm, Formik } from 'formik'
import Button from '../controlles/Button'
import Select from '../controlles/Select'
import {
  RENDRE_EN_PANNE_INITIAL_FORM_STATE,
  RENDRE_EN_PANNE_FORM_VALIDATION
} from './Validation'
import { UPDATE_MATERIEL } from '../../GraphQL/Mutations'
import { useMutation, useQuery } from '@apollo/client'
import { createOptionsTechnicien } from '../../utils'
import { LOAD_MATERIELS, LOAD_TECHNICIENS } from '../../GraphQL/Queries'
import Backdrop from '../Backdrop'

function RendreEnPanne({ materiel }) {
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => {
    setIsOpen(true)
  }

  const { loading: gettingTechnicien, data: technicienData } =
    useQuery(LOAD_TECHNICIENS)

  const [updateMateriel, { loading, error }] = useMutation(UPDATE_MATERIEL)

  const handleSubmit = (value, helpers) => {
    updateMateriel({
      variables: {
        id: materiel.id,
        updateMaterielFields: {
          status: 'en panne',
          technicienId: value.technicienId
        }
      },
      refetchQueries: [{ query: LOAD_MATERIELS }, { query: LOAD_TECHNICIENS }]
    })
    helpers.resetForm()
    setIsOpen(false)
  }

  const optionsTechnicien = createOptionsTechnicien(technicienData?.techniciens)

  if (loading) return <Backdrop loading={loading} />

  if (error) return <p>An error occured</p>

  return (
    <>
      <IconButton onClick={handleClick}>
        <NotInterested />
      </IconButton>
      <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <Typography variant="h6">Confier {materiel.serie} à :</Typography>
        <Formik
          initialValues={{ ...RENDRE_EN_PANNE_INITIAL_FORM_STATE }}
          validationSchema={RENDRE_EN_PANNE_FORM_VALIDATION}
          onSubmit={handleSubmit}
        >
          <FForm autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Select
                  required
                  label="technicien"
                  name="technicienId"
                  options={
                    gettingTechnicien
                      ? [{ id: null, value: 'loading...' }]
                      : optionsTechnicien
                  }
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button variant="outlined">OK</Button>
              </Grid>
            </Grid>
          </FForm>
        </Formik>
      </Dialog>
    </>
  )
}

export default RendreEnPanne
