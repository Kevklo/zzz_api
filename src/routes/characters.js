const express = require('express');
const router = express.Router();
const {
  getAllCharacters,
  getCharacterByName,
  getCharactersByAttribute
} = require('../controllers/characterController');

router.get('/', getAllCharacters);
router.get('/name/:name', getCharacterByName);
router.get('/attribute/:attribute', getCharactersByAttribute);

module.exports = router;