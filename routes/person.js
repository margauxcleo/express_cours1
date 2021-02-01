// ce doc va comprendre toutes les routes définies à partir du chemin '/person' 
// défini dans index.js 


var express = require('express');
// avec express.Router(), on appelle la méthode Router() d'express
var router = express.Router();

router.get('/search', (req, res) => {
    // instruction qui permet de retourner une réponse au client 
    res.send('Recherche personne');
});

// Précision d'une chaîne après notre route '/' = http://localhost:8080/add
router.post('/add', (req, res) => {
    // instruction qui permet de retourner une réponse au client 
    res.send('Ajout personne');
});

// put: requête HTTP pour la modification 
router.put('/edit', (req, res) => {
    // instruction qui permet de retourner une réponse au client 
    res.send('Mise à jour personne');
});

// delete: requête HTTP pour la suppression 
router.delete('/delete', (req, res) => {
    // instruction qui permet de retourner une réponse au client 
    res.send('Suppression personne');
});

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

// on exporte notre module pour pouvoir l'importer dans index.js
module.exports = router; 

