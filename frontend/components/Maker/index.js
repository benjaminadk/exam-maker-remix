import { Query } from 'react-apollo'
import { examById } from '../../apollo/query/exam'
import CreateExam from './CreateExam'
import ExamMaker from './ExamMaker'

export default class Maker extends React.Component {
  state = {
    create: false
  }

  componentDidMount() {
    this.setMode()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query.id !== this.props.query.id) {
      this.setMode()
    }
  }

  setMode = () => this.setState({ create: !Boolean(this.props.query.id) })

  render() {
    const {
      props: {
        query: { id }
      },
      state: { create }
    } = this
    if (create) {
      return <CreateExam />
    }
    return (
      <Query query={examById} variables={{ id }}>
        {({ data: { exam }, loading }) => {
          if (loading) return <div>loading</div>
          return <ExamMaker exam={exam} />
        }}
      </Query>
    )
  }
}
