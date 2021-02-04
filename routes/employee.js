var express = require('express');
// avec express.Router(), on appelle la méthode Router() d'express
var router = express.Router();

// // import de la bdd Mongo
// const employes = require('../db/mongoDB');

// import du module mongodb
var MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;


MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true}, (
    err, client) => {

        if(err) throw err;
        // --------on appelle la database ---------------
        const db = client.db('formation');
        // on appelle la collection
        const employes = db.collection('employes');
        console.log('Connected to MongoDb');

        // affichage
        router.get('/mongoform', (req, res) => {
            
            employes.find().toArray(function(err, result) {
                if (err) {
                    res.redirect('/employee/mongoform');
                }
                res.render('mongoForm.ejs', {
                    employesList: result,
                    employeeId: '',
                    firstname: '',
                    lastname: ''
                });
            });
        });

        // ajout 
        // --- ajout personne -----
        // Appel de la route http://localhost:8080/employee/addEmployee
        router.post('/addEmployee', (req, res) => {

            // insertMany ou insertOne
            if (req.body.txtId == 0) {
                var data = {
                    prenom: req.body.firstname,
                    nom: req.body.lastname
                };
    
                employes.insertOne({prenom: data.prenom, nom: data.nom}, (error, doc) => {
                    if(error) throw err;
                    console.log(' Insertion réussie !');
                    res.redirect('/employee/mongoform');
                });
            }
            else {
                //update employee
                var data = {
                    id: req.body.employeeId,
                    nom: req.body.firstname,
                    prenom: req.body.lastname
                };

                employes.updateOne({ _id: data.employeeId }, {
                    $set: {
                        prenom:
                            data.prenom,
                        nom:
                            data.nom
                    }
                }, { multi: true }, (error, result) => {
                    if (error)
                        throw error;
                    if (result.result.nModified > 0)
                        console.log('Modification réussie !');
                });
            }
        });

        // --- edit employee -----
        router.get('/editEmployee/:_id', (req, res) => {

            const id = req.params._id;
            const stringId = id.toString();
            console.log(id);
            console.log(stringId);

            employes.findById(id, (err, result) => {
                console.log(result);
                if (err) throw err;

                console.log(result.prenom);

                result.save()
                    .then(() => res.render('mongoForm.ejs', {
                        employesList: [],
                        employeeId: result._id,
                        firstname: result.prenom,
                        lastname: result.nom,
                    })
                    .catch((error) => {
                        console.error(error, 'Promise error');
                        done();
                    }))
            });
        });
        
});



module.exports = router; 
