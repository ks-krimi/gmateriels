import Login from './Login'
import Register from './Register'

export default function Authentification({ isLoggin, setIsLoggin }) {
  return (
    <>
      {isLoggin ? (
        <Login setIsLoggin={setIsLoggin} />
      ) : (
        <Register setIsLoggin={setIsLoggin} />
      )}
    </>
  )
}
