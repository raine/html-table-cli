import React from 'react'
import { render } from 'react-dom'
import ReactTable from 'react-table'
import JsxParser from 'react-jsx-parser'
import { mapValues } from 'lodash'

import './reboot.css'
import 'react-table/react-table.css'
import './styles.scss'

const capitalize = (str) => str[0].toUpperCase() + str.slice(1)
const jsx = (bindings, str) => (
  <JsxParser bindings={bindings} jsx={str} renderInWrapper={false} />
)

const data = window.HTML_TABLE_DATA
const opts = window.HTML_TABLE_OPTS

opts.col = mapValues(opts.col, (colOpts) => ({
  ...colOpts,
  parse: colOpts.parse ? eval(colOpts.parse) : undefined
}))

console.log(`[debug] opts`, opts)
console.log(`[debug] data`, data)

const columnKeys = opts.cols || Object.keys(data[0])
const columns = columnKeys.map((key) => ({
  Header: (row) =>
    console.log(`[debug] --col.${key}.header`, { row, key }) ||
    (opts.col[key] && opts.col[key].header)
      ? jsx({ row, key }, opts.col[key].header)
      : capitalize(key),
  accessor: key,
  maxWidth:
    opts.col[key] && opts.col[key].width != null
      ? opts.col[key].width
      : undefined,
  Cell: (row) =>
    console.log(`[debug] --col.${key}.header`, { row, key }) ||
    (opts.col[key] && opts.col[key].cell)
      ? jsx({ row, key }, opts.col[key].cell)
      : row.value && typeof row.value.toString === 'function'
      ? row.value.toString()
      : row.value
}))

const Footer = ({ timestamp }) => (
  <div className="footer">Generated at {new Date(timestamp).toString()}</div>
)

const App = () => (
  <div class="html-table">
    <ReactTable
      filterable
      data={data.map((row) =>
        mapValues(row, (v, k) =>
          opts.col[k] && opts.col[k].parse ? opts.col[k].parse(v) : v
        )
      )}
      columns={columns}
      defaultPageSize={opts.pagination ? 50 : data.length}
      showPagination={opts.pagination}
      className="-striped -highlight"
      defaultFilterMethod={(filter, row) => {
        const rowValue = row[filter.id]
        return typeof rowValue === 'string'
          ? rowValue.toLowerCase().includes(filter.value.toLowerCase())
          : false
      }}
    />
    {opts.generated && <Footer timestamp={opts.timestamp} />}
  </div>
)

render(<App />, document.getElementById('root'))
