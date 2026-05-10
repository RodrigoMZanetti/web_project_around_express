const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUsers,
} = require('../controllers/users.js');

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', createUsers);

module.exports = router;
