const db = require('./DatabaseConnect');
function getUsersAll() {
    return new Promise((resolve,reject) => {
        const bdd = db.db("youtubePlaylist") ;
        bdd.collection("Users").find({}).toArray(function (err, result) {
            if (err) {
              return reject(err) ;
            } else {
              resolve(result) ;
            }
        });
    });
}

module.exports.getUsersAll = getUsersAll;