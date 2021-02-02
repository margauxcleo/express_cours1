var PersonneModel = require('../models/personne.model');

var PersonneController=function(){}

PersonneController.show = function(req,res,next){
    PersonneModel.getAllPersons(function(err,result){
        if(err){
                throw err;
        }else{
            res.render('forms.ejs', {
                personList: result,
                txtId: '',
                txtNom: '',
                txtPrenom: '',
            });
        }
    });
}
module.exports = PersonneController;