const express = require('express');
const app = express();
const morgan = require('morgan');
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost:3306', 
  user:'root', 
  password: 'aH4jK?21AZbX',
  connectionLimit: 100
});

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('combined'));
app.use(express.urlencoded({extended: false}))
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('iMan server is ready')
})

// starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});