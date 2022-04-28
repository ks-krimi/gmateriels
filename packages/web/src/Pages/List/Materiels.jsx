import React from 'react'
import { useQuery } from '@apollo/client'
import { LOAD_MATERIELS } from '../../GraphQL/Queries'
import useTitle from '../../hooks/useTitle'
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import Backdrop from '../../components/Backdrop'

function Materiels() {
  useTitle('Listes des materiels')
  const { error, loading, data } = useQuery(LOAD_MATERIELS)

  const rows = data?.materiels.map((materiel) => ({
    id: materiel.id,
    serie: materiel.serie,
    type: materiel.detail ? materiel.detail.type : null,
    marque: materiel.detail ? materiel.detail.marque : null,
    status: materiel.status,
    user: materiel.user
      ? `${materiel.user?.nom} ${materiel.user?.prenom}`
      : null,
    technicien: materiel.technicien
      ? `${materiel.technicien?.nom} ${materiel.technicien?.prenom}`
      : null
  }))

  const columns = [
    { field: 'serie', headerName: 'Serie', width: 150 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'marque', headerName: 'Marque', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'user', headerName: 'Utitisateur', width: 250 },
    { field: 'technicien', headerName: 'Technicien', width: 250 }
  ]

  if (loading) return <Backdrop loading={loading} />

  if (error) return <p>An error occured</p>

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
          <div style={{ height: 350, width: '100%' }}>
            <Table columns={columns} rows={rows} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Materiels
