const router = require('express').Router();
const Comm = require('../db').import('../models/comm');
const validateSession = require('../middleware/validate-session');

router.post('/', validateSession, (req,res) => {
    const commFromRequest = {
        form: req.body.form,
        schedule: req.body.schedule,
        line: req.body.line,
        comment: req.body.comment,
        owner: req.user.email,
    };

    Comm.create(commFromRequest)
        .then(result => res.status(200).json(result))
        .catch(err => res.json(req.errors));
});

router.get('/', validateSession, (req,res) => {
    Comm.findAll({ where: {owner: req.user.email}})
        .then(result => res.status(200).json(result))
        .catch(err => res.json(req.errors));

});

router.get('/form/:form', validateSession, (req,res) => {
    Comm.findAll( {where: {owner: req.user.email, form: req.params.form}})
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(req.errors));
});

//Get individual log by id for individual user 
router.get('/:id', validateSession, (req, res) => {
  
        Comm.findOne({
            where: {id : req.params.id, owner: req.user.email}
        }).then(
            function findOneSuccess(data) {
                res.json(data);
            },
            function findOneError(err) {
                res.send(500, err.message);
            }
        );
});

router.put('/:id', validateSession, (req,res) => {
    Comm.update( req.body, {where: {id: req.params.id}})
    .then(comm => res.status(200).json(comm))
    .catch(err => res.json(req.errors))
});

router.delete('/:id', validateSession, (req,res) => {
  
      Comm.destroy({
            where: { id: req.params.id,
            owner: req.user.email }
        }).then(
            function deleteLogSuccess(data){
                res.send("you removed a log");
            },
            function deleteLogError(err){
                res.send(500, err.message)
            }
        );
});



module.exports = router;