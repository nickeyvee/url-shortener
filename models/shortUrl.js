const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// should like kindof like a JSON file.
const urlSchema = new Schema({
    original: String,
    shortened: String
}, { timestamps: true });

const modelClass = mongoose.model("urlPairs", urlSchema );
                        // model( "the collection", "the Schema" );

module.exports = modelClass;