import styled from 'styled-components'
import Input from '../Shared/Input'

const SearchInputStyles = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  justify-items: center;
  margin-top: 5rem;
`

export default ({ term, onChange, onKeyDown }) => (
  <SearchInputStyles>
    <Input
      type="input"
      width={300}
      label="Search Exams"
      value={term}
      onChange={onChange}
      inputProps={{ name: 'term', spellCheck: false, onKeyDown }}
    />
  </SearchInputStyles>
)
