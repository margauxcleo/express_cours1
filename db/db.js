// import du module mysql2
var mysql2 = require('mysql2');

// préparation la connexion à la BDD formation_express
// via le module installé mysql2
var db = mysql2.createConnection({
    host:'localhost',
    user: 'root',
    password: 'root',
    database: 'formation_express'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
// l'objet global nous donne une portée globale dans l'ensemble du projet
// on peut donc appeler db partout
global.db = db;

module.exports = db;