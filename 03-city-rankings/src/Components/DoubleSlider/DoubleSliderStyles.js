import styled from 'styled-components'

const DoubleSliderStyles = styled.label`
  & {
    flex-grow: 2;

    div {
      position: relative;
      margin-top: 1rem;
      height: 1.5rem;

      input {
        appearance: none;
        padding: 0 !important;
        width: 100%;
        outline: none;
        position: absolute;
        margin: auto !important;
        top: 0;
        bottom: 0;
        height: auto !important;
        background-color: transparent;
        pointer-events: none;
      }

      input::-webkit-slider-thumb {
        appearance: none;
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
        background-color: white;
        pointer-events: auto;
        cursor: pointer;
      }

      input::-moz-range-thumb {
        appearance: none;
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
        background-color: white;
        pointer-events: auto;
        cursor: pointer;
      }

      input::-ms-thumb {
        appearance: none;
        width: 1rem;
        height: 1rem;
        border-radius: 100%;
        background-color: white;
        pointer-events: auto;
        cursor: pointer;
      }

      .slider {
        width: 100%;
        height: 0.25rem;
        background: linear-gradient(
          to right,
          lightgrey 0% ${(props) => props.percent1}%,
          white ${(props) => props.percent1}% ${(props) => props.percent2}%,
          lightgrey ${(props) => props.percent2}% 100%
        );
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        border-radius: 0.25rem;
      }
    }
  }
`

export default DoubleSliderStyles
