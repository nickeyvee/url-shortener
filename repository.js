const db = require('mongodb');
const MongoClient = db.MongoClient;
const Service = require('./service');

const mongoService = {
   pool: null,

   openConnection: url => {
      return new Promise((reject, resolve) => {
         MongoClient.connect(url, (err, db) => {
            if (err) {
               console.log("cannot connect to mongoDB @ " + url);
               reject(err);
            } else {
               this.pool = db.collection('nick');
               resolve("connected to mongoDB @ " + url);
            }
         });
      }).catch(err => {
         if (err) console.log(err);
      });
   },
   insertNewURL: data => {
      return new Promise((reject, resolve) => {
         console.log(data);
         resolve(
            this.pool.insert(data)
         );
      }).catch(err => {
         if (err) console.log(err);
      });
   },
   queryShortened: (shortened, cb) => {
      this.pool.findOne({
         "shortened": shortened
      }, function (err, doc) {
         if (err) {
            cb(err, null);
         } else {
            cb(null, doc);
         }
      });
   }
};
module.exports = mongoService;