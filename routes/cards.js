const router = require('express').Router();
const {
  getCards,
  createCards,
  deleteCards,
  updateCardsLikes,
  deleteCardsLikes,
} = require('../controllers/cards.js');

router.get('/', getCards);

router.post('/', createCards);

router.put('/:cardId/likes', updateCardsLikes);

router.delete('/:cardId/likes', deleteCardsLikes);

router.delete('/:id', deleteCards);

module.exports = router;
