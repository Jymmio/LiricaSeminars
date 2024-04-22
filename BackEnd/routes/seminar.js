const express = require('express');
const connection = require('../connection');
const router = express.Router();
require('dotenv').config();

router.get('/get/year-:annee', (req, res) => {
    const annee = req.params.annee;
    var query = "SELECT title, DATE_FORMAT(date, '%d/%m/%Y %kh%i') as newdate, place, content, orateur AS orator FROM seminaires WHERE YEAR(date) = " + annee + " ORDER BY date DESC";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json({ err });
        }
    });
});

router.get('/get', (req, res) => {
    const data = req.query; 
    let query = "SELECT title, DATE_FORMAT(date, '%d/%m/%Y %kh%i') AS newdate, place, content, orateur AS orator FROM seminaires WHERE ";
    const conditions = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        conditions.push(key + " LIKE \"%" + data[key] + "%\"");
      }
    }
    query += conditions.join(" AND ");
    query += " ORDER BY date DESC";
    console.log(query);
  
    connection.query(query, (err, results) => {
      if (!err) {
        return res.status(200).json(results);
      } else {
        return res.status(500).json({ err });
      }
    });
  });

router.get('/get/title-:title', (req, res) => {
    const title = req.params.title;
    var query = "SELECT title, DATE_FORMAT(date, '%d/%m/%Y %kh%i') AS newdate, place, content FROM seminaires WHERE title LIKE ? ORDER BY date DESC";
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
