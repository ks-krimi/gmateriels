import { CardContent, Card as MCard, Typography } from "@material-ui/core";
import PopOver from "./PopOver";

function Card({ user }) {
  return (
    <MCard variant="outlined" style={{ position: "relative", minWidth: 250 }}>
      <CardContent>
        <Typography variant="subtitle1">{user.nom}</Typography>
        <Typography variant="subtitle2" component="p">
          {user.prenom}
        </Typography>
        <Typography color="secondary" variant="subtitle2" component="p">
          {user.fonction}
        </Typography>
        <Typography variant="caption" component="p">
          Nombre de materiel utiliser: {user.materiels?.length}
        </Typography>
        {user.level === 1 && (
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              margin: 4,
              color: "rgba(255,0,0,0.7)",
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            Admin
          </span>
        )}
      </CardContent>
      <PopOver user={user} />
    </MCard>
  );
}

export default Card;
