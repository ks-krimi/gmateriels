import { useState } from 'react'
import {
  Drawer as MDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider
} from '@material-ui/core'
import {
  Computer,
  Group,
  List as ListIcon,
  HowToReg,
  ExpandLess,
  ExpandMore,
  MoreHoriz
} from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

function Drawer({ open, setOpen }) {
  const history = useHistory()

  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <MDrawer anchor="left" open={open} onClose={() => setOpen(false)}>
      <div style={{ width: 250 }}>
        <List>
          {[
            { name: 'Materiels', path: '/' },
            { name: 'Type de materiel', path: 'detail' },
            { name: 'Utilisateurs', path: 'user' },
            { name: 'Techniciens', path: 'technicien' }
          ].map((array, index) => (
            <ListItem
              button
              key={array.name}
              onClick={() => {
                history.push(array.path)
                setOpen(false)
              }}
            >
              <ListItemIcon>
                {index === 0 && <Computer />}
                {index === 1 && <ListIcon />}
                {index === 2 && <Group />}
                {index === 3 && <HowToReg />}
              </ListItemIcon>
              <ListItemText primary={array.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <MoreHoriz />
            </ListItemIcon>
            <ListItemText primary="Plus" />
            {isOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {[
                { name: 'Listes des materiels', path: 'listmateriel' },
                { name: 'Listes des utilisateurs', path: 'listuser' },
                { name: 'Listes des techniciens', path: 'listtechnicien' }
              ].map((array, index) => (
                <ListItem
                  button
                  key={array.name}
                  onClick={() => {
                    history.push(array.path)
                    setOpen(false)
                  }}
                >
                  <ListItemIcon>
                    {index === 0 && <Computer />}
                    {/* {index === 1 && <ListIcon />} */}
                    {index === 1 && <Group />}
                    {index === 2 && <HowToReg />}
                  </ListItemIcon>
                  <ListItemText primary={array.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
      </div>
    </MDrawer>
  )
}

export default Drawer
