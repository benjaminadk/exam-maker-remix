import styled from 'styled-components'
import { darken, transparentize } from 'polished'

export const HeaderStyles = styled.header`
  height: 6rem;
  background: ${props => props.theme.primary};
  & > :first-child {
    max-width: ${props => props.theme.maxWidth};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    font: 1.4rem 'Open Sans Semi';
    .links {
      display: flex;
      align-items: center;
    }
  }
`

export const HeaderLink = styled.a`
  font: 1.4rem 'Open Sans Semi';
  padding-left: 3rem;
  transition: 0.1s;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.secondary};
  }
`

export const SigninModalStyles = styled.div`
  position: relative;
  width: 50vw;
  height: 50vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: ${props => props.theme.white};
  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    color: ${props => props.theme.black};
    cursor: pointer;
  }
  .google {
    justify-self: center;
    align-self: center;
    display: flex;
    align-items: center;
    background: ${props => props.theme.secondary};
    color: ${props => props.theme.white};
    border-radius: 3px;
    padding: 0.75rem 1.5rem;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      background: ${props => darken(0.1, props.theme.secondary)};
    }
    svg {
      width: 2.5rem;
      height: 2.5rem;
      color: inherit;
      margin-right: 1rem;
    }
    span {
      color: inherit;
      text-transform: uppercase;
      font: 1.1rem 'Open Sans Semi';
    }
  }
`

export const AvatarStyles = styled.div`
  position: relative;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 1px solid transparent;
    background: ${props => props.theme.white};
    margin-left: 3rem;
    cursor: pointer;
  }
`
