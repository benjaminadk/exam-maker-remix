import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import { Add } from 'styled-icons/material/Add'
import { updateExam } from '../../apollo/mutation/updateExam'
import { createNode } from '../../apollo/mutation/createNode'
import { examById } from '../../apollo/query/exam'
import { Center } from './styles/Center'
import { SubHeading } from './styles/SubHeading'
import Input from '../Shared/Input'
import NodeInput from './NodeInput'
import Actions from './Actions'

const MainFormStyles = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
`

export default ({
  id,
  published,
  title,
  description,
  code,
  time,
  pass,
  image,
  cover,
  onChange,
  onDownloadExam
}) => (
  <MainFormStyles>
    <Center>
      <SubHeading>
        <span>Exam Properties</span>
        <span />
      </SubHeading>
      <Actions id={id} published={published} onDownloadExam={onDownloadExam} />
      <Mutation mutation={updateExam} refetchQueries={[{ query: examById, variables: { id } }]}>
        {(updateExam, { loading }) => (
          <Input
            type="input"
            width={300}
            label={loading ? 'Saving...' : 'Title'}
            value={title}
            inputProps={{ name: 'title', maxLength: 50, spellCheck: false }}
            onChange={e => onChange(e, updateExam)}
          />
        )}
      </Mutation>
      <Mutation mutation={updateExam} refetchQueries={[{ query: examById, variables: { id } }]}>
        {(updateExam, { loading }) => (
          <Input
            type="text"
            width={300}
            label={loading ? 'Saving...' : 'Description'}
            value={description}
            inputProps={{ name: 'description', maxLength: 280, spellCheck: false }}
            onChange={e => onChange(e, updateExam)}
          />
        )}
      </Mutation>
      <Mutation mutation={updateExam} refetchQueries={[{ query: examById, variables: { id } }]}>
        {(updateExam, { loading }) => (
          <Input
            type="input"
            width={300}
            label={loading ? 'Saving...' : 'Code'}
            hint="Certification Code e.g. 601-902"
            value={code}
            inputProps={{ name: 'code', maxLength: 8, spellCheck: false }}
            onChange={e => onChange(e, updateExam)}
          />
        )}
      </Mutation>
      <Mutation mutation={updateExam} refetchQueries={[{ query: examById, variables: { id } }]}>
        {(updateExam, { loading }) => (
          <Input
            type="number"
            width={300}
            label={loading ? 'Saving...' : 'Time Limit'}
            hint="Minutes"
            value={time}
            inputProps={{ name: 'time', min: 0, max: 1000 }}
            onChange={e => onChange(e, updateExam)}
          />
        )}
      </Mutation>
      <Mutation mutation={updateExam} refetchQueries={[{ query: examById, variables: { id } }]}>
        {(updateExam, { loading }) => (
          <Input
            type="number"
            width={300}
            label={loading ? 'Saving...' : 'Passing Score'}
            hint="Percentage [ 0 - 100 ]"
            value={pass}
            inputProps={{ name: 'pass', min: 0, max: 100 }}
            onChange={e => onChange(e, updateExam)}
          />
        )}
      </Mutation>
      <Mutation mutation={updateExam} refetchQueries={[{ query: examById, variables: { id } }]}>
        {(updateExam, { loading }) => (
          <Input
            type="input"
            width={300}
            label={loading ? 'Saving...' : 'Logo URL'}
            hint="Image with 1:1 size ratio"
            value={image}
            inputProps={{ name: 'image', spellCheck: false }}
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
  </MainFormStyles>
)
