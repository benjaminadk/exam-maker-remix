import styled from 'styled-components'

export const ControlsStyles = styled.div`
  position: fixed;
  bottom: 0;
  left: ${props => `calc(100vw - ${props.theme.maxWidth / 2})`};
  height: 6rem;
  width: ${props => props.theme.maxWidth};
  display: flex;
  align-items: center;
  background: ${props => props.theme.grey[0]};
  & > :first-child {
    margin-left: 1rem;
  }
`

export const Box = styled.div`
  width: 4rem;
  height: 4rem;
  display: grid;
  justify-items: center;
  align-items: center;
  background: ${props => props.theme.white};
  border: 2px solid ${props => props.theme.grey[5]};
  border-radius: 2px;
  outline: 2px solid ${props => (props.highlight ? props.theme.primary : 'transparent')};
  color: ${props => props.theme.grey[5]};
  font: 1.5rem 'Open Sans Semi';
  margin-right: 1rem;
  cursor: pointer;
  &:hover {
    outline: 2px solid ${props => props.theme.primary};
    border: 2px solid ${props => props.theme.grey[10]};
    color: ${props => props.theme.grey[10]};
  }
  svg {
    width: 2rem;
    height: 2rem;
    color: inherit;
  }
`
