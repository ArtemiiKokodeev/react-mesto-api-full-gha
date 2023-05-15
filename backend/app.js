const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { createUserJoiValidation, loginJoiValidation } = require('./middlewares/userJoiValidation');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorhandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const DataNotFoundError = require('./errors/DataNotFoundError');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const { PORT, DB_ADDRESS } = require('./config');

mongoose.set('strictQuery', false);

const options = {
  origin: [
    'http://localhost:3000',
    'https://instagram-killer.nomoredomains.monster',
    'https://artemiikokodeev.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
};

mongoose.connect(DB_ADDRESS);

const app = express();

app.use('*', cors(options));
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginJoiValidation, login);
app.post('/signup', createUserJoiValidation, createUser);
app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.use(errorLogger);
app.use(errors());
app.use((req, res, next) => next(new DataNotFoundError('Данной страницы не существует')));
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // console.log(`App listening on port ${PORT}`);
});
