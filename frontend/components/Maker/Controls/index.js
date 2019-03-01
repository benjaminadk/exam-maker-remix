import { Tune } from 'styled-icons/material/Tune'
import { KeyboardArrowLeft } from 'styled-icons/material/KeyboardArrowLeft'
import { KeyboardArrowRight } from 'styled-icons/material/KeyboardArrowRight'
import { ControlsStyles, Box, ArrowBox } from '../styles/Controls'
import AddQuestion from './AddQuestion'

export default class Controls extends React.Component {
  state = {
    width: 0,
    shift: 0,
    shifts: 0
  }

  componentDidMount() {
    this.setInitialState()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.test.length !== this.props.test.length) {
      this.setInitialState()
    }
  }

  setInitialState = () => {
    const totalWidth = this.props.test.length * 44
    const width = this.row.clientWidth
    const shifts = Math.floor(totalWidth / width)
    this.setState({ shifts, width })
  }

  setShift = inc => {
    const { shift, shifts } = this.state
    if (inc) {
      if (shift + 1 <= shifts) {
        this.setState({ shift: shift + 1 })
      }
    } else {
      if (shift - 1 >= 0) {
        this.setState({ shift: shift - 1 })
      }
    }
  }

  render() {
    const {
      props: { mode, id, test, setModeState, onCreateQuestion },
      state: { shifts, shift, width }
    } = this
    return (
      <ControlsStyles items={test.length} shifts={shifts} shift={shift} width={width}>
        <Box highlight={mode === -1} onClick={() => setModeState(-1)}>
          <Tune className="tune" />
        </Box>
        <AddQuestion id={id} onClick={onCreateQuestion} />
        <ArrowBox disable={shifts === 0 || shift === 0} onClick={() => this.setShift(false)}>
          <KeyboardArrowLeft className="arrow" />
        </ArrowBox>
        <div ref={el => (this.row = el)} className="questions">
          <div className="wrapper">
            {test.map((q, i) => (
              <Box key={q.id} onClick={() => setModeState(i)}>
                {i + 1}
              </Box>
            ))}
          </div>
        </div>
        <ArrowBox disable={shifts === 0 || shift === shifts} onClick={() => this.setShift(true)}>
          <KeyboardArrowRight className="arrow" />
        </ArrowBox>
      </ControlsStyles>
    )
  }
}
