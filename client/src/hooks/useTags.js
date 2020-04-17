import { useMemo, useState } from 'react'

export default function useTags(cards) {
  const [selectedTag, selectTag] = useState('all')

  const tags = useMemo(
    () =>
      Array.from(
        cards.reduce((prev, card) => {
          card.tags && card.tags.forEach(tag => prev.add(tag))
          return prev
        }, new Set())
      ),
    [cards]
  )

  const cardsByTag = useMemo(
    () =>
      selectedTag === 'all'
        ? cards
        : cards.filter(card => card.tags && card.tags.includes(selectedTag)),
    [cards, selectedTag]
  )

  return { tags, selectedTag, selectTag, cardsByTag }
}
