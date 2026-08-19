import { useState } from 'react'
import DoubleSliderStyles from './DoubleSliderStyles'

export default function DoubleSlider(props) {
  const { label, min, max, onChange } = props
  const [state, setState] = useState({ min: min, max: max })
  const [sliders, setSliders] = useState({ slider1: 'min', slider2: 'max' })

  function handleOnChange(value, slider) {
    let newMin, newMax
    if (slider === 'min') {
      newMin = Number(value)
      newMax = state.max
    } else {
      newMin = state.min
      newMax = Number(value)
    }

    if (newMin > newMax) {
      const tmp = newMax
      newMax = newMin
      newMin = tmp

      setSliders((prevSliders) => {
        return { slider1: prevSliders.slider2, slider2: prevSliders.slider1 }
      })
    }

    setState({ min: newMin, max: newMax })

    onChange(newMin, newMax)
  }

  return (
    <DoubleSliderStyles
      percent1={(state.min / max) * 100}
      percent2={(state.max / max) * 100}>
      {label}: {state.min} - {state.max}
      <div>
        <div className="slider"></div>
        <input
          type="range"
          min={min}
          max={max}
          value={state.min}
          onChange={(event) =>
            handleOnChange(event.target.value, sliders.slider1)
          }></input>
        <input
          type="range"
          min={min}
          max={max}
          value={state.max}
          onChange={(event) =>
            handleOnChange(event.target.value, sliders.slider2)
          }></input>
      </div>
    </DoubleSliderStyles>
  )
}
