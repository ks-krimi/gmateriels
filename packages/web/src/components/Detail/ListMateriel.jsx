import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@material-ui/core";
import { ArrowRightAlt } from "@material-ui/icons";
import { useEffect } from "react";

function ListMateriel({ detail = [], setIsOpen }) {
  useEffect(() => {
    if (detail.materiels.length <= 0) {
      setIsOpen(false);
    }
  }, [detail, setIsOpen]);

  return (
    <>
      <Typography variant="subtitle1">{`Les listes des ${detail.type}(s) : `}</Typography>
      <Divider />
      <List dense>
        {detail?.materiels.map((materiel, index) => (
          <ListItem key={materiel.serie} style={{ position: "relative" }}>
            <ArrowRightAlt />
            <ListItemText style={{ paddingLeft: 8 }} primary={materiel.serie} />
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default ListMateriel;
