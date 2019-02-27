import styled from 'styled-components'
import isequal from 'lodash.isequal'
import Editor from './Editor'
import Controls from './Controls'

const ExamMakerStyles = styled.div``

const MainContent = styled.div`
  width: ${props => props.theme.maxWidth};
  margin: 3rem auto;
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

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  onCreateQuestion = async createQuestion => {
    await createQuestion()
  }

  render() {
    const {
      state: { id, mode, title, code, time, pass, image, cover, test }
    } = this
    return (
      <ExamMakerStyles>
        <MainContent>
          <Editor
            mode={mode}
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
