import { SchemaTableStyles } from './styles/SchemaTable'
import data from './data/table-data'

export default () => (
  <SchemaTableStyles>
    <table>
      <thead>
        <tr>
          <th>Property</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => (
          <tr key={i}>
            <td>{d[0]}</td>
            <td>{d[1]}</td>
            <td>{d[2]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </SchemaTableStyles>
)
