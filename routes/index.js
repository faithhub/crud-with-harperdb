const express = require('express');
const router = express.Router();
const controller = require('../controllers/index');
const validation = require('../services/index');


/**
 * For body parser
 */
router.use(express.urlencoded({ extended: false }));
router.use(express.json())


/**
 * Create Route
 */
router.post('/create', validation('create'), controller.create)