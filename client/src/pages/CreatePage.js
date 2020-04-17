import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Page from './PageLayout'
import Card from '../Card/Card'

export default function CreatePage({ onSubmit, title }) {
  const [card, setCard] = useState({})
  const hasCardContent = !!Object.values(card).join('').length

  return (
    <Page title={title}>
      <FormStyled onSubmit={handleSubmit} onChange={handleChange}>
        <LabelStyled>
          Question
          <textarea
            autoFocus
            name="question"
            placeholder="What's the question?"
          />
        </LabelStyled>
        <LabelStyled>
          <div>
            Answer <small>(Markdown)</small>
          </div>
          <textarea
            name="answer"
            placeholder="What's the answer? Use Markdown here."
          />
        </LabelStyled>
        <LabelStyled>
          Tags
          <input name="tags" />
        </LabelStyled>
        {hasCardContent && (
          <Card
            {...card}
            forceIsAnswerVisible={card.answer.length}
            showPracticeButtons={false}
          />
        )}
        <ButtonStyled>Create card</ButtonStyled>
      </FormStyled>
    </Page>
  )

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    onSubmit(card)
    form.reset()
    setCard({})
    form[0] && form[0].focus()
  }

  function handleChange(event) {
    const form = event.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    data.tags = Array.from(
      new Set(
        data.tags
          .split(',')
          .map(t => t.trim())
          .filter(t => t.length)
          .sort()
      )
    )
    setCard(data)
  }
}

const FormStyled = styled.form`
  display: grid;
  gap: 20px;
  padding: 20px;
`

const LabelStyled = styled.label`
  display: grid;
  gap: 10px;
`

const ButtonStyled = styled.button`
  border: none;
  border-radius: 3px;
  padding: 10px;
  background: hotpink;
  color: white;
`
