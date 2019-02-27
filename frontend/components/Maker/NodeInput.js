import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import isequal from 'lodash.isequal'
import debounce from 'lodash.debounce'
import { updateNode } from '../../apollo/mutation/updateNode'
import { deleteNode } from '../../apollo/mutation/deleteNode'
import { examById } from '../../apollo/query/exam'
import { Image } from 'styled-icons/material/Image'
import { Title } from 'styled-icons/material/Title'
import { Delete } from 'styled-icons/material/Delete'
import Input from './Input'

const NodeInputStyles = styled.div`
  display: grid;
  grid-template-columns: 9rem 1fr 4rem;
  .variants {
    width: 7.5rem;
    height: 2rem;
    display: flex;
    border: 1px solid ${props => props.theme.grey[2]};
  }
  & > :last-child {
    justify-self: center;
    margin-top: 0.5rem;
    color: ${props => props.theme.grey[10]};
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.secondary};
    }
  }
`

const Option = styled.div`
  width: 3rem;
  display: grid;
  justify-items: center;
  align-items: center;
  background: ${props => (props.highlight ? props.theme.primary : props.theme.grey[0])};
  color: ${props => props.theme.grey[10]};
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.secondary};
    background: ${props => props.theme.primary};
  }
  svg {
    color: inherit;
  }
`

export default class NodeInput extends React.Component {
  state = {
    variant: 0,
    text: ''
  }

  componentDidMount() {
    this.setNodeState()
  }

  componentDidUpdate(prevProps) {
    if (!isequal(prevProps.node, this.props.node)) {
      this.setNodeState()
    }
  }

  setNodeState = () => {
    const { variant, text } = this.props.node
    this.setState({ variant, text })
  }

  onChange = ({ target: { name, value } }, updateNode) => {
    this.setState({ [name]: value })
    this.onTextChange(updateNode, value)
  }

  onVariantChange = async (updateNode, variant) => {
    const {
      node: { id },
      type
    } = this.props
    await updateNode({
      variables: { type, id, variant }
    })
  }

  onTextChange = debounce(async (updateNode, text) => {
    const {
      node: { id },
      type
    } = this.props
    await updateNode({
      variables: { type, id, text }
    })
  }, 5000)

  onDeleteClick = async deleteNode => {
    const {
      node: { id },
      type
    } = this.props
    await deleteNode({
      variables: { type, id }
    })
  }

  render() {
    const {
      props: { id },
      state: { variant, text }
    } = this
    return (
      <NodeInputStyles>
        <Mutation mutation={updateNode} refetchQueries={[{ query: examById, variables: { id } }]}>
          {(updateNode, { loading }) => (
            <div className="variants">
              <Option highlight={variant === 2} onClick={() => this.onVariantChange(updateNode, 2)}>
                <Title size={20} />
              </Option>
              <Option highlight={variant === 1} onClick={() => this.onVariantChange(updateNode, 1)}>
                <Title size={13} />
              </Option>
              <Option highlight={variant === 0} onClick={() => this.onVariantChange(updateNode, 0)}>
                <Image size={15} />
              </Option>
            </div>
          )}
        </Mutation>
        <Mutation mutation={updateNode} refetchQueries={[{ query: examById, variables: { id } }]}>
          {(updateNode, { loading }) => (
            <Input
              width={400}
              label={
                loading
                  ? 'Saving...'
                  : variant === 0
                  ? 'Source URL'
                  : variant === 1
                  ? 'Normal Text'
                  : 'Header Text'
              }
              value={text}
              onChange={e => this.onChange(e, updateNode)}
              inputProps={{ type: 'text', name: 'text', spellCheck: false }}
            />
          )}
        </Mutation>
        <Mutation mutation={deleteNode} refetchQueries={[{ query: examById, variables: { id } }]}>
          {(deleteNode, { loading }) => (
            <Delete size={15} onClick={() => this.onDeleteClick(deleteNode)} />
          )}
        </Mutation>
      </NodeInputStyles>
    )
  }
}
