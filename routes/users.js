const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUsers,
  userPatchNameAndBody,
  userPatchAvatar,
} = require('../controllers/users.js');

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', createUsers);

router.patch('/me', userPatchNameAndBody);

router.patch('/me/avatar', userPatchAvatar);
module.exports = router;
