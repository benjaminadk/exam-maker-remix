import { Mutation } from 'react-apollo'
import { Add } from 'styled-icons/material/Add'
import { createNode } from '../../apollo/mutation/createNode'
import { examById } from '../../apollo/query/exam'
import { FormStyles } from './styles/FormStyles'
import { SubHeading } from './styles/SubHeading'
import { Center } from './styles/Center'
import NodeInput from './NodeInput'
import Type from './Type'

export default ({ id, question }) => (
  <FormStyles>
    <Center>
      <SubHeading>
        <span>Type</span>
        <Type question={question} />
      </SubHeading>
    </Center>
    <Center>
      <SubHeading>
        <span>Question Nodes</span>
        <Mutation
          mutation={createNode}
          variables={{ id: question.id, type: 'question' }}
          refetchQueries={[{ query: examById, variables: { id } }]}
        >
          {(createNode, { loading }) => (
            <span className="add" onClick={async () => await createNode()}>
              <Add size={15} />
            </span>
          )}
        </Mutation>
      </SubHeading>
      {question.question.map((q, i) => (
        <NodeInput key={q.id} id={id} type="question" node={q} />
      ))}
    </Center>
  </FormStyles>
)
