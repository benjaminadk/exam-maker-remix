import styled from 'styled-components'
import { darken } from 'polished'

export const ExamCardStyles = styled.div`
  width: 55rem;
  display: grid;
  grid-template-columns: 5rem 1fr 5rem;
  grid-gap: 2rem;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${props => props.theme.grey[2]};
  border-radius: ${props => props.theme.borderRadius};
  margin-bottom: 2rem;
  cursor: pointer;
  .image {
    width: 5rem;
    height: 5rem;
  }
  .main {
    .code {
      font: 0.75rem 'Open Sans';
      border: 1px solid ${props => props.theme.grey[2]};
      border-radius: ${props => props.theme.borderRadius};
      padding: 0.1rem 0.25rem;
      background: ${props => props.theme.grey[0]};
      color: ${props => props.theme.grey[5]};
    }
    .title {
      width: 40rem;
      font: 1.75rem 'Open Sans Bold';
      color: ${props => props.theme.grey[12]};
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .description {
      width: 40rem;
      font: 1.1rem 'Open Sans';
      text-align: justify;
      margin-bottom: 0.25rem;
    }
    .meta {
      display: flex;
      align-items: center;
      .date {
        font: 1rem 'Open Sans Semi';
        color: ${props => props.theme.grey[5]};
      }
      .name {
        font: 1rem 'Open Sans Bold';
        color: ${props => props.theme.secondary};
        margin-right: 0.5rem;
        &:hover {
          color: ${props => darken(0.1, props.theme.secondary)};
        }
      }
      .avatar {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }
    }
  }
  .actions {
    align-self: flex-end;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.grey[5]};
    &:hover {
      color: ${props => props.theme.grey[10]};
    }
    svg {
      color: inherit;
    }
    span {
      width: 1.5rem;
      height: 1.5rem;
      display: grid;
      justify-items: center;
      align-items: center;
      font: 0.75rem 'Open Sans Bold';
      background: ${props => props.theme.grey[0]};
      color: ${props => props.theme.grey[5]};
      border: 1px solid ${props => props.theme.grey[2]};
      border-radius: 50%;
      padding: 0.15rem;
    }
  }
`
