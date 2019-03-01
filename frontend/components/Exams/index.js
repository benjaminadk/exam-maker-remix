import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import { examsByTerm } from '../../apollo/query/exams'
import { BannerTop, BannerTitle } from '../Shared/Banner'
import ExamCard from './ExamCard'
import SearchInput from './SearchInput'
import Loading from '../Shared/Loading'

const ExamsStyles = styled.div``

const MainContent = styled.div`
  width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  background: ${props => props.theme.white};
  .exams {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

class Exams extends React.Component {
  state = {
    loading: true,
    exams: [],
    term: '',
    first: 10,
    skip: 0
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
    const { exams, count } = res.data.exams
    this.setState({ loading: false, exams, count })
  }

  render() {
    const {
      state: { loading, exams, count, term, skip, first }
    } = this
    if (loading) {
      return <Loading size={50} />
    }
    const page = skip / first + 1
    const totalPages = Math.ceil(count / first)
    return (
      <ExamsStyles>
        <BannerTop>
          <BannerTitle>Exams</BannerTitle>
        </BannerTop>
        <MainContent>
          <SearchInput />
          <div className="pagination">
            <div>prev</div>
            <div>
              page {page} of {totalPages}
            </div>
            <div>Results</div>
            <div>{count} total exams</div>
            <div>next</div>
          </div>
          <div className="exams">
            {exams.map((e, i) => (
              <ExamCard key={e.id} exam={e} />
            ))}
          </div>
        </MainContent>
      </ExamsStyles>
    )
  }
}

export default withApollo(Exams)
