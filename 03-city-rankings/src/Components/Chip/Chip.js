import styled from 'styled-components'

const ChipStyles = styled.span`
  & {
    color: white;
    padding: 0.25rem 0.3rem;
    border-radius: 0.25rem;

    &.target {
      background-color: #5ba7c8;
    }
    &.good {
      background-color: #a8e05f;
    }
    &.moderate {
      background-color: #fdd74b;
    }
    &.unhealthySensitive {
      background-color: #fe9b57;
    }
    &.unhealthy {
      background-color: #fe6a69;
    }
    &.veryUnhealthy {
      background-color: #a97abc;
    }
    &.hazardous {
      background-color: #a87383;
    }
  }
`

export default function Chip(props) {
  const { value } = props

  const className = () => {
    switch (true) {
      case value <= 10:
        return 'target'
      case value <= 12:
        return 'good'
      case value <= 35.4:
        return 'moderate'
      case value <= 55.4:
        return 'unhealthySensitive'
      case value <= 150.4:
        return 'unhealthy'
      case value <= 250.4:
        return 'veryUnhealthy'
      default:
        return 'hazardous'
    }
  }

  return <ChipStyles className={className()}>{value}</ChipStyles>
}
