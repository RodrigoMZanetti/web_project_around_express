const router = require('express').Router();
const {
  getCards,
  createCards,
  deleteCards,
} = require('../controllers/cards.js');

router.get('/', getCards);

router.post('/', createCards);

router.delete('/:id', deleteCards);

module.exports = router;
