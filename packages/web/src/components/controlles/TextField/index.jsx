import React from 'react'
import { TextField } from '@material-ui/core'
import { useField } from 'formik'

function TextFieldWrapper({ name, ...othersProps }) {
  const [field, metadata] = useField(name)
  const configTextField = {
    variant: 'outlined',
    fullWidth: true,
    ...field,
    ...othersProps
  }

  if (metadata && metadata.error && metadata.touched) {
    configTextField.error = true
    configTextField.helperText = metadata.error
  }

  return <TextField {...configTextField} />
}

export default TextFieldWrapper
