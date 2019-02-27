import styled from 'styled-components'

const CardStyles = styled.div`
  max-width: 300px;
  display: grid;
  grid-template-rows: 1fr 1fr auto;
  justify-items: center;
`

const Heading = styled.div`
  font: 3rem 'Open Sans Light';
  margin-bottom: 2rem;
`

const Text = styled.div`
  font: 1.3rem 'Open Sans';
  text-align: center;
`

const GreyButton = styled.button`
  color: ${props => props.theme.grey[3]};
  background: ${props => props.theme.white};
  text-transform: uppercase;
  font: 1.2rem 'Open Sans Semi';
  border: 2px solid ${props => props.theme.grey[3]};
  padding: 0.75rem 2rem;
  transition: 0.33s;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.grey[5]};
    border: 2px solid ${props => props.theme.grey[5]};
  }
`

export default ({ heading, text, buttonText, onClick }) => (
  <CardStyles>
    <Heading>{heading}</Heading>
    <Text>{text}</Text>
    <GreyButton onClick={onClick}>{buttonText}</GreyButton>
  </CardStyles>
)
