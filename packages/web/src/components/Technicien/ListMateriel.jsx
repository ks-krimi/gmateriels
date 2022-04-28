import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider
} from '@material-ui/core'
import { useEffect } from 'react'
import RendreEnMarche from '../Materiel/RendreEnMarche'

function ListMateriel({ technicien = [], setIsOpen }) {
  useEffect(() => {
    if (technicien.maintenances.length <= 0) {
      setIsOpen(false)
    }
  }, [technicien, setIsOpen])

  return (
    <>
      <Typography variant="subtitle1">{`Les materiels maintener par ${technicien.nom}`}</Typography>
      <Divider />
      <List dense>
        {technicien?.maintenances.map((materiel, index) => (
          <ListItem key={materiel.serie} style={{ position: 'relative' }}>
            <RendreEnMarche
              materiel={materiel}
              style={{ position: 'absolute', right: 0 }}
            />
            <ListItemText
              primary={materiel.serie}
              secondary={`${materiel.detail.type}`}
            />
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default ListMateriel
