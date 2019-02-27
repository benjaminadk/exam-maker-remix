import { Query } from 'react-apollo'
import { me } from '../../apollo/query/me'
import SigninModal from '../Header/SigninModal'

export default class PleaseSignIn extends React.Component {
  state = {
    showModal: true
  }

  onShowModal = () => this.setState({ showModal: true })

  onCloseModal = () => this.setState({ showModal: false })

  render() {
    const {
      props: { children },
      state: { showModal }
    } = this
    return (
      <Query query={me}>
        {({ data, loading }) => {
          if (loading) return <div>loading</div>
          if (!data.me) {
            return <SigninModal show={showModal} onClose={this.onCloseModal} />
          }
          return children
        }}
      </Query>
    )
  }
}
