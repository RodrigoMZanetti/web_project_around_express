const users = require('../models/user.js');

const ERROR_CODE = 400;

const getUsers = (req, res) => {
  users
    .find()
    .then((users) => res.json(users))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).json({ message: 'Invalid data' });
      }
      res.status(500).json({ message: 'User does not exist' });
    });
};

const getUserById = (req, res) => {
  const { id } = req.params;

  users
    .findById(id)
    .orFail(() => {
      const error = new Error('No users were found with that ID');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).json({ message: 'Invalid id' });
      }
      if (err.statusCode === 404) {
        return res.status(404).json({ message: 'Not Found' });
      }
      res.status(500).json({ message: 'User does not exist' });
    });
};

const createUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  users
    .create({ name, about, avatar })
    .then((user) => res.json(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).json({ message: 'Invalid data' });
      }
      res.status(500).json({ message: 'Something went wrong' });
    });
};

const userPatchNameAndBody = (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;
  users
    .findByIdAndUpdate(id, { $set: { name, about } }, { new: true })
    .orFail(() => {
      const error = new Error('No users were found with that ID');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).json({ message: 'Invalid id' });
      }
      if (err.statusCode === 404) {
        return res.status(404).json({ message: 'Not Found' });
      }
      res.status(500).json({ message: 'User does not exist' });
    });
};

const userPatchAvatar = (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;
  users
    .findByIdAndUpdate(id, { $set: { avatar } }, { new: true })
    .orFail(() => {
      const error = new Error('No users were found with that ID');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).json({ message: 'Invalid id' });
      }
      if (err.statusCode === 404) {
        return res.status(404).json({ message: 'Not Found' });
      }
      res.status(500).json({ message: 'User does not exist' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUsers,
  userPatchNameAndBody,
  userPatchAvatar,
};
