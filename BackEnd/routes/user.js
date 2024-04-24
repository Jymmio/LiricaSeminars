const express = require('express');
const connection = require('../connection');
const router = express.Router();
require('dotenv').config();


router.patch('/update-user', (req, res) => {
    let user = req.body;
    let isChange = false;
    query = "UPDATE utilisateurs SET ";
    const newInfos = [];
    for (const key in user) {
        if (user.hasOwnProperty(key) && key!=="id") {
          newInfos.push(key + "=\"" + user[key] + "\"");
          isChange = true;
        }
    }
    query+=newInfos.join(" , ");
    query += " WHERE id=" + user.id;
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

router.get('/get-users', (req, res) => {
    query="SELECT id, nom, prenom, email, status, role FROM utilisateurs";
    connection.query(query, (err, result) => {
        if(!err){
            if(result.length <= 0){
                return res.status(404).json({message: "Aucun utilisateur trouvé"});
            }
            else{
                return res.status(200).json(result);
            }
        }
        else{
            return res.status(500).json(err);
        }
    });
})

router.patch('/change-role', (req, res) => {
    let user = req.body;
    query = "UPDATE utilisateurs SET role=?, status='true' WHERE email=?";
    connection.query(query, [user.role, user.email], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0) {
                return res.status(400).json({ message: "aucun changement n'a été effectué" });
            }
            else {
                return res.status(200).json({ message: "update complete" });
            }
        }
        else {
            return res.status(500).json({ message: "une erreur s'est produite" });
        }
    });
});
router.get('/pending-users', (req, res) => {
    query = "SELECT id, nom, prenom, email, status FROM utilisateurs WHERE status='false'";
    connection.query(query, (err, result) => {
        if (!err) {
            if (result.length <= 0) {
                return res.status(404).json({ message: "aucun membre en attente de confirmation." });
            }
            else {
                return res.status(200).json(result)
            }
        }
        else {
            return res.status(500).json({ message: "Une erreur est survenue" });
        }
    });
});
router.delete('/delete-:email', (req, res) => {
    const email = req.params.email;
    query = "DELETE FROM utilisateurs WHERE email=?";
    connection.query(query, [email], (err, result) => {
        if (!err) {
            if(result.affectedRows > 0){
                return res.status(200).json({message: "utilisateur supprimé"});
            }
            else{
                return res.status(404).json({message: "l'utilisateur n'a pas été trouvé"});
            }
        }
        else {
            return res.status(500).json({ message: "une erreur est survenue" });
        }
    });
});
router.post('/signup', (req, res) => {
    let user = req.body;
    query = "SELECT email, password, status FROM utilisateurs WHERE email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "INSERT INTO utilisateurs(nom, prenom, email, password, status) VALUES(?,?,?,?,'false')";
                connection.query(query, [user.nom, user.prenom, user.email, user.password], (err, results) => {
                    if (!err) {
                        return res.status(201).json({ message: 'compte enregistré !' });
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
    query = "SELECT id,email,password,status,nom,prenom,role FROM utilisateurs WHERE email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].password != user.password) {
                return res.status(401).json({ message: "Utilisateur/Mot de passe incorrecte" });
            }
            else if (results[0].password === user.password) {
                if (results[0].status == "true") {
                    return res.status(200).json({ message: "Connected" , 
                                                  id: results[0].id, 
                                                  prenom: results[0].prenom, 
                                                  nom: results[0].nom, 
                                                  status: results[0].status, 
                                                  role: results[0].role});
                }
                else {
                    return res.status(401).json({ message: "En attente de confirmation" });
                }
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

