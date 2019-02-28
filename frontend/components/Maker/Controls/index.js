import { Tune } from 'styled-icons/material/Tune'
import { ControlsStyles, Box } from '../styles/Controls'
import AddQuestion from './AddQuestion'

export default ({ mode, id, test, setModeState, onCreateQuestion }) => (
  <ControlsStyles>
    <Box highlight={mode === -1} onClick={() => setModeState(-1)}>
      <Tune />
    </Box>
    <AddQuestion id={id} onClick={onCreateQuestion} />
    {test.map((q, i) => (
      <Box key={q.id} onClick={() => setModeState(i)}>
        {i + 1}
      </Box>
    ))}
  </ControlsStyles>
)
