import { useState } from 'react'
import { MenuItem, IconButton, Menu } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import { useMutation } from '@apollo/client'
import { DELETE_USER } from '../../GraphQL/Mutations'
import { LOAD_USERS } from '../../GraphQL/Queries'
import Dialog from '../Dialog'
import Form from './Form'
import ListMateriel from './ListMateriel'

function PopOver({ user }) {
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

  const [deleteUser, { loading, error }] = useMutation(DELETE_USER, {
    update(cache, { data }) {
      const deletedUser = data?.deleteUser
      const existingUsers = cache.readQuery({ query: LOAD_USERS })
      cache.writeQuery({
        query: LOAD_USERS,
        data: {
          users: existingUsers?.users.filter(
            (materiel) => materiel.id !== deletedUser
          )
        }
      })
    }
  })

  if (error) return <p>Error occured</p>

  const handleDelete = () => {
    deleteUser({
      variables: {
        userId: user.id
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
        <MenuItem
          disabled={user.materiels[0] || user.level === 1}
          onClick={handleDelete}
        >
          {loading ? 'loading...' : 'Supprimer'}
        </MenuItem>
        <MenuItem
          disabled={!user.materiels[0]}
          onClick={OpenDialogListeMateriel}
        >
          Voir les materiels
        </MenuItem>
      </Menu>

      {/* dialog pour le modification d'un utilisateur */}
      <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form
          initialFormState={{
            id: user.id,
            nom: user.nom,
            fonction: user.fonction,
            prenom: user.prenom
          }}
          setIsOpen={setIsOpen}
        />
      </Dialog>

      {/* dialog pour les listes des materiel utiliser par un utilisateur */}
      <Dialog isOpen={isOpenListMateriel} setIsOpen={setIsOpenListMateriel}>
        <ListMateriel user={user} setIsOpen={setIsOpenListMateriel} />
      </Dialog>
    </div>
  )
}

export default PopOver
