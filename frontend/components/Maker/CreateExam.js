import styled from 'styled-components'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import { createExam } from '../../apollo/mutation/createExam'
import { BannerTop, BannerTitle } from '../Shared/Banner'
import { RedButton } from '../Shared/RedButton'
import Input from './Input'

const CreateExamStyles = styled.div``

const MainContent = styled.div`
  width: ${props => props.theme.maxWidth};
  margin: 3rem auto;
`

export default class CreateExam extends React.Component {
  state = {
    title: ''
  }

  onChange = ({ target: { name, value } }) => this.setState({ [name]: value })

  onCreateExam = async createExam => {
    const { title } = this.state
    const res = await createExam({
      variables: { data: { title } }
    })
    Router.push({ pathname: '/maker', query: { id: res.data.createExam.id } })
  }

  render() {
    const {
      state: { title }
    } = this
    return (
      <CreateExamStyles>
        <BannerTop>
          <BannerTitle>Create Exam</BannerTitle>
        </BannerTop>
        <MainContent>
          <Input
            width={300}
            label="Exam Title"
            value={title}
            inputProps={{
              type: 'text',
              name: 'title',
              maxLength: 50,
              autoFocus: true,
              spellCheck: false
            }}
            onChange={this.onChange}
          />
          <Mutation mutation={createExam}>
            {(createExam, { loading }) => (
              <RedButton
                disabled={loading || !Boolean(title)}
                onClick={() => this.onCreateExam(createExam)}
              >
                create exam
              </RedButton>
            )}
          </Mutation>
        </MainContent>
      </CreateExamStyles>
    )
  }
}
