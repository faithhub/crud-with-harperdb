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

//Get One
router.get('/get', controller.getAll)

//Delete One
router.delete('/delete-one/:id', controller.deleteOne)

//Update
router.put('/update/:id', validation('update'), controller.update)

//Update Password
router.put('/update-password/:id', validation('password'), controller.updatePassword)


module.exports = router