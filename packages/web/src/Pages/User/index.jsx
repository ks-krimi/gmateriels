import { useQuery } from '@apollo/client'
import { LOAD_USERS } from '../../GraphQL/Queries'
import Add from '../../components/User/Add'
import UserList from '../../components/User/UserList'
import useTitle from '../../hooks/useTitle'
import Layout from '../../components/Layout'
import Backdrop from '../../components/Backdrop'

function User() {
  useTitle('Utilisateurs')
  const { error, loading, data } = useQuery(LOAD_USERS)

  return (
    <Layout>
      <div
        style={{
          paddingTop: 24,
          position: 'relative',
          height: 'inherit'
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 8,
            padding: '24px 0',
            flexWrap: 'wrap'
          }}
        >
          {loading ? (
            <Backdrop loading={loading} />
          ) : error ? (
            <p>An error occured</p>
          ) : (
            <UserList users={data.users} />
          )}
          <Add />
        </div>
      </div>
    </Layout>
  )
}

export default User
