import styled, { ThemeProvider } from 'styled-components'
import theme from './theme'
import GlobalStyle from './GlobalStyle'
import Meta from './Meta'
import Header from '../Header'
import User from '../User'

const PageStyles = styled.div``

const Main = styled.main``

export default class Page extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <User>
          {({ loading, data }) => {
            if (loading) return null
            return (
              <PageStyles>
                <Meta />
                <GlobalStyle />
                <Header user={data.me} />
                <Main>
                  {React.Children.map(this.props.children, child =>
                    React.cloneElement(child, {
                      user: data.me
                    })
                  )}
                </Main>
              </PageStyles>
            )
          }}
        </User>
      </ThemeProvider>
    )
  }
}
