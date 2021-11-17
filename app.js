const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/user.route');
const connection = require('./helpers/init_postgres');

const app = express();
app.use(express.static('public'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.set('views','./views');
app.set('view engine','ejs');

// app.get('/', async (req, res, next) => {
//   res.render('index')
// });

app.use('/', userRouter);

app.use((req, res, next) => {
  next(new Error('Does\nt exists'));
});

// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

connection
  .sync({alter:true})
  .catch((err) => console.log(err));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
