import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { CheckBoxOutlineBlank } from 'styled-icons/material/CheckBoxOutlineBlank'
import { CheckBox } from 'styled-icons/material/CheckBox'
import { Delete } from 'styled-icons/material/Delete'
import isequal from 'lodash.isequal'
import debounce from 'lodash.debounce'
import { examById } from '../../apollo/query/exam'
import { updateNode } from '../../apollo/mutation/updateNode'
import { deleteNode } from '../../apollo/mutation/deleteNode'
import { updateQuestion } from '../../apollo/mutation/updateQuestion'
import formatAnswerLabel from '../../lib/formatAnswerLabel'
import Input from './Input'

const ChoiceInputStyles = styled.div`
  display: grid;
  grid-template-columns: 3rem 1fr 4rem;
  & > :first-child {
    justify-self: flex-start;
    margin-top: 0.5rem;
    color: ${props => props.theme.grey[10]};
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.black};
    }
  }
  & > :last-child {
    justify-self: center;
    color: ${props => props.theme.grey[10]};
    margin-top: 0.5rem;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.secondary};
    }
  }
`

export default class ChoiceInput extends React.Component {
  state = {
    text: '',
    answer: false
  }

  componentDidMount() {
    this.setChoiceState()
  }

  componentDidUpdate(prevProps) {
    if (
      !isequal(prevProps.choice, this.props.choice) ||
      !isequal(prevProps.answer, this.props.answer)
    ) {
      this.setChoiceState()
    }
  }

  setChoiceState = () => {
    const { choice, answer } = this.props
    this.setState({ id: choice.id, text: choice.text, answer })
  }

  onAnswerClick = async (updateQuestion, answer) => {
    let { questionId, answers, index } = this.props
    answers[index] = answer
    await updateQuestion({
      variables: { id: questionId, data: { answer: { set: answers } } }
    })
  }

  onChange = ({ target: { name, value } }, updateNode) => {
    this.setState({ [name]: value })
    this.onTextChange(updateNode, value)
  }

  onTextChange = debounce(async (updateNode, text) => {
    const {
      choice: { id }
    } = this.props
    await updateNode({
      variables: { type: 'choices', id, text }
    })
  }, 5000)

  onDelete = async deleteNode => {
    const {
      props: {
        choice: { id },
        answers,
        index,
        questionId
      }
    } = this
    const newAnswers = answers.filter((a, i) => i !== index)
    await deleteNode({
      variables: { type: 'choices', id, answers: newAnswers, questionId }
    })
  }

  render() {
    const {
      props: { id, index },
      state: { text, answer }
    } = this
    return (
      <ChoiceInputStyles>
        <Mutation
          mutation={updateQuestion}
          refetchQueries={[{ query: examById, variables: { id } }]}
        >
          {(updateQuestion, { loading }) => {
            if (answer)
              return (
                <CheckBox
                  className="checked"
                  size={15}
                  onClick={() => this.onAnswerClick(updateQuestion, false)}
                />
              )
            else
              return (
                <CheckBoxOutlineBlank
                  size={15}
                  onClick={() => this.onAnswerClick(updateQuestion, true)}
                />
              )
          }}
        </Mutation>
        <Mutation mutation={updateNode} refetchQueries={[{ query: examById, variables: { id } }]}>
          {(updateNode, { loading }) => (
            <Input
              width={275}
              label={loading ? 'Saving...' : `Answer Text ${formatAnswerLabel(index)}`}
              value={text}
              inputProps={{ type: 'text', name: 'text', spellCheck: false }}
              onChange={e => this.onChange(e, updateNode)}
            />
          )}
        </Mutation>
        <Mutation mutation={deleteNode} refetchQueries={[{ query: examById, variables: { id } }]}>
          {(deleteNode, { loading }) => (
            <Delete size={15} onClick={() => this.onDelete(deleteNode)} />
          )}
        </Mutation>
      </ChoiceInputStyles>
    )
  }
}
