import styled from 'styled-components'
import { lighten } from 'polished'

const PaginationStyles = styled.div`
  display: grid;
  justify-items: center;
  margin-top: 3rem;
  margin-bottom: 5rem;
  & > :first-child {
    display: flex;
    align-items: center;
    font: 1.3rem 'Open Sans Semi';
    color: ${props => props.theme.grey[10]};
    border: 1px solid ${props => props.theme.grey[2]};
    border-radius: ${props => props.theme.borderRadius};
    & > * {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 6rem;
      padding: 0.75rem;
      border-right: 1px solid ${props => props.theme.grey[2]};
      text-align: center;
      cursor: pointer;
    }
    .prev {
      color: ${props => (props.firstPage ? props.theme.grey[5] : props.theme.grey[10])};
      background: ${props =>
        props.firstPage ? props.theme.grey[0] : lighten(0.1, props.theme.primary)};
      transition: 0.3s;
      &:hover {
        background: ${props => (props.firstPage ? props.theme.grey[0] : props.theme.primary)};
      }
    }
    .middle {
      background: ${props => lighten(0.1, props.theme.primary)};
      transition: 0.3s;
      &:hover {
        background: ${props => props.theme.primary};
      }
    }
    .next {
      color: ${props => (props.lastPage ? props.theme.grey[5] : props.theme.grey[10])};
      background: ${props =>
        props.lastPage ? props.theme.grey[0] : lighten(0.1, props.theme.primary)};
      transition: 0.3s;
      border: 0;
      &:hover {
        background: ${props => (props.lastPage ? props.theme.grey[0] : props.theme.primary)};
      }
    }
  }
`

export default ({ count, skip, first, onPaginate, onResetSearch }) => {
  const page = skip / first + 1
  const totalPages = Math.ceil(count / first)
  return (
    <PaginationStyles firstPage={!Boolean(skip)} lastPage={page === totalPages}>
      <div>
        <div className="prev" onClick={() => onPaginate(false)}>
          Prev
        </div>
        <div className="page">
          {page} of {totalPages}
        </div>
        <div className="middle" onClick={onResetSearch}>
          Reset
        </div>
        <div className="total">{count} Exams</div>
        <div className="next" onClick={() => onPaginate(true)}>
          Next
        </div>
      </div>
    </PaginationStyles>
  )
}
