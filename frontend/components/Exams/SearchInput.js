import styled from 'styled-components'
import Input from '../Shared/Input'

const SearchInputStyles = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  justify-items: center;
  margin-top: 3rem;
`

export default () => (
  <SearchInputStyles>
    <Input type="input" width={300} label="Search Exams" inputProps={{ spellCheck: false }} />
  </SearchInputStyles>
)
