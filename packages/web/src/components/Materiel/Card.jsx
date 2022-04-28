import {
  CardActions,
  CardContent,
  Card as MCard,
  Typography
} from '@material-ui/core'
import Delete from './Delete'
import RendreLibre from './RendreLibre'
import RendreOccuper from './RendreOccuper'
import RendreEnMarche from './RendreEnMarche'
import RendreEnPanne from './RendreEnPanne'

function Card({ materiel }) {
  return (
    <MCard variant="outlined" style={{ position: 'relative', minWidth: 250 }}>
      <CardContent>
        <Typography variant="h6">{materiel.serie}</Typography>
        <Typography variant="caption" component="p">
          Type: {materiel.detail.type}
        </Typography>
        <Typography variant="caption" component="p">
          Marque: {materiel.detail.marque}
        </Typography>
        {materiel.user && (
          <Typography variant="caption" component="p">
            User: {materiel.user.nom} {materiel.user.prenom}
          </Typography>
        )}
        {materiel.technicien && (
          <Typography variant="caption" component="p">
            Technicien: {materiel.technicien.nom} {materiel.technicien.prenom}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {materiel.user ? (
          <RendreLibre id={materiel.id} />
        ) : (
          <>
            {materiel.status !== 'EN_PANNE' && (
              <>
                <RendreOccuper materiel={materiel} />
              </>
            )}

            {materiel.technicien === null ? (
              <RendreEnPanne materiel={materiel} />
            ) : (
              <RendreEnMarche materiel={materiel} />
            )}
          </>
        )}
        {materiel.user ? null : <Delete id={materiel.id} />}
      </CardActions>
    </MCard>
  )
}

export default Card
