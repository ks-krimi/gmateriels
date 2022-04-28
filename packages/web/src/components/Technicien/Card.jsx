import { CardContent, Card as MCard, Typography } from '@material-ui/core'
import PopOver from './PopOver'

function Card({ technicien }) {
  return (
    <MCard variant="outlined" style={{ position: 'relative', minWidth: 250 }}>
      <CardContent>
        <Typography variant="subtitle1">{technicien.nom}</Typography>
        <Typography variant="subtitle2" component="p">
          {technicien.prenom}
        </Typography>
        <Typography color="secondary" variant="subtitle2" component="p">
          {technicien.contact}
        </Typography>
        <Typography variant="caption" component="p">
          Nombre de materiel reparer: {technicien.maintenances?.length}
        </Typography>
      </CardContent>
      <PopOver technicien={technicien} />
    </MCard>
  )
}

export default Card
