import { useState } from 'react'
import { MenuItem, IconButton, Menu } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import { useMutation } from '@apollo/client'
import { DELETE_DETAIL } from '../../GraphQL/Mutations'
import { LOAD_DETAILS } from '../../GraphQL/Queries'
import Dialog from '../Dialog'
import Form from './Form'
import ListMateriel from './ListMateriel'

function PopOver({ detail }) {
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

  const [deleteDetail, { loading, error }] = useMutation(DELETE_DETAIL)

  if (error) return <p>Error occured</p>

  const handleDelete = () => {
    deleteDetail({
      variables: {
        id: detail.id
      },
      refetchQueries: [{ query: LOAD_DETAILS }]
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
        <MenuItem disabled={detail.materiels[0]} onClick={handleDelete}>
          {loading ? 'loading...' : 'Supprimer'}
        </MenuItem>
        <MenuItem
          disabled={!detail.materiels[0]}
          onClick={OpenDialogListeMateriel}
        >
          Voir les materiels
        </MenuItem>
      </Menu>

      {/* dialog pour le modification de type de materiel */}
      <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form
          initialFormState={{
            id: detail.id,
            type: detail.type,
            marque: detail.marque
          }}
          setIsOpen={setIsOpen}
        />
      </Dialog>

      {/* dialog pour les listes des materiels dans un type de materiel */}
      <Dialog isOpen={isOpenListMateriel} setIsOpen={setIsOpenListMateriel}>
        <ListMateriel detail={detail} setIsOpen={setIsOpenListMateriel} />
      </Dialog>
    </div>
  )
}

export default PopOver
