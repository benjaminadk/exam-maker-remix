import styled from 'styled-components'

export const SubHeading = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  & > :first-child {
    font: 1.5rem 'Open Sans Semi';
    text-align: center;
    color: ${props => props.theme.black};
    margin-right: 1rem;
  }
  .add {
    width: 2rem;
    height: 2rem;
    display: grid;
    justify-items: center;
    align-items: center;
    border: 1px solid ${props => props.theme.grey[5]};
    border-radius: 2px;
    cursor: pointer;
    &:hover {
      outline: 2px solid ${props => props.theme.primary};
    }
    svg {
      color: ${props => props.theme.grey[5]};
    }
  }
`
