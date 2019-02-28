import { Mutation } from 'react-apollo'
import { examById } from '../../../apollo/query/exam'
import { updateNode } from '../../../apollo/mutation/updateNode'
import formatAnswerLabel from '../../../lib/formatAnswerLabel'
import Input from '../Input'

export default ({ id, index, text, onChange }) => (
  <Mutation mutation={updateNode} refetchQueries={[{ query: examById, variables: { id } }]}>
    {(updateNode, { loading }) => (
      <Input
        width={275}
        label={loading ? 'Saving...' : `Answer Text ${formatAnswerLabel(index)}`}
        value={text}
        inputProps={{ type: 'text', name: 'text', spellCheck: false }}
        onChange={e => onChange(e, updateNode)}
      />
    )}
  </Mutation>
)
