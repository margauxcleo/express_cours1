// // import du module mongodb
// var MongoClient = require('mongodb').MongoClient;

// const mongodb = MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true}, (
//     err, client) => {

//         if(err) throw err;
//         // --------on appelle la database ---------------
//         var db = client.db('formation');
//         // on appelle la collection
//         var employes = db.collection('employes');
//         console.log('Connected to MongoDb');
//         return employes;     
// });

// // l'objet global nous donneune portée globale dans l'ensemble du projet
// // on peut donc appeler db partout
// global.db = mongodb;

// module.exports = mongodb;