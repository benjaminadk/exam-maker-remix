import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import { examsByTerm } from '../../apollo/query/exams'
import { BannerTop, BannerTitle } from '../Shared/Banner'
import SearchInput from './SearchInput'

const ExamsStyles = styled.div``

const MainContent = styled.div`
  width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  background: ${props => props.theme.white};
`

const ExamCard = styled.div`
  img {
    width: 5rem;
    height: 5rem;
  }
`

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
    const { exams, count } = res.data.exams
    this.setState({ loading: false, exams, count })
  }

  render() {
    const {
      state: { loading, exams, term }
    } = this
    if (loading) {
      return <div>loading</div>
    }
    return (
      <ExamsStyles>
        <BannerTop>
          <BannerTitle>Exams</BannerTitle>
        </BannerTop>
        <MainContent>
          <SearchInput />
          <div>
            {exams.map((e, i) => (
              <ExamCard key={e.id}>
                <div>{e.title}</div>
                <img src={e.image || e.user.image} />
              </ExamCard>
            ))}
          </div>
        </MainContent>
      </ExamsStyles>
    )
  }
}

export default withApollo(Exams)
