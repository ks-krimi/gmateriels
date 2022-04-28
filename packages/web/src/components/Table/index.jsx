import React from 'react'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport
} from '@mui/x-data-grid'

function Table({ rows, columns, ...props }) {
  return (
    <DataGrid
      autoPageSize
      pagination
      density="compact"
      rows={rows}
      columns={columns}
      components={{
        Toolbar: CustomToolbar
      }}
      {...props}
    />
  )
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  )
}

export default Table
