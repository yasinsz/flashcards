import React, { useState, useEffect } from 'react'
import { useSpring } from 'react-spring'
import styled from 'styled-components/macro'
import useHeight from './useHeight'
import Tag from './Tag'
import Answer from './Answer'
import Markdown from '../common/Markdown'

export default function Card({
  question,
  answer,
  isBookmarked,
  onBookmarkClick,
  setPractice,
  needsPractice,
  tags,
  forceIsAnswerVisible,
  showPracticeButtons,
}) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false)
  const { height, bind } = useHeight([showPracticeButtons, answer])
  const answerStyle = {
    ...useSpring({
      height: isAnswerVisible ? height : 0,
    }),
  }

  useEffect(() => {
    setIsAnswerVisible(
      forceIsAnswerVisible == null ? isAnswerVisible : forceIsAnswerVisible
    )
  }, [forceIsAnswerVisible, isAnswerVisible])

  return (
    <CardStyled onClick={toggleAnswer}>
      <BookmarkStyled
        onClick={handleBookmarkClick}
        active={isBookmarked}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      />
      <Markdown>{question}</Markdown>
      <Answer
        showPracticeButtons={showPracticeButtons}
        setPractice={setPractice}
        needsPractice={needsPractice}
        style={answerStyle}
        bind={bind}
        content={answer}
      />
      <ul css="padding: 0; margin: 0">
        {tags && tags.map(tag => <Tag key={tag} text={tag} />)}
      </ul>
    </CardStyled>
  )

  function toggleAnswer() {
    setIsAnswerVisible && setIsAnswerVisible(!isAnswerVisible)
  }

  function handleBookmarkClick(event) {
    event.stopPropagation()
    onBookmarkClick && onBookmarkClick()
  }
}

const BookmarkStyled = styled.button`
  height: 30px;
  padding: 0;
  outline: 0;
  background: transparent;
  border: 10px solid ${props => (props.active ? 'hotpink' : 'lightgray')};
  border-bottom-color: transparent;
  position: absolute;
  right: 20px;
  top: -5px;
`

const CardStyled = styled.section`
  cursor: default;
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 10px 10px #0002;
`
