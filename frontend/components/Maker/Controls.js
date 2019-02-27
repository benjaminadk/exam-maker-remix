import styled from 'styled-components'
import { Add } from 'styled-icons/material/Add'
import { Tune } from 'styled-icons/material/Tune'
import { Mutation } from 'react-apollo'
import { createQuestion } from '../../apollo/mutation/createQuestion'
import { examById } from '../../apollo/query/exam'

const ControlsStyles = styled.div`
  position: fixed;
  bottom: 0;
  left: ${props => `calc(100vw - ${props.theme.maxWidth / 2})`};
  height: 5rem;
  width: ${props => props.theme.maxWidth};
  display: flex;
`

const Box = styled.div`
  width: 4rem;
  height: 4rem;
  display: grid;
  justify-items: center;
  align-items: center;
  border: 1px solid ${props => props.theme.grey[5]};
  outline: 2px solid ${props => (props.highlight ? props.theme.primary : 'transparent')};
  color: ${props => props.theme.grey[5]};
  font: 1.5rem 'Open Sans Light';
  margin-right: 1rem;
  cursor: pointer;
  &:hover {
    outline: 2px solid ${props => props.theme.primary};
  }
  svg {
    width: 2rem;
    height: 2rem;
    color: inherit;
  }
`

export default ({ mode, id, test, setModeState, onCreateQuestion }) => (
  <ControlsStyles>
    <Box highlight={mode === -1} onClick={() => setModeState(-1)}>
      <Tune />
    </Box>
    <Mutation
      mutation={createQuestion}
      variables={{ id }}
      refetchQueries={[{ query: examById, variables: { id } }]}
    >
      {(createQuestion, { loading }) => (
        <Box onClick={() => onCreateQuestion(createQuestion)}>
          <Add />
        </Box>
      )}
    </Mutation>
    {test.map((q, i) => (
      <Box key={q.id} onClick={() => setModeState(i)}>
        {i + 1}
      </Box>
    ))}
  </ControlsStyles>
)
