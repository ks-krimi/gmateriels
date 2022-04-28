import { useState } from 'react'
import Authentification from '../../components/Auth'
import useTitle from '../../hooks/useTitle'

function Auth() {
  useTitle('Application gestion des materiels')
  const [isLoggin, setIsLoggin] = useState(true)
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: '100vh'
      }}
    >
      <Authentification isLoggin={isLoggin} setIsLoggin={setIsLoggin} />

      <span
        style={{
          position: 'absolute',
          bottom: '1em'
        }}
      >
        Copyright © Fanomezantsoa Herifiandry Marc Nico
      </span>
    </div>
  )
}

export default Auth
