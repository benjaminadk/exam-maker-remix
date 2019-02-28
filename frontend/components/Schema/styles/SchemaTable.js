import styled from 'styled-components'

export const SchemaTableStyles = styled.div`
  width: ${props => props.theme.maxWidth};
  height: 400px;
  display: grid;
  justify-items: center;
  margin: 0 auto;
  table {
    font: 1rem 'Roboto Mono';
    border: 1px solid ${props => props.theme.grey[2]};
    padding: 0.5rem;
    th {
      padding-left: 1.5rem;
      font-size: 1.25rem;
    }
    td {
      padding: 0.4rem 1rem;
    }
  }
`
