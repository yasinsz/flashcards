import React from 'react'
import styled from 'styled-components/macro'
import Card from '../Card/Card'
import PropTypes from 'prop-types'

CardList.propTypes = {
  cards: PropTypes.array.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
  onChangeNeedsPractice: PropTypes.func.isRequired,
}

export default function CardList({
  cards,
  onBookmarkClick,
  setPractice,
  autoScroll = true,
}) {
  return (
    <Scroller autoScroll={autoScroll}>
      {cards.map(card => (
        <Card
          setPractice={needsPractice => setPractice(card, needsPractice)}
          needsPractice={card.needsPractice}
          key={card._id}
          onBookmarkClick={() => onBookmarkClick(card)}
          showPracticeButtons={true}
          {...card}
        />
      ))}
    </Scroller>
  )
}

const Scroller = styled.div`
  display: grid;
  gap: 20px;
  overflow-y: ${props => (props.autoScroll ? 'auto' : 'visible')};
  scroll-behavior: smooth;
  padding: 20px 10px;
`
