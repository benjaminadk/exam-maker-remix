import { withApollo } from 'react-apollo'
import { GoogleLogin } from 'react-google-login'
import { Google } from 'styled-icons/boxicons-logos/Google'
import { Close } from 'styled-icons/material/Close'
import { SigninModalStyles } from './styles'
import { googleClientID } from '../../config'
import { googleSignin } from '../../apollo/mutation/googleSignin'

const error = 'Error authenticating with Google Sign In'

class SigninModal extends React.Component {
  onSuccess = async response => {
    const {
      profileObj: { googleId: googleID, email, imageUrl: image, name }
    } = response
    const data = { googleID, email, name, image, role: 'USER' }
    const res = await this.props.client.mutate({
      mutation: googleSignin,
      variables: { data }
      // refetchQueries: [{ query: ME_QUERY }]
    })
    if (!res.data.googleSignin.success) {
      alert(error)
    }
    this.props.onClose()
  }

  onFailure = res => {
    console.log(res)
  }

  render() {
    return (
      <SigninModalStyles>
        <Close className="close" onClick={this.props.onClose} />
        <div />
        <GoogleLogin
          clientId={googleClientID}
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
          scope="profile email"
          render={props => (
            <span className="google" onClick={props.onClick}>
              <Google /> <span>Sign in with google</span>
            </span>
          )}
        />
      </SigninModalStyles>
    )
  }
}

export default withApollo(SigninModal)
