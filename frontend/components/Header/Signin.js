import { HeaderLink } from './styles'
import SigninModal from './SigninModal'
import Avatar from './Avatar'
import Modal from '../Modal'

export default class Signin extends React.Component {
  state = {
    showModal: false
  }

  onShowModal = () => this.setState({ showModal: true })

  onHideModal = () => this.setState({ showModal: false })

  render() {
    const {
      props: { user },
      state: { showModal }
    } = this
    return (
      <>
        {user ? (
          <Avatar user={user} />
        ) : (
          <HeaderLink onClick={this.onShowModal}>Sign in</HeaderLink>
        )}
        <Modal show={showModal} color="dark" onClose={this.onHideModal}>
          <SigninModal onClose={this.onHideModal} />
        </Modal>
      </>
    )
  }
}
