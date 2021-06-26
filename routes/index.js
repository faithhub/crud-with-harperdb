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
router.post('/create-link', validation('create'), controller.create)


/**
 * Get Route
 */
router.get('/get-link/:id', controller.get)

/**
 * Export Route
 */
module.exports = router