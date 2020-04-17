import { produce } from 'immer'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import { getCards, patchCard, postCard } from './Card/services'
import Navigation from './common/Navigation'
import useTags from './hooks/useTags'
import BookmarkPage from './pages/BookmarkPage'
import CreatePage from './pages/CreatePage'
import HomePage from './pages/HomePage'
import PracticePage from './pages/PracticePage'

export default function App() {
  const [cards, setCards] = useState([])
  const { tags, selectTag, selectedTag, cardsByTag } = useTags(cards)

  useEffect(() => {
    getCards().then(setCards)
  }, [])

  return (
    <Router>
      <AppGrid>
        <Switch>
          <Route exact path="/">
            <HomePage
              tags={tags}
              selectedTag={selectedTag}
              cards={cardsByTag}
              onBookmarkClick={handleBookmarkClick}
              onSelectTag={selectTag}
              setPractice={setPractice}
            />
          </Route>
          <Route path="/bookmarks">
            <BookmarkPage
              tags={tags}
              selectedTag={selectedTag}
              cards={cardsByTag}
              onBookmarkClick={handleBookmarkClick}
              onSelectTag={selectTag}
              setPractice={setPractice}
            />
          </Route>
          <Route path="/practice">
            <PracticePage
              cards={cardsByTag}
              onBookmarkClick={handleBookmarkClick}
              setPractice={setPractice}
            ></PracticePage>
          </Route>
          <Route path="/create">
            <CreatePage title="Settings" onSubmit={createCard} />
          </Route>
        </Switch>
        <Navigation />
      </AppGrid>
    </Router>
  )

  function createCard(cardData) {
    postCard(cardData).then(card => {
      setCards([...cards, card])
    })
  }

  async function setPractice(card, needsPractice) {
    const newValue = card.needsPractice === needsPractice ? null : needsPractice
    const id = card._id
    const updatedCard = await patchCard(id, { needsPractice: newValue })
    setCards(
      produce(cards, draft => {
        const card = draft.find(card => card._id === id)
        card.needsPractice = updatedCard.needsPractice
      })
    )
  }

  async function handleBookmarkClick(card) {
    const updatedCard = await patchCard(card._id, {
      isBookmarked: card.isBookmarked ? null : true,
    })

    setCards(
      produce(cards, draft => {
        const card = draft.find(card => card._id === updatedCard._id)
        card.isBookmarked = updatedCard.isBookmarked
      })
    )
  }
}

const AppGrid = styled.div`
  display: grid;
  grid-template-rows: auto 48px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
`
