import { useState } from 'react'
import { MenuItem, IconButton, Menu } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import { useMutation } from '@apollo/client'
import { DELETE_TECHNICIEN } from '../../GraphQL/Mutations'
import { LOAD_TECHNICIENS } from '../../GraphQL/Queries'
import Dialog from '../Dialog'
import Form from './Form'
import ListMateriel from './ListMateriel'

function PopOver({ technicien }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenListMateriel, setIsOpenListMateriel] = useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const [deleteTechnicien, { loading, error }] = useMutation(
    DELETE_TECHNICIEN,
    {
      update(cache, { data }) {
        const deleteTechnicien = data?.deleteTechnicien
        const existingTechniciens = cache.readQuery({ query: LOAD_TECHNICIENS })
        cache.writeQuery({
          query: LOAD_TECHNICIENS,
          data: {
            techniciens: existingTechniciens?.techniciens.filter(
              (maintenances) => maintenances.id !== deleteTechnicien
            )
          }
        })
      }
    }
  )

  if (error) return <p>Error occured</p>

  const handleDelete = () => {
    deleteTechnicien({
      variables: {
        id: technicien.id
      }
    })
  }

  const OpenDialog = () => {
    setIsOpen(true)
    handleClose()
  }

  const OpenDialogListeMateriel = () => {
    setIsOpenListMateriel(true)
    handleClose()
  }

  return (
    <div style={{ position: 'absolute', top: 4, right: 4 }}>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem onClick={OpenDialog}>Modifier</MenuItem>
        <MenuItem disabled={technicien.maintenances[0]} onClick={handleDelete}>
          {loading ? 'loading...' : 'Supprimer'}
        </MenuItem>
        <MenuItem
          disabled={!technicien.maintenances[0]}
          onClick={OpenDialogListeMateriel}
        >
          Voir les materiels
        </MenuItem>
      </Menu>

      {/* dialog pour le modification d'un technicien */}
      <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form
          initialFormState={{
            id: technicien.id,
            nom: technicien.nom,
            contact: technicien.contact,
            prenom: technicien.prenom
          }}
          setIsOpen={setIsOpen}
        />
      </Dialog>

      {/* dialog pour les listes des materiel maintener par un technicien */}
      <Dialog isOpen={isOpenListMateriel} setIsOpen={setIsOpenListMateriel}>
        <ListMateriel
          technicien={technicien}
          setIsOpen={setIsOpenListMateriel}
        />
      </Dialog>
    </div>
  )
}

export default PopOver
