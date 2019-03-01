import styled from 'styled-components'
import isequal from 'lodash.isequal'
import debounce from 'lodash.debounce'
import MainForm from './MainForm'
import QuestionForm from './QuestionForm'
import Controls from './Controls'
import downloadExam from '../../lib/downloadExam'

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
    published: false,
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
    const { id, published, title, code, pass, time, image, cover, test } = this.props.exam
    this.setState({ id, published, title, code, pass, time, image, cover, test })
  }

  setModeState = mode => this.setState({ mode })

  onChange = ({ target: { name, value } }, updateExam) => {
    this.setState({ [name]: value })
    this.onUpdateExam(updateExam)
  }

  onUpdateExam = debounce(async updateExam => {
    const { id, title, code, pass, time, image } = this.state
    const data = { title, code, pass: Number(pass), time: Number(time), image }
    await updateExam({
      variables: { id, data }
    })
  }, 5000)

  onDownloadExam = () => {
    const {
      props: {
        user: { name }
      },
      state: { id, published, title, code, time, pass, image, cover, test }
    } = this
    const exam = {
      id,
      author: name,
      published,
      title,
      code,
      time: Number(time),
      pass: Number(pass),
      image,
      cover,
      test
    }
    downloadExam(exam)
  }

  render() {
    const {
      state: { id, published, mode, title, code, time, pass, image, cover, test }
    } = this
    return (
      <ExamMakerStyles>
        <MainContent>
          {mode === -1 ? (
            <MainForm
              id={id}
              published={published}
              title={title}
              code={code}
              time={time}
              pass={pass}
              image={image}
              cover={cover}
              onChange={this.onChange}
              onDownloadExam={this.onDownloadExam}
            />
          ) : (
            <QuestionForm id={id} question={test[mode]} />
          )}
          <Controls mode={mode} id={id} test={test} setModeState={this.setModeState} />
        </MainContent>
      </ExamMakerStyles>
    )
  }
}
