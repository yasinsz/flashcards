import React from 'react'
import TagFilter from '../common/TagFilter'
import CardList from './CardList'
import PageLayout from './PageLayout'

export default function HomePage({
  tags,
  cards,
  onBookmarkClick,
  onSelectTag,
  selectedTag,
  setPractice,
}) {
  return (
    <PageLayout title="Home">
      <TagFilter tags={tags} selectedTag={selectedTag} onClick={onSelectTag} />
      {cards.length ? (
        <CardList
          selectedTag={selectedTag}
          cards={cards}
          onBookmarkClick={onBookmarkClick}
          setPractice={setPractice}
        />
      ) : (
        <small style={{ margin: '40px auto' }}>
          How about <a href="/create">creating some cards?</a>
        </small>
      )}
    </PageLayout>
  )
}
