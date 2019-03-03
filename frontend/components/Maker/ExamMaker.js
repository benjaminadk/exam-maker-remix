import styled from 'styled-components'
import isequal from 'lodash.isequal'
import debounce from 'lodash.debounce'
import Router from 'next/router'
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
    description: '',
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
    const {
      id,
      published,
      title,
      description,
      code,
      pass,
      time,
      image,
      cover,
      test
    } = this.props.exam
    this.setState({ id, published, title, description, code, pass, time, image, cover, test })
  }

  setModeState = mode => this.setState({ mode })

  onChange = ({ target: { name, value } }, updateExam) => {
    this.setState({ [name]: value })
    this.onUpdateExam(updateExam)
  }

  onUpdateExam = debounce(async updateExam => {
    const { id, title, description, code, pass, time, image } = this.state
    const data = { title, description, code, pass: Number(pass), time: Number(time), image }
    await updateExam({
      variables: { id, data }
    })
  }, 5000)

  onDownloadExam = () => {
    const {
      props: {
        user: { name }
      },
      state: { id, title, code, time, pass, image, cover, test }
    } = this
    const exam = {
      id,
      author: name,
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

  onDeleteExam = async deleteExam => {
    const confirm = window.confirm('Are you sure you want to delete this exam?')
    if (confirm) {
      const { id } = this.state
      const res = await deleteExam({
        variables: { id }
      })
      if (res.data.deleteExam.success) {
        Router.push('/')
      }
    }
  }

  render() {
    const {
      state: { id, published, mode, title, description, code, time, pass, image, cover, test }
    } = this
    return (
      <ExamMakerStyles>
        <MainContent>
          {mode === -1 ? (
            <MainForm
              id={id}
              published={published}
              title={title}
              description={description}
              code={code}
              time={time}
              pass={pass}
              image={image}
              cover={cover}
              onChange={this.onChange}
              onDownloadExam={this.onDownloadExam}
              onDeleteExam={this.onDeleteExam}
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
