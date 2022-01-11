const { db, connection, Schema, ObjectID, dbHelper } = require("../src/db");
const collection_name = "video";
const schema = new Schema({
    _id: String,
    url: String,
    video_title: String,
    description: String,
    thumbnails: String,
    playlist_id: String,
});
const model = db.model(collection_name, schema, `${collection_name}s`);

module.exports = {
    getByPlaylistId: async function(req) {
        let { id_playlist } = req;
        let query = model.find({ id_playlist });
        let result = await query.exec();
        return result;
    },

    search: async function(req) {},
};