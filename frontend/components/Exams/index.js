import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import { examsByTerm } from '../../apollo/query/exams'

const ExamsStyles = styled.div``

class Exams extends React.Component {
  state = {
    loading: true,
    exams: [],
    term: ''
  }

  componentDidMount() {
    this.getExams()
  }

  getExams = async () => {
    const {
      props: { client },
      state: { term }
    } = this
    const res = await client.query({
      query: examsByTerm,
      variables: { term }
    })
    this.setState({ loading: false, exams: res.data })
  }

  render() {
    const {
      state: { loading, exams, term }
    } = this
    if (loading) {
      return <div>loading</div>
    }
    return <ExamsStyles>{JSON.stringify(exams)}</ExamsStyles>
  }
}

export default withApollo(Exams)
