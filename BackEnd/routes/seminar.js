const express = require('express');
const connection = require('../connection');
const router = express.Router();
require('dotenv').config();

router.get('/get/year-:annee', (req, res) => {
    const annee = req.params.annee;
    var query = "SELECT title, DATE_FORMAT(date, '%d/%m/%Y %kh%i') AS date, place, content FROM seminaires WHERE YEAR(date) = " + annee;
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json({ err });
        }
    });
});
router.get('/get/title-:title', (req, res) => {
    const title = req.params.title;
    var query = "SELECT title, DATE_FORMAT(date, '%d/%m/%Y %kh%i') AS date, place, content FROM seminaires WHERE title LIKE ?";
    connection.query(query, ['%'+title+'%'], (err, results) => {
      if (!err) {
        return res.status(200).json(results);
      } else {
        return res.status(500).json({ err });
      }
    });
  });
router.post('/add', (req, res) => {
    const seminar = req.body;
    console.log(req.body);
    const query = "INSERT INTO seminaires(title,date,place,content,orateur,langue) VALUES(?,?,?,?,?,?)";
    connection.query(query, [seminar.title, seminar.date, seminar.place, seminar.content, seminar.orator, seminar.language], (err, results) => {
        if (!err) {
            res.status(200).json({ message: "Seminaire ajouté sans erreurs." });
        }
        else {
            return res.status(500).json({ err });
        }
    });
});

module.exports = router;
