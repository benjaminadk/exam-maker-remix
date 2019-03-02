import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import debounce from 'lodash.debounce'
import { examsByTerm } from '../../apollo/query/exams'
import { BannerTop, BannerTitle } from '../Shared/Banner'
import ExamCard from './ExamCard'
import Pagination from './Pagination'
import SearchInput from './SearchInput'
import Loading from './Loading'
import downloadExam from '../../lib/downloadExam'

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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.skip !== this.state.skip) {
      this.getExams()
    }
  }

  getExams = async () => {
    await this.setState({ loading: true })
    const {
      props: { client },
      state: { term, skip, first }
    } = this
    const res = await client.query({
      query: examsByTerm,
      variables: { term, skip, first }
    })
    const { exams, count } = res.data.exams
    this.setState({ loading: false, exams, count })
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
    this.onTermChange()
  }

  onTermChange = debounce(async () => {
    await this.getExams()
  }, 5000)

  onKeyDown = ({ keyCode }) => {
    if (keyCode === 13) {
      this.getExams()
    }
  }

  onPaginate = next => {
    const { count, skip, first } = this.state
    const page = skip / first + 1
    const totalPages = Math.ceil(count / first)
    if (next && page < totalPages) {
      this.setState({ skip: skip + first })
    } else if (!next && skip > 0) {
      this.setState({ skip: skip - first })
    }
  }

  onDownloadExam = i => {
    const { exams } = this.state
    const exam = {
      id: exams[i].id,
      author: exams[i].user.name,
      title: exams[i].title,
      code: exams[i].code,
      pass: Number(exams[i].pass),
      time: Number(exams[i].time),
      image: exams[i].image,
      cover: exams[i].cover,
      test: exams[i].test
    }
    downloadExam(exam)
  }

  render() {
    const {
      state: { loading, exams, count, term, skip, first }
    } = this
    return (
      <ExamsStyles>
        <BannerTop>
          <BannerTitle>Exams</BannerTitle>
        </BannerTop>
        <MainContent>
          <SearchInput term={term} onChange={this.onChange} onKeyDown={this.onKeyDown} />
          {loading ? (
            <Loading size={50} />
          ) : (
            <React.Fragment>
              <Pagination count={count} skip={skip} first={first} onPaginate={this.onPaginate} />
              <div className="exams">
                {exams.map((e, i) => (
                  <ExamCard key={e.id} exam={e} onDownloadExam={() => this.onDownloadExam(i)} />
                ))}
              </div>
              <Pagination count={count} skip={skip} first={first} onPaginate={this.onPaginate} />
            </React.Fragment>
          )}
        </MainContent>
      </ExamsStyles>
    )
  }
}

export default withApollo(Exams)
