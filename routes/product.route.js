const express = require('express');

const controller = require('../controllers/product.controller'); // Import callback function từ file user.controller

const router = express.Router();

router.get('/', controller.index);

module.exports = router;