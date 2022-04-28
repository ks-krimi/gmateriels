import * as Yup from 'yup'

// formik validation
export const INITIAL_FORM_STATE = {
  nom: '',
  prenom: '',
  contact: ''
}
export const FORM_VALIDATION = Yup.object().shape({
  nom: Yup.string()
    .min(3, 'Trois (03) caractères minimum')
    .required('Le nom est vide'),
  prenom: Yup.string()
    .min(3, 'Trois (03) caractères minimum')
    .required('Le prenom est vide'),
  contact: Yup.string().required('Le contact est vide')
})
