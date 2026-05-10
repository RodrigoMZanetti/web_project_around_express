const router = require('express').Router();
const users = require('../models/user.js');

router.get('/', (req, res) => {
  users
    .find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ message: 'User does not exist' }));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  users
    .findById(id)
    .then((user) => {
      if (user === null) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    })
    .catch((err) => res.status(500).json({ message: 'User does not exist' }));
});

router.post('/', (req, res) => {
  const { name, about, avatar } = req.body;
  users
    .create({ name, about, avatar })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json({ message: 'Something went wrong' }));
});

module.exports = router;
