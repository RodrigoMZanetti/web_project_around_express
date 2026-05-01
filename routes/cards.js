const fs = require('fs');
const router = require('express').Router();
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'cards.json');

router.get('/', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao ler arquivo' });
    }
    res.send(JSON.parse(data));
  });
});

module.exports = router;
