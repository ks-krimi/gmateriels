import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@material-ui/core";
import { useEffect } from "react";
import RendreLibre from "../Materiel/RendreLibre";

function ListMateriel({ user = [], setIsOpen }) {
  useEffect(() => {
    if (user.materiels.length <= 0) {
      setIsOpen(false);
    }
  }, [user, setIsOpen]);

  return (
    <>
      <Typography variant="subtitle1">{`Les materiels utiliser par ${user.nom}`}</Typography>
      <Divider />
      <List dense>
        {user?.materiels.map((materiel, index) => (
          <ListItem key={materiel.serie} style={{ position: "relative" }}>
            <RendreLibre
              id={materiel.id}
              ilikedeleteicon
              style={{ position: "absolute", right: 0 }}
            />
            <ListItemText
              primary={materiel.serie}
              secondary={`${materiel.detail.type}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default ListMateriel;
