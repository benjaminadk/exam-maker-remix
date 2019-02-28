import { InputStyles, Label, Underline, Hint, Length } from '../styles/Input'

export default class Input extends React.Component {
  state = {
    focus: false
  }

  onFocus = () => this.setState({ focus: true }, () => this.input.focus())

  onBlur = () => this.setState({ focus: false })

  render() {
    const {
      props: { width, value, label, hint, inputProps, onChange },
      state: { focus }
    } = this
    return (
      <InputStyles
        width={width}
        focus={focus}
        value={Boolean(value)}
        hint={Boolean(hint)}
        bottom={inputProps.hasOwnProperty('maxLength')}
      >
        <Label focus={focus} value={Boolean(value)} onClick={this.onFocus}>
          {label}
        </Label>
        <input
          {...inputProps}
          ref={el => (this.input = el)}
          value={value}
          onChange={onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
        <div className="underline">
          <Underline focus={focus} />
        </div>
        <Hint show={Boolean(hint)} focus={focus}>
          {hint}
        </Hint>
        <Length show={inputProps && inputProps.hasOwnProperty('maxLength')} focus={focus}>
          {value ? value.length : 0}/{inputProps.maxLength || 0}
        </Length>
      </InputStyles>
    )
  }
}
