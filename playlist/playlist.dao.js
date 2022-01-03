const { db, connection, Schema, ObjectID, dbHelper } = require("../src/db");
const collection_name = "playlist";
const schema = new Schema({
    _id: String,
    url: String,
    name: String,
    description: String,
    status: String,
    user_id: String,
    date_add: Date,
});
// schema.plugin(dataTables);
const model = db.model(collection_name, schema, `${collection_name}s`);

module.exports = {
    getByUserId: async function(req) {},

    add: async function(req) {},

    modify: async function(req) {},

    delete: async function(req) {},

    getVideos: async function(req) {},
};