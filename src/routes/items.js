const express = require('express')
const router = express.Router();
const {
  getAllItems,
  getItemByName
} = require('../controllers/itemController')

router.get('/', getAllItems);
router.get('/:name', getItemByName);

module.exports = router;