const client = require('../util/database');

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
        console.log('createOne: [POST] /users/');
        try {
            const user = await client.insert({
                table: TABLE,
                records: [{
                    username: req.body.username,
                    password: req.body.password,
                    followers: req.body.followers,
                }, ],
            });
            res.json(user);
        } catch (error) {
            res.json(error);
        }
    }
};