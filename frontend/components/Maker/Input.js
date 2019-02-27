import styled from 'styled-components'

const InputStyles = styled.div`
  position: relative;
  width: ${props => (props.width ? `${props.width}px` : '200px')};
  margin-bottom: 2rem;
  span {
    position: absolute;
    bottom: ${props => (props.focus || props.value ? '2rem' : '.1rem')};
    font: ${props => (props.focus || props.value ? '1rem' : '1.5rem')} 'Open Sans';
    color: ${props => (props.focus ? props.theme.grey[10] : props.theme.grey[5])};
    transition: all 0.2s;
  }
  input {
    width: 100%;
    border: 0;
    font: 1.5rem 'Open Sans';
    color: ${props => props.theme.black};
  }
  .underline {
    position: relative;
    height: 0.1rem;
    background: ${props => props.theme.grey[5]};
    & > :first-child {
      position: absolute;
      width: ${props => (props.focus ? '100%' : '0%')};
      height: 0.1rem;
      background: ${props => props.theme.grey[10]};
      transition: width 0.2s;
    }
  }
  .bottom {
    display: ${props => (props.bottom ? 'block' : 'none')};
    position: absolute;
    top: 2.3rem;
    right: 0;
    font: 1rem 'Open Sans';
    color: ${props => (props.focus ? props.theme.grey[10] : props.theme.grey[5])};
  }
`

export default class Input extends React.Component {
  state = {
    focus: false
  }

  onFocus = () => this.setState({ focus: true }, () => this.input.focus())

  onBlur = () => this.setState({ focus: false })

  render() {
    const {
      props: { width, value, label, inputProps, onChange },
      state: { focus }
    } = this
    return (
      <InputStyles
        width={width}
        focus={focus}
        value={Boolean(value)}
        bottom={inputProps.hasOwnProperty('maxLength')}
      >
        <span onClick={this.onFocus}>{label}</span>
        <input
          {...inputProps}
          ref={el => (this.input = el)}
          value={value}
          onChange={onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        <div className="underline">
          <div />
        </div>
        <div className="bottom">
          {value ? value.length : 0}/{inputProps.maxLength || 0}
        </div>
      </InputStyles>
    )
  }
}
