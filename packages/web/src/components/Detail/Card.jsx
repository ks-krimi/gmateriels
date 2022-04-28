import { CardContent, Card as MCard, Typography } from "@material-ui/core";
import PopOver from "./PopOver";

function Card({ detail }) {
  return (
    <MCard variant="outlined" style={{ position: "relative", minWidth: 250 }}>
      <CardContent>
        <Typography variant="subtitle1">{detail.type}</Typography>
        <Typography variant="subtitle2" component="p">
          {detail.marque}
        </Typography>
        <Typography variant="caption" component="p">
          Nombre de materiel: {detail.materiels?.length}
        </Typography>
      </CardContent>
      <PopOver detail={detail} />
    </MCard>
  );
}

export default Card;
