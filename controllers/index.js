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
 * Six Unique Alphanumeric ID
 */
function randomString() {
    var length = 8;
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

/**
 * 
 * Create One
 */
exports.create = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            message: "validation error",
            error: errors.mapped()
        })
    } else {
        try {
            var shortedLink = randomString();
            db.insert({
                    table: TABLE,
                    records: [{
                        originalLink: req.body.link,
                        shortedLink: shortedLink
                    }, ],
                })
                .then(result => {
                    res.status(200).json({
                        message: "Link Created successfully",
                        response: {
                            originalLink: req.body.link,
                            shortedLink: shortedLink
                        }
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

/**
 * 
 * Get One
 */
exports.get = async(req, res) => {
    try {
        const QUERY = `SELECT * FROM ${SCHEMA}.${TABLE} WHERE shortedLink="${req.params.id}"`;
        db.query(QUERY)
            .then(result => {
                console.log(result.data);
                if (result.data != '') {
                    res.status(200).json({
                        message: "Fetched Successful",
                        response: result
                    });
                } else {
                    res.status(200).json({
                        message: "No record found for the id given",
                        response: result
                    });
                }
            })
            .catch(error => {
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
};