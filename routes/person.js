// ce doc va comprendre toutes les routes définies à partir du chemin '/person' 
// défini dans index.js 

var express = require('express');
// avec express.Router(), on appelle la méthode Router() d'express
var router = express.Router();
// on appelle le controller
var personneController = require('../controllers/personne.controller');
const db = require('../db/db');

// router.get('/search', (req, res) => {
//     // instruction qui permet de retourner une réponse au client 
//     res.send('Recherche personne');
// });

// // Précision d'une chaîne après notre route '/' = http://localhost:8080/add
// router.post('/add', (req, res) => {
//     // instruction qui permet de retourner une réponse au client 
//     res.send('Ajout personne');
// });

// // put: requête HTTP pour la modification 
// router.put('/edit', (req, res) => {
//     // instruction qui permet de retourner une réponse au client 
//     res.send('Mise à jour personne');
// });

// // delete: requête HTTP pour la suppression 
// router.delete('/delete', (req, res) => {
//     // instruction qui permet de retourner une réponse au client 
//     res.send('Suppression personne');
// });

// on définit la route qui affichera le contenu de index.ejs =, ici '/'
// on créé une fonction fléchée qui va utiliser la méthode render()
// render retournera le fichier index.ejs, ainsi que l'objet nom 
// http://localhost:8080/person/
router.get('/', (req, res) => {
    var persons = [
        {nom : 'Wick', prenom: 'John', age: 40},
        {nom : 'Doe', prenom: 'John', age: 50},
        {nom : 'Bat', prenom: 'Jean', age: 30}
    ];
    var personTitle = 'Liste de personnes';

    res.render('index.ejs', {
        personTitle, 
        persons,
        nom: "Margaux"
    });

    // res.render('index.ejs', {nom : 'Wick'});
    // // Affichera Bonjour Wick 
});

// http://localhost:8080/person/hello/John
router.get('/hello/:nom', (req, res) => {
    var persons = [
        {nom : 'Wick', prenom: 'John', age: 40},
        {nom : 'Doe', prenom: 'John', age: 50},
        {nom : 'Bat', prenom: 'Jean', age: 30}
    ];
    var personTitle = 'Liste de personnes';

    res.render('index.ejs', {
        personTitle, 
        persons,
        nom: req.params.nom
    });

    // res.render('index.ejs', {nom : req.params.nom});
});

// Appel de la route http://localhost:8080/forms
// on affiche dans la vue forms.ejs la liste des personnes récupéré dans la bd formation
router.get('/forms', (req, res) => {
    // création de la requête
    let query = "Select * from personne";

    // appel de la méthode query() prenant en param la requete ici query
    // et une méthode callback nous retournant soit une erreur soit le résultat 
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/person/forms');
        }
        // renvoie vers la vue forms.ejs avec une variable personList 
        // stockant le resultat récupéré du callback
        res.render('forms.ejs', {
            personList: result,
            txtId: '',
            txtNom: '',
            txtPrenom: ''
        });
    });
});

// --- ajout personne -----
// Appel de la route http://localhost:8080/ajoutPersonne
router.post('/ajoutPersonne', (req, res) => {
    if (req.body.txtId == 0) {
        var data = {
            nom: req.body.txtNom,
            prenom: req.body.txtPrenom
        };
        db.query("Insert into personne set ? ", data,
            function (err, rows) {
                if (err) throw err;
                console.log("Insertion reussie");
                res.redirect('/person/forms');
            });
    }
    else {
        var data = {
            id: req.body.txtId,
            nom: req.body.txtNom,
            prenom: req.body.txtPrenom
        };
        db.query('UPDATE personne SET ? WHERE id = ' + data.id, data,
            function (err, rows) {
                if (err) throw err;
                console.log("Mise à jour reussie");
                res.redirect('/person/forms');
            });
    }
});

// --- edit personne -----
router.get('/editPersonne/:id', (req, res) => {

    var id = req.params.id;

    db.query('SELECT * FROM personne WHERE id = "' + id + '"', 
        function(err, rows) {
            if (err) throw err;

            res.render('forms.ejs', {
                personList: [],
                txtId: rows[0].id,
                txtNom: rows[0].nom,
                txtPrenom: rows[0].prenom
            });
        });
});

// --- delete personne -----
router.get('/deletePersonne/:id', (req, res) => {

    var id = req.params.id;

    db.query('DELETE FROM personne WHERE id = "' + id + '"', 
        function(err, rows) {
            if (err) throw err;

            console.log('Suppression réussie');
            // redirection vers /forms
            res.redirect('/person/forms');
        });
});

// ----- CREATION API REST --------------
// http://localhost:8080/person/search
// Retournera un tableau d'objet JSON
router.get('/search', (req, res) => {
    let query = "Select * from personne";

    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/forms');
        }
        res.json({
            status: 200,
            result,
            message: "Person list retrieved successfully"
        })
    });
});

// http://localhost:8080/person/add
router.post('/add', (req, res) => {
    
    var data = {
        nom: req.body.nom,
        prenom: req.body.prenom
    };

    db.query("Insert into personne set ?", data, (err, rows) => {
        if (err) throw err;
        console.log("Insertion réussie");
        res.json({
            status: 200,
            message: "New person added successfully"
        });
    });
});

// http://localhost:8080/person/update
router.put('/update', (req, res) => {
    
    var data = {
        id: req.body.id,
        nom: req.body.nom,
        prenom: req.body.prenom
    };

    db.query("UPDATE personne SET ? WHERE id = " + data.id, data, (err, rows) => {
        if (err) throw err;
        console.log("Mise à jour réussie");
        res.json({
            status: 200,
            message: "Person updated successfully"
        });
    });
});

// http://localhost:8080/person/select/:id
router.get('/select/:id', (req, res) => {
    
    var id = req.params.id;

    db.query('SELECT * FROM personne WHERE id = "' + id + '"', 
        (err, rows) => {
            if (err) throw err;

            res.json({
                rows,
                status: 200,
                message: "Person selected successfully"
            });
        });
});

// http://localhost:8080/person/delete/:id
router.delete('/delete/:id', (req, res) => {
    
    var id = req.params.id;

    db.query('DELETE FROM personne WHERE id = "' + id + '"', 
        (err, rows) => {
            if (err) throw err;

            res.json({
                status: 200,
                message: "Person deleted successfully"
            });
        });
});


// on définit la route correspondante
// et le fichier controller à appeler 
router.get('/forms', personneController.show);

// on exporte notre module pour pouvoir l'importer dans index.js
module.exports = router; 

