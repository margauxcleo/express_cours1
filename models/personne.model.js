const sql = require('../db/db');

var PersonneModel={

};

PersonneModel.getAllPersons = function(result) {
    sql.query("SELECT * FROM personne", function(err, res) {
        if (err) {
            return result(err, null);
        }
        else {
            return result(null, res);
        }
    });
};

module.exports = PersonneModel;