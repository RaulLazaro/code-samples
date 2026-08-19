import styled from 'styled-components'

const ProgressStyles = styled.div`
  & {
    width: 100%;
    height: 24px;
    border-radius: 16px;
    background-color: var(--success-light);
    margin-bottom: 1rem;

    .value {
      background-color: var(--success);
      border-radius: 16px;
      height: 100%;
      width: ${(props) => props.width}%;
      font-size: 1rem;
      text-align: end;
      display: flex;
      box-sizing: border-box;
      align-items: center;
      justify-content: end;
      padding-right: 1rem;
      min-width: 3rem;
      color: var(--success-light);
    }
  }
`

export default function Progress(props) {
  const { value } = props

  return (
    <ProgressStyles width={value}>
      <span className="value">{value}%</span>
    </ProgressStyles>
  )
}
