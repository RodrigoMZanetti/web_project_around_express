const cards = require('../models/card.js');

const ERROR_CODE = 400;

const getCards = (req, res) => {
  cards
    .find()
    .then((cards) => res.json(cards))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).json({ message: 'Invalid' });
      }
      res.status(500).json({ message: 'Cards not found' });
    });
};

const createCards = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  cards
    .create({ name, link, owner })
    .then((card) => res.json(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).json({ message: 'Invalid' });
      }
      res.status(500).json({ message: 'Card not found' });
    });
};

const deleteCards = (req, res) => {
  const { id } = req.params;
  cards
    .findByIdAndDelete(id)
    .orFail(() => {
      const error = new Error('No cards were found with that ID');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.json(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).json({ message: 'Invalid' });
      }
      if (err.statusCode === 404) {
        return res.status(404).json({ message: 'Not Found' });
      }
      res.status(500).json({ message: 'Something went wrong' });
    });
};

const updateCardsLikes = (req, res) => {
  const { cardId } = req.params;

  cards
    .findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => {
      const error = new Error('No cards were found with that ID');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.json(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).json({ message: 'Invalid' });
      }
      if (err.statusCode === 404) {
        return res.status(404).json({ message: 'Not Found' });
      }
      res.status(500).json({ message: 'Something went wrong' });
    });
};

const deleteCardsLikes = (req, res) => {
  const { cardId } = req.params;

  cards
    .findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => {
      const error = new Error('No cards were found with that ID');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.json(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).json({ message: 'Invalid' });
      }
      if (err.statusCode === 404) {
        return res.status(404).json({ message: 'Not Found' });
      }
      res.status(500).json({ message: 'Something went wrong' });
    });
};

module.exports = {
  getCards,
  createCards,
  deleteCards,
  updateCardsLikes,
  deleteCardsLikes,
};
