import axios from 'axios'

export const IS_LOGGED_IN = 'isLoggedIn'

export const isLoggedIn = () => IS_LOGGED_IN in localStorage

export const getToken = async () => {
  await axios({
    method: 'GET',
    url: `${process.env.REACT_APP_API_URL}jwtid`,
    withCredentials: true
  })
    .then((res) => {
      localStorage.setItem(IS_LOGGED_IN, res.data)
    })
    .catch((err) => {
      localStorage.removeItem(IS_LOGGED_IN)
    })
}
