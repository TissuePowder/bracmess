require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const date = require('date-and-time');
const flash = require('connect-flash');
const locals = require('./middlewares/locals');
const errorController = require('./controllers/error');

const knex = require('./db/knex');

knex.raw('select 1')
  .then(() => console.log('Database connected!'))
  .catch(() => console.error('Database connection error!'));

const indexRouter = require('./routes/index');
const mealsRouter = require('./routes/meals');
const tenantsRouter = require('./routes/tenants');
const healthRouter = require('./routes/health');


const app = express();
app.enable("trust proxy");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('json spaces', 2);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('combined', {
  skip: (req, res) => req.originalUrl === '/health'? true : false
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized:true,
  cookie: { maxAge: 60*60*1000 },
  resave: false
}));


app.use(flash());
app.use(locals);

app.use('/', indexRouter);
app.use('/meals', mealsRouter);
app.use('/tenants', tenantsRouter);
app.use('/health', healthRouter);


app.use(errorController.errorHandler);

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Listening on address ${host}:${port}`);
});
