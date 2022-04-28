import * as Yup from "yup";

// formik validation
export const INITIAL_FORM_STATE = {
  nom: "",
  prenom: "",
  fonction: "",
  email: "",
  password: "",
};
export const FORM_VALIDATION = Yup.object().shape({
  nom: Yup.string()
    .min(3, "Trois (03) caractères minimum")
    .required("Le nom est vide"),
  prenom: Yup.string()
    .min(3, "Trois (03) caractères minimum")
    .required("Le prenom est vide"),
  fonction: Yup.string().required("La fonction est vide"),
  /*   email: Yup.string()
    .required("L'email est vide")
    .email("Ce n'est pas un email"),
  password: Yup.string()
    .min(3, "Trois (03) caractères minimum")
    .required("Le mot de passe est vide"), */
});
