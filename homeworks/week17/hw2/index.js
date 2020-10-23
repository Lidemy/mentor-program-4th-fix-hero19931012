/* eslint-disable import/no-unresolved */
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

// set controller
const priceController = require('./controller/controller');

const app = express();
const port = process.env.PORT || 5001;

app.set('views', 'views'); // setting views directory
app.set('view engine', 'ejs'); // setting template engine

// middlewares
// css static directory
app.use('/styles', express.static(`${__dirname}/styles`));
app.use('/scripts', express.static(`${__dirname}/scripts`));
app.use('/assets', express.static(`${__dirname}/assets`));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());
app.use((req, res, next) => {
  // 設定 global 可存取的物件
  res.locals.username = req.session.username;
  res.locals.errorMsg = req.flash('errorMsg');
  next();
});

// 設定路由
function redirectBack(req, res) {
  res.redirect('back');
}

app.get('/', priceController.index);
app.get('/add', priceController.add);
app.post('/add', priceController.handleAdd, redirectBack);
app.get('/lottery', priceController.lottery);
app.get('/lotteryPage', priceController.lotteryPage);
app.get('/edit/:id', priceController.edit);
app.post('/edit/:id', priceController.update, redirectBack);
app.get('/delete/:id', priceController.delete);

app.listen(port, () => {
  console.log(`Listening on port:${port}!`);
});
