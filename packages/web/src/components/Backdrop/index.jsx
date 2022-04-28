import React from 'react'
import { Backdrop as BD, makeStyles, CircularProgress } from '@material-ui/core'

function Backdrop({ loading }) {
  const classes = useStyles()

  return (
    <BD className={classes.backdrop} open={loading}>
      <CircularProgress color="inherit" />
    </BD>
  )
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

export default Backdrop
