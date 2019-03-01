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
    border: 2px solid ${props => props.theme.grey[5]};
    border-radius: 2px;
    color: ${props => props.theme.grey[5]};
    cursor: pointer;
    margin-right: 1rem;
    &:hover {
      outline: 2px solid ${props => props.theme.primary};
      color: ${props => props.theme.grey[10]};
      border: 2px solid ${props => props.theme.grey[10]};
    }
    .published {
      color: ${props => (props.published ? props.theme.primary : props.theme.grey[5])};
    }
    svg {
      color: inherit;
    }
  }
`

export default ({ id, published }) => (
  <ActionsStyles published={published}>
    <Mutation
      mutation={updateExam}
      variables={{ id, data: { published: !published } }}
      refetchQueries={[{ query: examById, variables: { id } }]}
    >
      {(updateExam, { loading }) => (
        <div className="action published" onClick={async () => updateExam()}>
          <Public size={20} />
        </div>
      )}
    </Mutation>
    <div className="action">
      <FileDownload size={20} />
    </div>
    <div className="action">
      <Delete size={20} />
    </div>
  </ActionsStyles>
)
