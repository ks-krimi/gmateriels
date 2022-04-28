import { Link } from "react-router-dom";
import { Paper, Typography, makeStyles } from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import useTitle from "../../hooks/useTitle";

function PageNotFound() {
  const classes = useStyle();
  useTitle("Page introuvable");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        height: "100vh",
      }}
    >
      <Paper
        variant="outlined"
        style={{
          maxHeight: 200,
          maxWidth: 400,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <Typography variant="h5"> Page introuvable</Typography>
        <p>
          Désolé,le lien que vous avez demandé n'exist pas dans notre
          application.
        </p>
        <p style={{ display: "flex", alignItems: "center" }}>
          <ChevronLeft color="primary" />
          <Link to="/" className={classes.root}>
            Retourner à la page d'acceuil
          </Link>
        </p>
      </Paper>
    </div>
  );
}

const useStyle = makeStyles((theme) => {
  return {
    root: {
      color: theme.palette.primary.main,
      fontWeight: 600,
      textDecoration: "none",
    },
  };
});

export default PageNotFound;
