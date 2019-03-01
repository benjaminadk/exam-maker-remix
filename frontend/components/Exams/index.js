import styled from 'styled-components'
import { withApollo } from 'react-apollo'
import { FileDownload } from 'styled-icons/material/FileDownload'
import { examsByTerm } from '../../apollo/query/exams'
import { BannerTop, BannerTitle } from '../Shared/Banner'
import SearchInput from './SearchInput'
import formatAgo from '../../lib/formatAgo'

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

const ExamCard = styled.div`
  width: 45rem;
  display: grid;
  grid-template-columns: 5rem 1fr 3rem;
  grid-gap: 2rem;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${props => props.theme.grey[2]};
  border-radius: ${props => props.theme.borderRadius};
  cursor: pointer;
  .image {
    width: 5rem;
    height: 5rem;
  }
  .main {
    .title {
      font: 1.75rem 'Open Sans Bold';
      color: ${props => props.theme.grey[12]};
    }
    .description {
      font: 1.1rem 'Open Sans';
      text-align: justify;
      margin-bottom: 0.25rem;
    }
    .meta {
      display: flex;
      align-items: center;
      .date {
        font: 1rem 'Open Sans Semi';
        color: ${props => props.theme.grey[5]};
      }
      .name {
        font: 1rem 'Open Sans Semi';
        color: ${props => props.theme.grey[5]};
        margin-right: 0.5rem;
      }
      .avatar {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }
    }
  }
  .actions {
    svg {
      color: ${props => props.theme.grey[10]};
      &:hover {
        color: ${props => props.theme.black};
      }
    }
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
      return <div>loading</div>
    }
    return (
      <ExamsStyles>
        <BannerTop>
          <BannerTitle>Exams</BannerTitle>
        </BannerTop>
        <MainContent>
          <SearchInput />
          <div className="exams">
            {exams.map((e, i) => (
              <ExamCard key={e.id}>
                <img className="image" src={e.image || e.user.image} />
                <div className="main">
                  <div className="title">{e.title}</div>
                  <div className="description">{e.description}</div>
                  <div className="meta">
                    <span className="date">
                      Created {formatAgo(e.createdAt)} ago &nbsp;&bull;&nbsp;
                    </span>
                    <span className="name">{e.user.name}</span>
                    <img className="avatar" src={e.user.image} />
                  </div>
                </div>
                <div className="actions">
                  <FileDownload size={25} />
                </div>
              </ExamCard>
            ))}
          </div>
        </MainContent>
      </ExamsStyles>
    )
  }
}

export default withApollo(Exams)
