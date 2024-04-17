const express = require('express');
const connection = require('../connection');
const router = express.Router();
require('dotenv').config();

router.get('/get', (req, res) => {
    var query = "select * from seminaires";
    connection.query(query, (err,results) => {
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json({err});
        }
    });
});

router.post('/add', (req, res) => {
    const seminar = req.body;
    const query = "INSERT INTO seminaires(title,date,place,content) VALUES(?,?,?,?)";
    connection.query(query,[seminar.title, seminar.date, seminar.place, seminar.content],(err,results) => {
        if(!err){
            res.status(200).json({message: "Seminaire ajouté sans erreurs."});
        }
        else{
            return res.status(500).json(err);
        }
    });
});

module.exports = router;
