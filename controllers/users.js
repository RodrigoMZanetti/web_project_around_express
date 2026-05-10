const users = require('../models/user.js');

const getUsers = (req, res) => {
  users
    .find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ message: 'User does not exist' }));
};

const getUserById = (req, res) => {
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
};

const createUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  users
    .create({ name, about, avatar })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json({ message: 'Something went wrong' }));
};

module.exports = { getUsers, getUserById, createUsers };
