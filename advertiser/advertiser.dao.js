const { db, connection, Schema, ObjectID, dbHelper } = require("../src/db");
const collection_name = "ad";

const common = require("../common");
const schema = new Schema({
    _id: String,
    name: String,
    id_user: String,
    file: String,
    date_add: Date,
});
// schema.plugin(dataTables);
const model = db.model(collection_name, schema, `${collection_name}s`);

module.exports = {
    getById: async function(req) {},
};