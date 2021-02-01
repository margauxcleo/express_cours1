var express = require('express');
// avec express.Router(), on appelle la méthode Router() d'express
var router = express.Router();

router.get('/search', (req, res) => {
    // instruction qui permet de retourner une réponse au client 
    res.send('Recherche adresse');
});

// Précision d'une chaîne après notre route '/' = http://localhost:8080/add
router.post('/add', (req, res) => {
    // instruction qui permet de retourner une réponse au client 
    res.send('Ajout adresse');
});

// put: requête HTTP pour la modification 
router.put('/edit', (req, res) => {
    // instruction qui permet de retourner une réponse au client 
    res.send('Mise à jour adresse');
});

// delete: requête HTTP pour la suppression 
router.delete('/delete', (req, res) => {
    // instruction qui permet de retourner une réponse au client 
    res.send('Suppression adresse');
});

// on exporte notre module pour pouvoir l'importer dans index.js
module.exports = router; 

