import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { useState } from "react";
import Drawer from "./Drawer";
import Logout from "../Auth/Logout";

function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            G. Materiels
          </Typography>
          <Logout />
        </Toolbar>
      </AppBar>
      <Drawer open={open} setOpen={setOpen} />
    </>
  );
}

export default Navigation;
