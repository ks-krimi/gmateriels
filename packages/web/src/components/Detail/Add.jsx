import { Fab } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { useState } from "react";
import Dialog from "../Dialog";
import Form from "./Form";

function Add() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        onClick={handleClick}
        style={{ position: "absolute", bottom: 25, right: 0 }}
      >
        <AddIcon style={{ marginRight: 2 }} />
        Type de materiel
      </Fab>
      <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form setIsOpen={setIsOpen} />
      </Dialog>
    </>
  );
}

export default Add;
