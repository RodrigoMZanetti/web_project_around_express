const fs = require('fs');
const router = require('express').Router();
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'users.json');

function readUsersFile(res, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Erro ao ler arquivo' });
    callback(JSON.parse(data));
  });
}

router.get('/', (req, res) => {
  readUsersFile(res, (users) => {
    res.json(users);
  });
});

router.get('/:id', (req, res) => {
  readUsersFile(res, (users) => {
    const user = users.find((user) => user._id === req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.send(user);
  });
});

module.exports = router;
