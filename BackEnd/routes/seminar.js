const express = require('express');
const connection = require('../connection');
const router = express.Router();
require('dotenv').config();


router.patch('/update', (req, res) => {
  let newSeminar = req.body;
  let isChange=false;
  query = "UPDATE seminaires SET ";
  const newInfos = [];
    for (const key in newSeminar) {
        if (newSeminar.hasOwnProperty(key) && key!=="id") {
          newInfos.push(key + "=\"" + newSeminar[key] + "\"");
          isChange = true;
        }
    }
    query+=newInfos.join(" , ");
    query += " WHERE id=" + newSeminar.id;
    if(isChange){
      console.log(query);
      connection.query(query, (err, results) => {
          if(!err){
              if (results.affectedRows === 0) {
                  return res.status(400).json({message: "aucun changement n'a été effectué"});
              }
              else {
                  return res.status(200).json({message: "update complete"});
              }
          }
          else{
              res.status(500).json({message: "une erreur est survenue"});
          }
      });
  }
  else{
      res.status(400).json({message: "aucun changement effectué"});
  }
});
router.delete('/delete', (req, res) => {
  let seminar = req.query;
  console.log(seminar);
  var query = "DELETE FROM seminaires WHERE (";
  const conditions = [];
  for(const key in seminar){
    if(seminar.hasOwnProperty(key)){
      conditions.push(key +  "=\"" + seminar[key] + "\"");
    }
  }
  query+=conditions.join(" AND ");
  query+=")";
  console.log(query);
  connection.query(query, (err, results) => {
    if(!err){
      if(results.affectedRows >= 0){
        return res.status(200).json({message: "séminaire supprimé"});
      }
      else{
        return res.status(404).json({message: "le séminaire n'a pas été trouvé"});
      }
    }
    else{
      res.status(500).json({err});
    }
  })
});
router.get('/get/year-:annee', (req, res) => {
    const annee = req.params.annee;
    var query = "SELECT id,title, DATE_FORMAT(date, '%d/%m/%Y %kh%i') as newdate, place, langue, content, orateur AS orator FROM seminaires WHERE YEAR(date) = " + annee + " ORDER BY date DESC";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json({ err });
        }
    });
});
router.get('/getall', (req, res) => {
  let query = "SELECT id, title, DATE_FORMAT(date, '%d/%m/%Y %kh%i') AS newdate, place, langue, content, orateur as orator FROM seminaires ORDER BY date DESC";
  connection.query(query, (err, results) => {
    if(!err){
      return res.status(200).json(results);
    }
    else{
      res.status(500).json({err});
    }
  }) 
})
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
