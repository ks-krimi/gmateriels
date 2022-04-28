import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextField from '../controlles/TextField'
import Button from '../controlles/Button'
import axios from 'axios'
import Snakbar from '../Snackbar'
import { IconButton, InputAdornment, Link } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { getToken } from '../../utils/auth'

export default function Login({ setIsLoggin }) {
  const [emailErr, setEmailErr] = useState(false)
  const [passwordErr, setPasswordErr] = useState(false)
  const [emailHelper, setEmailHelper] = useState('')
  const [passwordHelper, setPasswordHelper] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const classes = useStyles()
  const history = useHistory()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  // formik validation
  const INITIAL_FORM_STATE = { email: '', password: '' }
  const FORM_VALIDATION = Yup.object().shape({
    email: Yup.string()
      .email('Email invalide')
      .required('Veuiller saisir votre email'),
    password: Yup.string().required('Veuiller saisir votre mot de passe')
  })

  const sleep = (time) => new Promise((acc) => setTimeout(acc, time))

  const handleSubmit = async (values) => {
    await sleep(3000)
    const { email, password } = values
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      data: { email, password },
      withCredentials: true
    })
      .then(async (res) => {
        if (res.data.errors) {
          const { email, password } = res.data.errors
          if (email) {
            setEmailErr(true)
            setEmailHelper(email)
          }
          if (password) {
            setPasswordErr(true)
            setPasswordHelper(password)
          }
        } else {
          await getToken()
          history.push('/')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Se connecter
        </Typography>
        <Formik
          initialValues={{ ...INITIAL_FORM_STATE }}
          validationSchema={FORM_VALIDATION}
          onSubmit={handleSubmit}
        >
          <Form autoComplete="off" className={classes.form}>
            <TextField
              margin="normal"
              required
              label="Votre email"
              name="email"
              autoFocus
              error={emailErr}
              helperText={emailHelper}
            />
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              margin="normal"
              required
              name="password"
              label="Votre mot de passe"
              type={showPassword ? 'text' : 'password'}
              error={passwordErr}
              helperText={passwordHelper}
            />

            <Link onClick={() => setIsLoggin(false)} color="textPrimary">
              Je n'ai pas un compte. Créer un compte?
            </Link>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Se connecter
            </Button>
          </Form>
        </Formik>
      </div>
      <Snakbar
        open={emailErr}
        setOpen={setEmailErr}
        setTextHelper={setEmailHelper}
        severity="error"
        alertTitle="Email inconnu"
        alertMessage={emailHelper}
      />
      <Snakbar
        open={passwordErr}
        setOpen={setPasswordErr}
        setTextHelper={setPasswordHelper}
        severity="error"
        alertTitle="Mot de passe incorect"
        alertMessage={passwordHelper}
      />
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))
