const db = require('../util/database');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * USER CONTROLLERS
 */
const SCHEMA = process.env.INSTANCE_SCHEMA;
const TABLE = 'users';

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
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    if (err) {
                        res.status(403).json({
                            message: "An error occur",
                            response: err
                        })
                    } else {
                        db.insert({
                                table: TABLE,
                                records: [{
                                    username: req.body.username,
                                    password: { salt: salt, hash: hash },
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
                    }
                });
            });
        } catch (error) {
            res.status(422).json({
                message: "An error occur",
                response: error
            });
        }
    }
};

//GET ONE
exports.getOne = async(req, res) => {
    try {
        const QUERY = `SELECT * FROM ${SCHEMA}.${TABLE} WHERE id="${req.params.id}"`;
        db.query(QUERY)
            .then(result => {
                res.status(200).json({
                    message: "Fetched Successful",
                    response: result
                });
            })
            .catch(error => {
                res.status(422).json({
                    message: "An error occur",
                    response: error
                });
            })
    } catch (error) {

    }
}


//GET ALL
exports.getAll = async(req, res) => {
    try {
        const QUERY = `SELECT * FROM ${SCHEMA}.${TABLE}`
        db.query(QUERY)
            .then(result => {
                res.status(200).json({
                    message: "All Users",
                    response: result
                });
            })
            .catch(error => {
                res.status(422).json({
                    message: "An error occur",
                    response: error
                });
            })
    } catch (error) {

    }
}