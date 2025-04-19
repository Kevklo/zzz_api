const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowsMs: 15 * 60 * 1000,
  max: 100,
})

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/characters', require('./routes/characters'));
app.use('/items', require('./routes/items'));
app.use('/static', express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.send('zzz_api');
});

module.exports = app;