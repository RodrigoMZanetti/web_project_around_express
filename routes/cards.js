const fs = require('fs');
const router = require('express').Router();
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'cards.json');
const cards = JSON.parse(fs.readFileSync(filePath, 'utf8'));

router.get('/', (req, res) => {
  res.send(cards);
});

module.exports = router;
