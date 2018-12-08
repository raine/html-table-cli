import React from 'react'
import { render } from 'react-dom'
import ReactTable from 'react-table'
import { mapValues, memoize } from 'lodash'
import eskape from 'eskape'

import './reboot.css'
import 'react-table/react-table.css'
import './styles.scss'

const capitalize = (str) => str[0].toUpperCase() + str.slice(1)
const data = window.HTML_TABLE_DATA
const opts = window.HTML_TABLE_OPTS

opts.col = mapValues(opts.col, (colOpts) => ({
  ...colOpts,
  parse: colOpts.parse ? eval(colOpts.parse) : undefined
}))

console.log(`[debug] opts`, opts)
console.log(`[debug] data`, data)

const renderWithTemplateString = memoize(
  (str, bindings, props) => {
    let html
    try {
      html = new Function(
        'with(this) { return eskape`' + str.replace(/`/g, '\\`') + '`}'
      ).call({
        ...bindings,
        eskape
      })
    } catch (err) {
      console.error(`Error parsing ${str}\n`, err)
    }
    return { __html: html }
  },
  (str, bindings, props) =>
    // prettier-ignore
    (props.column && props.data) ? `${props.column.id}__header` :
    (props.column && props.row) ? `${props.column.id}__${props.index}` : null
)

const columnKeys = opts.cols || Object.keys(data[0])
const columns = columnKeys.map((key) => {
  const colOpts = opts.col[key]
  return {
    Header: (props) => {
      const bindings = { props, key, ...props.original }
      // console.log(`[debug] --col.${key}.header`, bindings)
      return colOpts && colOpts.header != null ? (
        <div
          dangerouslySetInnerHTML={renderWithTemplateString(
            colOpts.header,
            bindings,
            props
          )}
        />
      ) : (
        capitalize(key)
      )
    },
    accessor: key,
    maxWidth: colOpts && colOpts.width != null ? colOpts.width : undefined,
    Cell: (props) => {
      const bindings = { props, key, ...props.original }
      // console.log(`[debug] --col.${key}.cell`, bindings)
      return colOpts && colOpts.cell ? (
        <div
          dangerouslySetInnerHTML={renderWithTemplateString(
            colOpts.cell,
            bindings,
            props
          )}
        />
      ) : props.value && typeof props.value.toString === 'function' ? (
        props.value.toString()
      ) : (
        props.value
      )
    },
    filterable: (colOpts && colOpts.filterable) || false
  }
})

const Footer = ({ timestamp }) => (
  <div className="footer">Generated at {new Date(timestamp).toString()}</div>
)

const App = () => (
  <div class="html-table">
    <ReactTable
      data={data.map((row) =>
        mapValues(row, (v, k) =>
          opts.col[k] && opts.col[k].parse ? opts.col[k].parse(v) : v
        )
      )}
      columns={columns}
      defaultPageSize={opts.pagination ? 25 : data.length}
      showPagination={opts.pagination}
      className="-striped -highlight"
      defaultFilterMethod={(filter, row) => {
        const rowValue = row[filter.id]
        return typeof rowValue === 'string'
          ? rowValue.toLowerCase().includes(filter.value.toLowerCase())
          : false
      }}
    />
    {opts['generated-at'] && <Footer timestamp={opts.timestamp} />}
  </div>
)

render(<App />, document.getElementById('root'))
