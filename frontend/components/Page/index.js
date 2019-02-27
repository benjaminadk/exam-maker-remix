import styled, { ThemeProvider } from 'styled-components'
import theme from './theme'
import GlobalStyle from './GlobalStyle'
import Meta from './Meta'
import Header from '../Header'
import User from '../User'
import SigninModal from '../Header/SigninModal'

const PageStyles = styled.div``

const Main = styled.main``

export default class Page extends React.Component {
  state = {
    showModal: false
  }

  onShowModal = () => this.setState({ showModal: true })

  onCloseModal = () => this.setState({ showModal: false })

  render() {
    const {
      state: { showModal }
    } = this
    return (
      <ThemeProvider theme={theme}>
        <User>
          {({ loading, data }) => {
            if (loading) return null
            return (
              <PageStyles>
                <Meta />
                <GlobalStyle />
                <Header user={data.me} onShowModal={this.onShowModal} />
                <Main>
                  {React.Children.map(this.props.children, child =>
                    React.cloneElement(child, {
                      user: data.me
                    })
                  )}
                </Main>
                <SigninModal show={showModal} onClose={this.onCloseModal} />
              </PageStyles>
            )
          }}
        </User>
      </ThemeProvider>
    )
  }
}
