import React from 'react'
import styled from 'styled-components/macro'

export default function Feedback({ setPractice, needsPractice }) {
  function withClickHandler(needsPractice) {
    return event => {
      event.stopPropagation()
      setPractice(needsPractice)
    }
  }

  return (
    <Row>
      Needs practice:
      <Link selected={needsPractice === true} onClick={withClickHandler(true)}>
        Yes
      </Link>
      <Link
        selected={needsPractice === false}
        onClick={withClickHandler(false)}
      >
        No
      </Link>
      <Link onClick={withClickHandler(null)}>Reset</Link>
    </Row>
  )
}

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px dashed #ddd;
  padding-top: 20px;
`

const Link = styled.span`
  border-radius: 4px;
  padding: 1px 6px;
  background: #ddd;
  border: 1px solid #ccc;
  color: ${p => (p.selected ? 'hotpink' : '#555')};
`
