import { useQuery } from '@apollo/client'
import { LOAD_TECHNICIENS } from '../../GraphQL/Queries'
import Add from '../../components/Technicien/Add'
import TechnicienList from '../../components/Technicien/TechnicienList'
import useTitle from '../../hooks/useTitle'
import Layout from '../../components/Layout'
import Backdrop from '../../components/Backdrop'

function Technicien() {
  useTitle('Techniciens')
  const { error, loading, data } = useQuery(LOAD_TECHNICIENS)

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
            <TechnicienList techniciens={data.techniciens} />
          )}
          <Add />
        </div>
      </div>
    </Layout>
  )
}

export default Technicien
