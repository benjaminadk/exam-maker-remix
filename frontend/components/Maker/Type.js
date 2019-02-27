import styled from 'styled-components'
import { ArrowDropDown } from 'styled-icons/material/ArrowDropDown'

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
    const { id, variant } = this.props.question
    this.setState({ id, variant })
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onHide)
  }

  onShow = () => {
    this.setState({ show: true })
    document.body.addEventListener('click', this.onHide)
  }

  onHide = () => {
    this.setState({ show: false })
    document.body.removeEventListener('click', this.onHide)
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
        return 'Drag & Drop'
    }
  }

  render() {
    const {
      state: { show, variant }
    } = this
    return (
      <TypeStyles show={show}>
        <div onClick={this.onShow}>
          <span>{this.renderVariant(variant)}</span>
          <ArrowDropDown size={15} />
        </div>
        <div>
          <div>Multiple Choice</div>
          <div>Multiple Answer</div>
          <div>Fill In The Blank</div>
          <div>Drag & Drop</div>
        </div>
      </TypeStyles>
    )
  }
}
