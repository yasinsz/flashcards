import { Router } from 'express'
import Card from '../models/Card'

const router = Router()

router.get('/', (req, res, next) => {
  Card.find()
    .then(cards => res.json(cards))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Card.findById(req.params.id)
    .then(card => (card ? res.json(card) : res.sendStatus(404)))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Card.create(req.body)
    .then(card => res.status(201).json(card))
    .catch(next)
})

router.patch('/:id', (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(card => (card ? res.json(card) : res.sendStatus(404)))
    .catch(next)
})

router.delete('/all', (req, res, next) => {
  Card.deleteMany()
    .then(() => res.sendStatus(200))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Card.findByIdAndDelete(req.params.id)
    .then(card => (card ? res.json(card) : res.sendStatus(404)))
    .catch(next)
})
i
export default router
