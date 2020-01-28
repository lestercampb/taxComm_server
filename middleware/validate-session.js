const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');

const validateSession = (req, res, next) => { //function validates whether we can perform an action

    if(req.method == 'OPTIONS'){
        next()
    } else {
    const token = req.headers.authorization; //getting token from authorization header

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(!err && decoded) {
            User.findOne({ //provides user info in the promise
                where: { id: decoded.id }
            }, //console.log(decoded))

            ).then(user => {
                if(!user) throw err

                req.user = user;
                //console.log('req.user: ', req.user);

                return next(); //this stops function from running 
            })
            .catch(err => next(err))
        } else {
            req.errors = err;
            return res.status(500).send('Not authorized.');
        }
    })
}}

module.exports = validateSession; //exporting only the function itself