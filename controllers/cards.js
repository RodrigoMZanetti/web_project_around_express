const cards = require('../models/card.js');

const getCards = (req, res) => {
  cards
    .find()
    .then((cards) => res.json(cards))
    .catch((err) => res.status(500).json({ message: 'Cards not found' }));
};

const createCards = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  cards
    .create({ name, link, owner })
    .then((card) => res.json(card))
    .catch((err) => res.status(500).json({ message: 'Card not found' }));
};

const deleteCards = (req, res) => {
  const { id } = req.params;
  cards
    .findByIdAndDelete(id)
    .then((card) => {
      if (card === null) {
        return res.status(400).json({ message: 'Card not found' });
      }
      res.json(card);
    })
    .catch((err) => res.status(500).json({ message: 'Something went wrong' }));
};

module.exports = { getCards, createCards, deleteCards };
