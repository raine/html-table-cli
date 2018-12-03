import React from 'react'
import { render } from 'react-dom'
import ReactTable from 'react-table'

import './styles.css'
import 'react-table/react-table.css'

const data = window.HTML_TABLE_DATA
const columns = Object.keys(data[0]).map((key) => ({
  Header: key,
  accessor: key
}))

const App = () => (
  <div>
    <ReactTable
      filterable={true}
      data={data}
      columns={columns}
      defaultPageSize={50}
    />
  </div>
)

render(<App />, document.getElementById('root'))
