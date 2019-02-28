import styled from 'styled-components'
import { ArrowDropDown } from 'styled-icons/material/ArrowDropDown'
import isequal from 'lodash.isequal'
import { Mutation } from 'react-apollo'
import { updateQuestion } from '../../apollo/mutation/updateQuestion'
import { examById } from '../../apollo/query/exam'

const TypeStyles = styled.div`
  position: relative;
  & > :first-child {
    width: 20rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${props => props.theme.grey[5]};
    border-radius: 2px;
    color: ${props => props.theme.grey[5]};
    padding: 0.4rem 1rem;
    cursor: pointer;
    &:hover {
      outline: 2px solid ${props => props.theme.primary};
      color: ${props => props.theme.grey[10]};
    }
    span {
      font: 1.25rem 'Open Sans Semi';
      color: inherit;
    }
    svg {
      color: inherit;
    }
  }
  & > :last-child {
    position: absolute;
    top: 3rem;
    display: ${props => (props.show ? 'flex' : 'none')};
    flex-direction: column;
    border: 1px solid ${props => props.theme.grey[5]};
    border-radius: 2px;
    background: ${props => props.theme.white};
    & > * {
      width: 20rem;
      font: 1.25rem 'Open Sans Semi';
      color: ${props => props.theme.grey[5]};
      padding: 0.4rem 1rem;
      cursor: pointer;
      &:hover {
        background: ${props => props.theme.grey[0]};
        color: ${props => props.theme.grey[10]};
      }
    }
  }
`

export default class Type extends React.Component {
  state = {
    show: false,
    id: '',
    variant: 0
  }

  componentDidMount() {
    this.setQuestionState()
  }

  componentDidUpdate(prevProps) {
    if (!isequal(prevProps.question, this.props.question)) {
      this.setQuestionState()
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onHide)
  }

  setQuestionState = () => {
    const { id, variant } = this.props.question
    this.setState({ id, variant })
  }

  onShow = () => {
    this.setState({ show: true })
    document.body.addEventListener('click', this.onHide)
  }

  onHide = () => {
    this.setState({ show: false })
    document.body.removeEventListener('click', this.onHide)
  }

  onSelect = async (updateQuestion, variant) => {
    const { id } = this.state
    await updateQuestion({
      variables: { id, data: { variant } }
    })
  }

  renderVariant = variant => {
    switch (variant) {
      case 0:
        return 'Multiple Choice'
      case 1:
        return 'Multiple Answer'
      case 2:
        return 'Fill In The Blank'
      case 3:
        return 'Ordered List'
    }
  }

  render() {
    const {
      props: { id },
      state: { show, variant }
    } = this
    return (
      <TypeStyles show={show}>
        <div onClick={this.onShow}>
          <span>{this.renderVariant(variant)}</span>
          <ArrowDropDown size={15} />
        </div>
        <Mutation
          mutation={updateQuestion}
          refetchQueries={[{ query: examById, variables: { id } }]}
        >
          {(updateQuestion, { loading }) => (
            <div>
              <div onClick={() => this.onSelect(updateQuestion, 0)}>Multiple Choice</div>
              <div onClick={() => this.onSelect(updateQuestion, 1)}>Multiple Answer</div>
              <div onClick={() => this.onSelect(updateQuestion, 2)}>Fill In The Blank</div>
              <div onClick={() => this.onSelect(updateQuestion, 3)}>Ordered List</div>
            </div>
          )}
        </Mutation>
      </TypeStyles>
    )
  }
}
