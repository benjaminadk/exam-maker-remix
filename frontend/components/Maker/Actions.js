import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { Public } from 'styled-icons/material/Public'
import { FileDownload } from 'styled-icons/material/FileDownload'
import { Delete } from 'styled-icons/material/Delete'
import { updateExam } from '../../apollo/mutation/updateExam'
import { examById } from '../../apollo/query/exam'

const ActionsStyles = styled.div`
  display: flex;
  margin-bottom: 4rem;
  .action {
    width: 4rem;
    height: 4rem;
    display: grid;
    justify-items: center;
    align-items: center;
    border-radius: 2px;
    border: 2px solid ${props => props.theme.grey[5]};
    color: ${props => props.theme.grey[5]};
    cursor: pointer;
    margin-right: 1rem;
    &:hover {
      outline: 2px solid ${props => props.theme.primary};
      color: ${props => props.theme.grey[10]};
      border: 2px solid ${props => props.theme.grey[10]};
    }
    svg {
      color: inherit;
    }
  }
  .published {
    background: ${props => (props.published ? props.theme.primary : 'transparent')};
    border: 2px solid ${props => (props.published ? props.theme.grey[10] : props.theme.grey[5])};
    color: ${props => (props.published ? props.theme.grey[10] : props.theme.grey[5])};
  }
`

export default ({ id, published, onDownloadExam }) => (
  <ActionsStyles published={published}>
    <Mutation
      mutation={updateExam}
      variables={{ id, data: { published: !published } }}
      refetchQueries={[{ query: examById, variables: { id } }]}
    >
      {(updateExam, { loading }) => (
        <div className="action published" onClick={updateExam}>
          <Public size={20} />
        </div>
      )}
    </Mutation>
    <div className="action download" onClick={onDownloadExam}>
      <FileDownload size={20} />
    </div>
    <div className="action delete">
      <Delete size={20} />
    </div>
  </ActionsStyles>
)
