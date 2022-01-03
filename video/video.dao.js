const { db, connection, Schema, ObjectID, dbHelper } = require("../src/db");
const collection_name = "video";
const schema = new Schema({
    _id: String,
    url: String,
    title: String,
    description: String,
    thumbnails: String,
    playlist_id: String,
});
// schema.plugin(dataTables);
const model = db.model(collection_name, schema, `${collection_name}s`);