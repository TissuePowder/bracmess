const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const date = require('date-and-time');
//const fs = require('fs');
const flash = require('connect-flash');
const locals = require('./middlewares/locals');

const db = require('./config/database');
const Meals = require('./models/meals');
const meals_default = require('./config/meals_default.json');

db.authenticate()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(`Error: ${err}`));

const indexRouter = require('./routes/index');
const mealsRouter = require('./routes/meals');
const healthRouter = require('./routes/health');

require('dotenv').config();

const app = express();
app.enable("trust proxy");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const logFormat = [
  ':remote-addr',
  '-',
  ':remote-user',
  '[:date[web]]',
  '":method :url HTTP/:http-version"',
  ':status',
  ':res[content-length]',
  ':referrer',
  '":user-agent"',
  '-',
  ':response-time ms'
]

app.use(logger(logFormat.join(' ')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
app.use('/health', healthRouter);

setInterval(() => {
  delete require.cache[require.resolve('./config/meals_default.json')];
  let names_total = meals_default.map(meal => meal.name);

  Meals.findAll({
    where: {
      date: date.format(new Date, 'YYYY-MM-DD')
    }
  })
    .then(meals => {
      let names_listed = meals.map(meal => meal.name);
      console.log(names_listed);
      for (let i = 0; i < names_total.length; ++i) {
        if (!names_listed.includes(meals_default[i].name)) {
          Meals.create(
            {
              date: date.format(new Date, 'YYYY-MM-DD'),
              name: meals_default[i].name,
              meal_half: meals_default[i].meal_half,
              meal_1: meals_default[i].meal_1,
              meal_2: meals_default[i].meal_2,
            }
          ).catch(err => console.log(err));
        }
      }
    }).catch(err => {
      console.log(err);
    });

}, 3600000);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
