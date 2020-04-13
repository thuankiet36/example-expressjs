const express = require('express');

const controller = require('../controllers/user.controller'); // Import callback function từ file user.controller

const router = express.Router();

router.get('/', controller.index); // controller.index = module.exports.index bên user.controller

router.get('/search', controller.search); 

router.get('/create', controller.create); 

router.get('/:id', controller.get);

router.post('/create', controller.postCreate);

module.exports = router;