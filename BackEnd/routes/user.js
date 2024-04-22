const express = require('express');
const connection = require('../connection');
const router = express.Router();
require('dotenv').config();

router.post('/signup', (req, res) => {
    let user = req.body;
    query = "SELECT email, password, status FROM utilisateurs WHERE email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "INSERT INTO utilisateurs(nom, prenom, email, password, status) VALUES(?,?,?,?,'true')";
                connection.query(query, [user.nom, user.prenom, user.email, user.password], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: 'compte enregistré !' });
                    }
                    else {
                        return res.status(500).json(err);
                    }
                })
            }
            else {
                return res.status(400).json({ message: "Un compte avec cette adresse mail existe déjà." });
            }
        }
        else {
            return res.status(500).json(err);
        }
    });
});


router.post('/login', (req, res) => {
    const user = req.body;
    query = "SELECT email,password,status FROM utilisateurs WHERE email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].password != user.password) {
                return res.status(401).json({ message: "Utilisateur/Mot de passe incorrecte" });
            }
            else if (results[0].password === user.password) {
                const reponse = { email: results[0].email };
                return res.status(200).json({ message: "Connected" });
            }
            else {
                return res.status(400).json({ message: "une erreur est survenue." });
            }
        }
        else {
            return res.status(500).json(err);
        }
    });
});


module.exports = router;

