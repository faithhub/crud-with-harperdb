const db = require('../util/database');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * LINK CONTROLLERS
 */
const SCHEMA = process.env.INSTANCE_SCHEMA;
const TABLE = 'links';
/**
 * 
  Six Unique Alphanumeric ID
 */
function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
var rString = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');


//CREATE-ONE
exports.create = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            message: "validation error",
            error: errors.mapped()
        })
    } else {
        try {
            db.insert({
                    table: TABLE,
                    records: [{
                        username: req.body.username,
                        email: req.body.email,
                    }, ],
                })
                .then(result => {
                    res.status(200).json({
                        message: "Registered successfully",
                        response: result
                    });
                })
                .catch(error => {
                    console.log(error)
                    res.status(422).json({
                        message: "An error occur",
                        response: error
                    });
                })
        } catch (error) {
            res.status(422).json({
                message: "An error occur",
                response: error
            });
        }
    }
};