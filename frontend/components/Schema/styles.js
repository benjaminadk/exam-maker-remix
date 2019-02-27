import styled from 'styled-components'
import { transparentize, lighten } from 'polished'

export const SchemaStyles = styled.div``

export const MainContent = styled.div`
  width: ${props => props.theme.maxWidth};
  display: grid;
  grid-template-columns: 60% 40%;
  margin: 3rem auto;
`

export const InfoBlock = styled.div`
  height: 200px;
  display: grid;
  grid-template-columns: 50% 50%;
`

export const CardJSON = styled.div`
  .heading {
    font: 2rem 'Open Sans';
    text-align: center;
  }
  .content {
    font: 1.2rem 'Open Sans';
    text-align: justify;
    padding: 1.5rem 2rem;
    em {
      font-style: italic;
    }
    a {
      color: ${props => props.theme.secondary};
      font: 1.2rem 'Open Sans Semi';
    }
  }
`

export const InfoTable = styled.div`
  height: 400px;
  display: none;
  justify-items: center;
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

export const SchemaBlock = styled.div`
  padding: 1rem;
  .block-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${props => props.theme.primary};
    color: ${props => props.theme.grey[10]};
    text-transform: uppercase;
    font: 1rem 'Open Sans Semi';
    padding: 1rem 2rem;
    border: 1px solid ${props => props.theme.grey[2]};
    border-bottom: 0;
    & > :last-child {
      color: ${props => props.theme.grey[5]};
    }
  }
`

export const SchemaPre = styled.pre`
  font: 1rem 'Roboto Mono';
  background: ${props => transparentize(0.65, lighten(0.1, props.theme.primary))};
  white-space: pre-wrap;
  padding: 1rem;
  border: 1px solid ${props => props.theme.grey[2]};
  border-top: 0;
`
