const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Sneaker } = require('../models/sneakers');

// => localhost:3000/sneakers/
router.get('/', (req, res) => {
    Sneaker.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retrieving Sneakers :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : ${req.params.id}');

    Sneaker.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Sneaker :' + JSON.stringify(err, undefined, 2));}
    });

});



router.post('/', (req,res) => {
    var sne = new Sneaker({
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
    });
    sne.save((err, doc) => {
        if (!err) { res. send(doc); }
        else { console.log('Error in Sneaker Save : ' + JSON.stringify(err, undefined, 2));}
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : ${req.params.id}');

    var sne = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    };
    Sneaker.findByIdAndUpdate(req.params.id, { $set: sne }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Sneaker Update :' + JSON.stringify(err, undefined, 2));}
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id : ${req.params.id}');

    Sneaker.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err){ res.send(doc);}
        else { console.log('Error in Sneaker Delete :' + JSON.stringify(err, undefined, 2));}
    });
});

module.exports = router;
