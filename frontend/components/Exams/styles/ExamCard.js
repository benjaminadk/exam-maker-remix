import styled from 'styled-components'
import { darken } from 'polished'

export const ExamCardStyles = styled.div`
  width: 50rem;
  display: grid;
  grid-template-columns: 5rem 1fr 3rem;
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
    .title {
      width: 35rem;
      font: 1.75rem 'Open Sans Bold';
      color: ${props => props.theme.grey[12]};
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .description {
      width: 35rem;
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
    svg {
      color: ${props => props.theme.grey[10]};
      &:hover {
        color: ${props => props.theme.black};
      }
    }
  }
`
