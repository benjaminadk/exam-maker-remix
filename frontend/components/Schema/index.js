import {
  SchemaStyles,
  MainContent,
  InfoBlock,
  CardJSON,
  InfoTable,
  SchemaBlock,
  SchemaPre
} from './styles'
import { BannerTop, BannerTitle } from '../Shared/Banner'
import schema from './schema'
import data from './table-data'

export default class Schema extends React.Component {
  render() {
    return (
      <SchemaStyles>
        <BannerTop>
          <BannerTitle>Schema</BannerTitle>
        </BannerTop>
        <MainContent>
          <div>
            <InfoBlock>
              <CardJSON>
                <div className="heading">What is JSON?</div>
                <div className="content">
                  JavaScript Object Notation is a lightweight data exchange format. It is easy for
                  humans and machines to read and write. It is based on key/value pairs, or{' '}
                  <em>objects</em>, and lists of values, or <em>arrays</em>. JSON is based on a
                  subset of JavaScript but is supported by almost all modern programming languages.
                </div>
              </CardJSON>
              <CardJSON>
                <div className="heading">Why use JSON?</div>
                <div className="content">
                  Community members are able to create exam files as raw JSON or use tools like Exam
                  Maker. The JSON can then be validated with open source tools like{' '}
                  <a href="http://json-schema.org/">JSON Schema</a>. From a programming perspective,
                  developers for many languages can come together and contribute.
                </div>
              </CardJSON>
            </InfoBlock>
            <InfoTable>
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
            </InfoTable>
          </div>
          <SchemaBlock>
            <div className="block-top">
              <div>exam.json</div>
              <div>version 0.0.0</div>
            </div>
            <SchemaPre>{schema}</SchemaPre>
          </SchemaBlock>
        </MainContent>
      </SchemaStyles>
    )
  }
}
