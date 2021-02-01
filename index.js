var express = require('express');
var app = express();
// on importe le module router qui est dans person
var person = require('./routes/person');
// on importe le module router qui est dans address
var address = require('./routes/address');
// on appelle body parser et on le stocke dans une var
var bodyParser = require('body-parser');

// -----------------------------

// on appelle l'index.ejs = les views
// Déclaration de vues Embedded Javascript (EJS)
app.set('engine_view', 'ejs');

//-------------------------------------
// Utilise bodyParser pour pouvoir lire les entrées d'un formulaire
// le stocke comme un obj JS 
// accessible via req.body (récupère les objets stockés)
app.use(bodyParser.urlencoded({extended : false}));

//---------------------
app.get('/forms', (req, res) => {
    // on indique la vue à récupérer pour le chemin '/forms'
    res.render('form.ejs');
});

app.post('/', (req, res) => {
    res.render('presentation.ejs', {
       prenom : req.body.prenom, 
       nom : req.body.nom
    });
});

// ---------------EXO COMMENTS------------------------
let comments = [];

app.get('/comments', (req, res) => {
    res.render('comments.ejs', {
        comments
    });
});

app.post('/comments', (req, res) => {
    let comment = {
        title: req.body.title,
        comment: req.body.comment,
        date: new Date().toLocaleString()
    };
    comments.push(comment);
    res.render('comments.ejs', {
       comments
    });
}); 


// ---------------------------------------

// Appel des routes déclarées dans person.js à partir de la route /person
// http://localhost:8080/person/add
// http://localhost:8080/person/edit
// http://localhost:8080/person/delete
// http://localhost:8080/person/search
app.use('/person', person);

// idem avec le module address
app.use('/address', address);
// http://localhost:8080/address/add
// http://localhost:8080/address/edit
// http://localhost:8080/address/delete
// http://localhost:8080/address/search


// ---------------------- 
// INTRO MIDDLEWARE
// middleWare = une requete, une reponse ET le next()
// middleWare = essentiellement une fonction qui recevra les objets Request et Response
// et comme 3eme argument une autre fonction: next() que l'on appelera une fois notre code middleWare terminé
// var middleWare1 = function (req, res, next) {
//     console.log("middleWare:", req.url);
//     // sans le next(), cela ne fonctionne plus 
//     // ce next permet d'aller au middleWare2 
//     next();
// };

// var middleWare2 = function (req, res, next) {
//     console.log("middleWare2:", req.url);
//     // est en attente car le next est dans le get
// };

// //plus besoin de cet appel, il a été déplacé dans le app.get 
// // app.use(middleWare1);

// // etant donné qu'on a pas appelé next() dans le middleWare2, on le met dans le get
// // c'est un peu comme une sécurité, un filtre
// // on doit donc ajouter next en param
// app.get('/', function (req, res, next) {
//     // 2) la requête a été reçu, donc le message s'affiche dans la console
//     console.log("requête reçu");
//     res.send('hello world');
//     // on peut appeler le next() de middleWare2 
//     // le fait que le next soit appelé ici, le contenu des middleware sera affiché après "requete recue"
//     next();
//     // 3) on appelle les middleWare après, contrairement à avant quand on les appelant avec le app.use
//     // c'est comme si on avait passé une verif que la requete est bien reçue avant de les afficher
// }, middleWare1, middleWare2
// );

// --------------------------------------------------------------------------
// autres exemples de middleWare
// var myLogger = function(req, res, next) {
//     console.log("Vous êtes connecté");
//     next();
// };

// var requestTime = function(req, res, next) {
//     req.requestTime = new Date(Date.now());
//     next();
// };

// app.use(myLogger);
// app.use(requestTime);

// // get = méthode HTTP 
// app.get('/', (req, res) => {
//     var responseText = 'Hello World !';
//     responseText += 'appel à:' + req.requestTime + '';
//     res.send(responseText);
// });

// -----------------------------------------------------------------------------
// Routage: Interception d'une requête client, via la méthode HTTP get() et 
// redirection vers une composant capable de retourner une réponse
// ! on ne peut pas avoir deux actions get sur le même chemin 
// MAIS on peut avoir deux actions différentes sur le même chemin (ex: get() et post() sur '/')

// '/': dit "Racine" est la route 

// app.get('/', (req, res) => {
//     // instruction qui permet de retourner une réponse au client 
//     res.send('Get request to the home page.')
// });

// // post = méthdode HTTP qui permet d'envoyer des infos
// app.post('/', (req, res) => {
//     res.send('Post request to the home page.')
// });

// On déplace ce code dans route/personne.js pour respecter la MVC
// Précision d'une chaîne après notre route '/' = http://localhost:8080/personne 
// app.get('/personne', (req, res) => {
//     // instruction qui permet de retourner une réponse au client 
//     res.send('Bonjour personne');
// });

// ---------------------------------------------------------------
// Obligatoire pour tous les exemples 

// on spécifie le serveur qui va être utilisé 
app.listen(8080, function() {
    console.log("Express en attente");
    // 1)quand on lance la page http://localhost:8080/, cela lance une requête
});