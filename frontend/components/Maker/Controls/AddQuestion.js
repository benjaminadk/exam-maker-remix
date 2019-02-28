import { Mutation } from 'react-apollo'
import { Add } from 'styled-icons/material/Add'
import { createQuestion } from '../../../apollo/mutation/createQuestion'
import { examById } from '../../../apollo/query/exam'
import { Box } from '../styles/Controls'

export default ({ id, onClick }) => (
  <Mutation
    mutation={createQuestion}
    variables={{ id }}
    refetchQueries={[{ query: examById, variables: { id } }]}
  >
    {(createQuestion, { loading }) => (
      <Box onClick={() => onClick(createQuestion)}>
        <Add />
      </Box>
    )}
  </Mutation>
)
