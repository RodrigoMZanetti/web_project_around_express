const fs = require('fs');
const router = require('express').Router();
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'users.json');

router.get('/', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Erro ao ler arquivo' });
      return;
    }
    res.send(JSON.parse(data));
  });
});

router.get('/:id', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Erro ao ler arquivo' });
      return;
    }
    const users = JSON.parse(data);
    const user = users.find((u) => u._id === req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.send(user);
  });
});

module.exports = router;
