const router =  require('express').Router()
const User = require('../db').import('../models/user');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
    User.create({                   //left hand matches user model, right side match postman
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 13)
    })
        .then(
            createSuccess = (user) => {
                let token = jwt.sign({ id: user.id, email: user.email}, process.env.JWT_SECRET, {
                    expiresIn: 60*60*24 });
                res.json({
                    user: user,
                    message: 'user created!',
                    sessionToken: token
                })
            },
            createFail = err => res.send(500, err)
        )
})

router.post('/login', (req, res) => {
    User.findOne({
        where: {email: req.body.email}
    })
    .then(user => {
        if(user) {
            bcrypt.compare(req.body.password, user.password, (err, matches) => {
                if(matches) {
                    let token = jwt.sign({ id: user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: 60*60*24})

                    res.json({
                        user: user,
                        message: 'successfully authenticated user',
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({error: 'bad gateway. passwords don\'t match'})

                }
            })
        } else {
            res.status(500).send({error: 'failed to authenticate. no such user'})
        }
    }, err => res.status(501).send({error: 'failed to process'}))
})

module.exports = router;