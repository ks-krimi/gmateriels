import { IconButton, Tooltip } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import axios from '../../http-common'
import Cookies from 'js-cookie'
import { IS_LOGGED_IN } from '../../utils/auth'

const removeCookie = (key) => {
  if (window !== 'undefined') {
    Cookies.remove(key, { expires: 1 })
  }
}

function Logout() {
  const logout = async () => {
    await axios({
      method: 'GET',
      url: `api/user/logout`,
      withCredentials: true,
      validateStatus: (status) => {
        return status >= 200 && status < 500
      }
    })
      .then(() => {
        removeCookie('jwt')
        localStorage.removeItem(IS_LOGGED_IN)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        window.location = '/'
      })
  }

  return (
    <Tooltip title="Se déconnecter">
      <IconButton onClick={logout} aria-label="Se déconnecter">
        <ExitToApp style={{ color: 'white' }} />
      </IconButton>
    </Tooltip>
  )
}

export default Logout
