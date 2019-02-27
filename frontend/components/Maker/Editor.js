import styled from 'styled-components'
import Input from './Input'

const Metadata = styled.div``

export default ({ mode, title, code, time, pass, image, cover, test, onChange }) => {
  if (mode === -1) {
    return (
      <Metadata>
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
      </Metadata>
    )
  }
}
