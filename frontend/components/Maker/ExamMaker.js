import styled from 'styled-components'
import isequal from 'lodash.isequal'
import debounce from 'lodash.debounce'
import Editor from './Editor'
import Controls from './Controls'

const ExamMakerStyles = styled.div`
  height: calc(100vh - 6rem);
  background: ${props => props.theme.grey[1]};
`

const MainContent = styled.div`
  width: ${props => props.theme.maxWidth};
  height: calc(100vh - 6rem);
  margin: 0 auto;
  background: ${props => props.theme.white};
`

export default class ExamMaker extends React.Component {
  state = {
    mode: -1,
    id: '',
    title: '',
    code: '',
    pass: '',
    time: '',
    image: '',
    cover: [],
    test: []
  }

  componentDidMount() {
    this.setExamState()
  }

  componentDidUpdate(prevProps) {
    if (!isequal(prevProps.exam, this.props.exam)) {
      this.setExamState()
    }
  }

  setExamState = () => {
    const { id, title, code, pass, time, image, cover, test } = this.props.exam
    this.setState({ id, title, code, pass, time, image, cover, test })
  }

  setModeState = mode => this.setState({ mode })

  onChange = ({ target: { name, value } }, updateExam) => {
    this.setState({ [name]: value })
    this.onUpdateExam(updateExam)
  }

  onCreateQuestion = async createQuestion => {
    await createQuestion()
  }

  onUpdateExam = debounce(async updateExam => {
    const { id, title, code, pass, time, image } = this.state
    const data = { title, code, pass: Number(pass), time: Number(time), image }
    await updateExam({
      variables: { id, data }
    })
  }, 5000)

  render() {
    const {
      state: { id, mode, title, code, time, pass, image, cover, test }
    } = this
    return (
      <ExamMakerStyles>
        <MainContent>
          <Editor
            mode={mode}
            id={id}
            title={title}
            code={code}
            time={time}
            pass={pass}
            image={image}
            cover={cover}
            test={test}
            onChange={this.onChange}
          />
          <Controls
            mode={mode}
            id={id}
            test={test}
            setModeState={this.setModeState}
            onCreateQuestion={this.onCreateQuestion}
          />
        </MainContent>
      </ExamMakerStyles>
    )
  }
}
