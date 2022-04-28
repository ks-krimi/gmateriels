import {
  Container,
  IconButton,
  Snackbar as SnakbarWrapper,
} from "@material-ui/core";
import { CloseOutlined } from "@material-ui/icons";
import { Alert, AlertTitle } from "@material-ui/lab";
import React from "react";

function Snakbar({
  open,
  setOpen,
  setTextHelper,
  severity,
  alertTitle,
  alertMessage,
}) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
    setTextHelper(null);
  };
  return (
    <Container>
      <SnakbarWrapper
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={10_000}
        onClose={handleClose}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseOutlined fontSize="small" />
            </IconButton>
          </>
        }
      >
        <Alert severity={severity}>
          <AlertTitle>{alertTitle}</AlertTitle>
          {alertMessage}
        </Alert>
      </SnakbarWrapper>
    </Container>
  );
}

export default Snakbar;
