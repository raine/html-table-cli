import React from 'react'
import { render } from 'react-dom'
import ReactTable from 'react-table'
import JsxParser from 'react-jsx-parser'

import './styles.css'
import 'react-table/react-table.css'

const capitalize = (str) => str[0].toUpperCase() + str.slice(1)
const jsx = (bindings, str) => (
  <JsxParser bindings={bindings} jsx={str} renderInWrapper={false} />
)

const data = window.HTML_TABLE_DATA
const opts = window.HTML_TABLE_OPTS
const columnKeys = opts.cols || Object.keys(data[0])
const columns = columnKeys.map((key) => ({
  Header: (row) =>
    opts.col[key] && opts.col[key].header
      ? jsx({ row, key }, opts.col[key].header)
      : capitalize(key),
  accessor: key,
  Cell: (row) =>
    opts.col[key] && opts.col[key].cell
      ? jsx({ row, key }, opts.col[key].cell)
      : row.value
}))

const App = () => (
  <div>
    <ReactTable
      filterable
      data={data}
      columns={columns}
      defaultPageSize={50}
      className="-striped -highlight"
      defaultFilterMethod={(filter, row) =>
        row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
      }
    />
  </div>
)

render(<App />, document.getElementById('root'))
