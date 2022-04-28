module.exports.errorsRegister = (error) => {
  let errors = {
    nom: "",
    prenom: "",
    email: "",
    password: "",
    level: "",
  };

  error.message.includes("nom") &&
    (errors.nom =
      "Au moin 3 caractères et sans caractères spéciaux ni des nombres");
  error.message.includes("prenom") &&
    (errors.prenom =
      "Au moin 3 caractères et sans caractères spéciaux ni des nombres");
  error.message.includes("email") && (errors.email = "Email invalide");
  error.message.includes("password") &&
    (errors.password = "Mot de passe trop court, au moin 8 caractères.");
  error.code === 11000 &&
    error.keyPattern.email &&
    (errors.email = "Email déjà pris");

  return errors;
};

module.exports.errorsLogin = (error) => {
  let errors = { email: "", password: "" };
  error.message.includes("Unknown user") &&
    (errors.email = "Désolé,l'email est inconnu");
  error.message.includes("Invalid password") &&
    (errors.password = "Désolé, le mot de passe est incorrect");

  return errors;
};
