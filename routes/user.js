const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');
const validation = require('../services/user');

//for body parser
router.use(express.urlencoded({ extended: false }));
router.use(express.json())


//Create
router.post('/create', validation('create'), controller.create)

//Get One
router.get('/get-one/:id', controller.getOne)


module.exports = router