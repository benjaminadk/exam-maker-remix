import styled from 'styled-components'
import { darken } from 'polished'
import { GreyButton } from '../Shared/GreyButton'

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
  background: ${props => props.theme.white};
  .top {
    height: 4rem;
    background: ${props => props.theme.primary};
  }
  .content {
    height: calc(100% - 4rem);
    padding: 1rem 3rem 3rem 3rem;
    .traditional {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 4rem;
      }
      button {
        width: 100%;
        margin-top: -1rem;
      }
      .toggle {
        font: 1.2rem 'Open Sans Semi';
        color: ${props => props.theme.grey[5]};
        text-decoration: underline;
        margin-top: 1rem;
        margin-bottom: 2rem;
        transition: 0.3s;
        cursor: pointer;
        &:hover {
          color: ${props => props.theme.grey[10]};
        }
      }
    }
    .divider {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 1rem auto;
      & > :first-child,
      & > :last-child {
        width: 33%;
        height: 2px;
        background: ${props => props.theme.grey[8]};
      }
      .middle {
        color: ${props => props.theme.grey[8]};
        font: 1.5rem 'Open Sans Bold';
        text-transform: uppercase;
        padding: 0 0.5rem;
      }
    }
  }
  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    color: ${props => props.theme.black};
    cursor: pointer;
  }
`

export const DarkGreyButton = styled(GreyButton)`
  color: ${props => props.theme.grey[5]};
  border: 2px solid ${props => props.theme.grey[5]};
  &:hover {
    background: ${props => props.theme.grey[0]};
    color: ${props => props.theme.grey[8]};
    border: 2px solid ${props => props.theme.grey[8]};
  }
`

export const GoogleButton = styled.div`
  justify-self: center;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
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
    font: 1.2rem 'Open Sans Semi';
  }
`

export const AvatarStyles = styled.div`
  position: relative;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 1px solid transparent;
    background: ${props => props.theme.grey[0]};
    margin-left: 3rem;
    cursor: pointer;
  }
`
