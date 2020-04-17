import mongoose from 'mongoose'

const Card = mongoose.model('Card', {
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  isBookmarked: Boolean,
  needsPractice: Boolean,
  tags: {
    set: tags =>
      tags
        .map(t => t.trim())
        .filter(t => t.length)
        .sort(),
    type: [String],
    default: [],
  },
})

export default Card
