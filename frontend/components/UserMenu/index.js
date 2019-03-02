import styled from 'styled-components'
import { PersonPin } from 'styled-icons/material/PersonPin'
import { School } from 'styled-icons/material/School'
import { ExitToApp } from 'styled-icons/material/ExitToApp'
import { Mutation } from 'react-apollo'
import { signout } from '../../apollo/mutation/signout'
import { me } from '../../apollo/query/me'

const MenuStyles = styled.div`
  position: absolute;
  top: 4rem;
  right: 0rem;
  width: 10rem;
  display: ${props => (props.show ? 'block' : 'none')};
  background: ${props => props.theme.white};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.shadows[1]};
  & > :first-child {
    margin-top: 0.25rem;
  }
  & > :last-child {
    margin-bottom: 0.25rem;
  }
  .item {
    display: flex;
    align-items: center;
    font: 1.25rem 'Open Sans Semi';
    color: ${props => props.theme.grey[10]};
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background: ${props => props.theme.grey[1]};
    }
    svg {
      margin-right: 1rem;
    }
  }
`

export default class UserMenu extends React.Component {
  state = {}

  componentDidUpdate(prevProps) {
    if (!prevProps.show && this.props.show) {
      document.body.addEventListener('click', this.props.onClose)
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.props.onClose)
  }

  render() {
    const {
      props: { show }
    } = this
    return (
      <MenuStyles show={show}>
        <div className="item">
          <PersonPin size={15} />
          <span>Profile</span>
        </div>
        <div className="item">
          <School size={15} />
          <span>Exams</span>
        </div>
        <Mutation mutation={signout} refetchQueries={[{ query: me }]}>
          {(signout, { loading }) => (
            <div className="item" onClick={signout}>
              <ExitToApp size={15} />
              <span>Sign out</span>
            </div>
          )}
        </Mutation>
      </MenuStyles>
    )
  }
}
