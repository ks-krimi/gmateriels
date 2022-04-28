import * as Yup from 'yup'

// formik validation
export const INITIAL_FORM_STATE = { serie: '', detailId: '' }
export const FORM_VALIDATION = Yup.object().shape({
  serie: Yup.string()
    .min(3, 'Trois (03) caractères minimum')
    .required('Le serie du materiel est vide'),
  detailId: Yup.string()
    .min(3, 'Trois (03) caractères minimum')
    .required('Le type du materiel est vide')
})

// formik validation
export const RENDRE_OCCUPER_INITIAL_FORM_STATE = { userId: '' }
export const RENDRE_OCCUPER_FORM_VALIDATION = Yup.object().shape({
  userId: Yup.string().required('Le utilisateur est vide')
})

// formik validation
export const RENDRE_EN_PANNE_INITIAL_FORM_STATE = { technicienId: '' }
export const RENDRE_EN_PANNE_FORM_VALIDATION = Yup.object().shape({
  technicienId: Yup.string().required('Le technicien est vide')
})
