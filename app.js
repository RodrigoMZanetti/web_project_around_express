const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/aroundb');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6a010171efbacf6b6904c5ea',
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'A solicitação não foi encontrada' });
});

app.listen(PORT, () => {
  console.log(`PORT is running in PORT ${PORT}`);
});
