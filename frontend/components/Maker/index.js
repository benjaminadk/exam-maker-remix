import { Query } from 'react-apollo'
import { examById } from '../../apollo/query/exam'
import CreateExam from './CreateExam'
import ExamMaker from './ExamMaker'
import Loading from '../Page/Loading'

export default class Maker extends React.Component {
  state = {
    loading: true,
    create: true
  }

  componentDidMount() {
    this.setMode()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query.id !== this.props.query.id) {
      this.setMode()
    }
  }

  setMode = () => this.setState({ loading: false, create: !Boolean(this.props.query.id) })

  render() {
    const {
      props: {
        query: { id }
      },
      state: { loading, create }
    } = this
    if (loading) {
      return <Loading size={50} />
    }
    if (create) {
      return <CreateExam />
    }
    return (
      <Query query={examById} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) return <Loading size={50} />
          if (error) return <div>{error.message}</div>
          return <ExamMaker exam={data.exam} />
        }}
      </Query>
    )
  }
}
