import styled from 'styled-components'

export const SchemaStyles = styled.div``

export const MainContent = styled.div`
  width: ${props => props.theme.maxWidth};
  display: grid;
  grid-template-columns: 30% 70%;
  margin: 3rem auto;
`

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
`
