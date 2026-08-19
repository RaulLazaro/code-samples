import { useState } from 'react'
import DoubleSlider from '../DoubleSlider/DoubleSlider'
import FiltersStyles from './FiltersStyles'

export default function Filters(props) {
  const { filters, onChange } = props
  const [state, setState] = useState({})

  const onHandleChange = (key, value) => {
    setState((prevState) => {
      prevState[key] = value
      return prevState
    })
    onChange(state)
  }

  const renderfilters = filters.map((filter) => {
    switch (filter.type) {
      case 'select':
        return (
          <label key={filter.key}>
            {filter.label}
            <select
              onChange={(event) =>
                onHandleChange(filter.key, event.target.value)
              }>
              {filter.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        )
      case 'range':
        return (
          <DoubleSlider
            key={filter.key}
            label={filter.label}
            min={filter.min}
            max={filter.max}
            onChange={(min, max) =>
              onHandleChange(filter.key, { min: min, max: max })
            }></DoubleSlider>
        )
      default:
        return (
          <label key={filter.key}>
            {filter.label}
            <input
              type="text"
              onChange={(event) =>
                onHandleChange(filter.key, event.target.value)
              }
            />
          </label>
        )
    }
  })

  return <FiltersStyles>{renderfilters}</FiltersStyles>
}
