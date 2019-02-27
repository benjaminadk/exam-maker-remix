import styled from 'styled-components'
import Input from './Input'
import NodeInput from './NodeInput'

const Metadata = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
`

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SubHeading = styled.div`
  font: 1.5rem 'Open Sans Semi';
  text-align: center;
  color: ${props => props.theme.black};
  margin-bottom: 2rem;
`

const QuestionEdit = styled.div``

export default ({ id, mode, title, code, time, pass, image, cover, test, onChange }) => {
  if (mode === -1) {
    return (
      <Metadata>
        <Center>
          <SubHeading>Exam Properties</SubHeading>
          <Input
            width={300}
            label="Title"
            value={title}
            inputProps={{ type: 'text', name: 'title', maxLength: 50, spellCheck: false }}
            onChange={onChange}
          />
          <Input
            width={300}
            label="Code"
            value={code}
            inputProps={{ type: 'text', name: 'code', maxLength: 8, spellCheck: false }}
            onChange={onChange}
          />
          <Input
            width={300}
            label="Time Limit"
            value={time}
            inputProps={{ type: 'number', name: 'time', min: 0, max: 1000 }}
            onChange={onChange}
          />
          <Input
            width={300}
            label="Passing Score"
            value={pass}
            inputProps={{ type: 'number', name: 'pass', min: 0, max: 100 }}
            onChange={onChange}
          />
          <Input
            width={300}
            label="Image"
            value={image}
            inputProps={{ type: 'text', name: 'image', spellCheck: false }}
            onChange={onChange}
          />
        </Center>
        <Center>
          <SubHeading>Cover Nodes</SubHeading>
          {cover.map((n, i) => (
            <NodeInput key={n.id} type="cover" id={id} node={n} />
          ))}
        </Center>
      </Metadata>
    )
  } else {
    return <QuestionEdit>{JSON.stringify(test[mode])}</QuestionEdit>
  }
}
