import React from "react";
import { Button as MButton, CircularProgress } from "@material-ui/core";
import { useFormikContext } from "formik";

function Button({ children, ...otherProps }) {
  const { submitForm, isValid, isSubmitting } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };
  const buttonConfig = {
    ...otherProps,
    variant: "contained",
    color: "primary",
    onClick: handleSubmit,
  };

  return (
    <MButton
      startIcon={isSubmitting && <CircularProgress size="1rem" />}
      disabled={!isValid || isSubmitting}
      {...buttonConfig}
    >
      {children}
    </MButton>
  );
}

export default Button;
