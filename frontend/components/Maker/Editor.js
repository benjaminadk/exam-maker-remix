import { Mutation } from 'react-apollo'
import { Add } from 'styled-icons/material/Add'
import { updateExam } from '../../apollo/mutation/updateExam'
import { createNode } from '../../apollo/mutation/createNode'
import { examById } from '../../apollo/query/exam'
import { FormStyles } from './styles/FormStyles'
import { Center } from './styles/Center'
import { SubHeading } from './styles/SubHeading'
import Input from './Input'
import NodeInput from './NodeInput'
import QuestionForm from './QuestionForm'

export default ({ id, mode, title, code, time, pass, image, cover, test, onChange }) => {
  if (mode === -1) {
    return (
      <FormStyles>
        <Center>
          <SubHeading>
            <span>Exam Properties</span>
            <span />
          </SubHeading>
          <Mutation mutation={updateExam} refetchQueries={[{ query: examById, variables: { id } }]}>
            {(updateExam, { loading }) => (
              <Input
                width={300}
                label={loading ? 'Saving...' : 'Title'}
                value={title}
                inputProps={{ type: 'text', name: 'title', maxLength: 50, spellCheck: false }}
                onChange={e => onChange(e, updateExam)}
              />
            )}
          </Mutation>
          <Mutation mutation={updateExam} refetchQueries={[{ query: examById, variables: { id } }]}>
            {(updateExam, { loading }) => (
              <Input
                width={300}
                label={loading ? 'Saving...' : 'Code'}
                value={code}
                inputProps={{ type: 'text', name: 'code', maxLength: 8, spellCheck: false }}
                onChange={e => onChange(e, updateExam)}
              />
            )}
          </Mutation>
          <Mutation mutation={updateExam} refetchQueries={[{ query: examById, variables: { id } }]}>
            {(updateExam, { loading }) => (
              <Input
                width={300}
                label={loading ? 'Saving...' : 'Time Limit In Minutes'}
                value={time}
                inputProps={{ type: 'number', name: 'time', min: 0, max: 1000 }}
                onChange={e => onChange(e, updateExam)}
              />
            )}
          </Mutation>
          <Mutation mutation={updateExam} refetchQueries={[{ query: examById, variables: { id } }]}>
            {(updateExam, { loading }) => (
              <Input
                width={300}
                label={loading ? 'Saving...' : 'Passing Score Percentage'}
                value={pass}
                inputProps={{ type: 'number', name: 'pass', min: 0, max: 100 }}
                onChange={e => onChange(e, updateExam)}
              />
            )}
          </Mutation>
          <Mutation mutation={updateExam} refetchQueries={[{ query: examById, variables: { id } }]}>
            {(updateExam, { loading }) => (
              <Input
                width={300}
                label={loading ? 'Saving...' : 'Logo URL'}
                value={image}
                inputProps={{ type: 'text', name: 'image', spellCheck: false }}
                onChange={e => onChange(e, updateExam)}
              />
            )}
          </Mutation>
        </Center>
        <Center>
          <SubHeading>
            <span>Cover Nodes</span>
            <Mutation
              mutation={createNode}
              variables={{ id, type: 'cover' }}
              refetchQueries={[{ query: examById, variables: { id } }]}
            >
              {(createNode, { loading }) => (
                <span className="add" onClick={async () => await createNode()}>
                  <Add size={15} />
                </span>
              )}
            </Mutation>
          </SubHeading>
          {cover.map((n, i) => (
            <NodeInput key={n.id} type="cover" id={id} node={n} />
          ))}
        </Center>
      </FormStyles>
    )
  } else {
    return <QuestionForm id={id} question={test[mode]} />
  }
}
