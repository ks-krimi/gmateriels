import * as Yup from "yup";

// formik validation
export const INITIAL_FORM_STATE = { type: "", marque: "" };
export const FORM_VALIDATION = Yup.object().shape({
  type: Yup.string().required("Le type du materiel est vide"),
  marque: Yup.string().required("Le marque est vide"),
});
