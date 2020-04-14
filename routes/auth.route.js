const express = require('express');

const controller = require('../controllers/auth.controller'); // Import callback function từ file user.controller

const router = express.Router();

router.get('/login', controller.login);

router.post('/login', controller.postLogin);

module.exports = router;