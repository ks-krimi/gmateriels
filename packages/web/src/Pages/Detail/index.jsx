import { useQuery } from '@apollo/client'
import React from 'react'
import Add from '../../components/Detail/Add'
import ListDetail from '../../components/Detail/ListDetail'
import { LOAD_DETAILS } from '../../GraphQL/Queries'
import useTitle from '../../hooks/useTitle'
import Layout from '../../components/Layout'
import Backdrop from '../../components/Backdrop'

function Detail() {
  useTitle('Type de materiel')
  const { error, loading, data } = useQuery(LOAD_DETAILS)

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
            <ListDetail details={data.details} />
          )}
          <Add />
        </div>
      </div>
    </Layout>
  )
}

export default Detail
