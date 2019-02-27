import styled from 'styled-components'
import { BannerTop, BannerTitle } from '../Shared/Banner'
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
    const { id, title, code, pass, time, image, cover, test } = this.props.exam
    this.setState({ id, title, code, pass, time, image, cover, test })
  }

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
        <BannerTop>
          <BannerTitle>Exam Editor</BannerTitle>
        </BannerTop>
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
          <Controls mode={mode} id={id} test={test} onCreateQuestion={this.onCreateQuestion} />
        </MainContent>
      </ExamMakerStyles>
    )
  }
}
