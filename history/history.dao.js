const { db, connection, Schema, ObjectID, dbHelper } = require("../src/db");
const collection_name = "historie";
const schema = new Schema({
    _id: String,
    videoId: String,
    videoUrl: String,
    title: String,
    channelId: String,
    channelUrl: String,
    channelTitle: String,
    description: String,
    publishedAt: String,
    thumbnail: String,
    id_user: String,
    date_add: Date,
});
// schema.plugin(dataTables);
const model = db.model(collection_name, schema, `${collection_name}s`);

module.exports = {
    getAll: async function() {
        let query = model.find();
        let result = await query.exec();
        return result;
    },

    getByUserId: async function(req) {
        let { id_user } = req;
        let query = model.find({ id_user });
        let result = await query.exec();
        return result;
    },

    getById: async function(req) {
        let { _id } = req;
        let query = model.find({ _id });
        let result = await query.exec();
        return result;
    },

    create: async function(req) {
        const {
            id_user,
            videoId,
            videoUrl,
            title,
            channelId,
            channelUrl,
            channelTitle,
            description,
            publishedAt,
            thumbnail,
        } = req;

        let _id = dbHelper.generateIdTechnique();
        let document = new model({
            _id: _id,
            videoId: videoId,
            videoUrl: videoUrl,
            title: title,
            channelId: channelId,
            channelUrl: channelUrl,
            channelTitle: channelTitle,
            description: description,
            publishedAt: publishedAt,
            thumbnail: thumbnail,
            id_user: id_user,
            date_add: new Date(),
        });
        let result = await document.save();
        return result;
    },

    deleteByIdUser: async function(req) {
        let { id_user } = req;
        let query = model.deleteMany({ id_user });
        let result = await query.exec();
        return result;
    },
};