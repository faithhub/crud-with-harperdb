const express = require('express');
const router = express.Router();
const controller = require('../controller/user');
const validation = require('../services/user');

//for body parser
router.use(express.urlencoded({ extended: false }));
router.use(express.json())


//Create
router.post('/create', validation('create'), controller.create)