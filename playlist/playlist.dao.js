const { db, connection, Schema, ObjectID, dbHelper } = require("../src/db");
const collection_name = "playlist";
const videoDao = require("../video/video.bo");
const common = require("../common");
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
    getByUserId: async function(req) {
        let { id_user } = req;
        let query = model.find({ id_user });
        let result = await query.exec();
        return result;
    },

    save: async function(req) {
        let { name, description, status, id_user } = req;

        let _id = dbHelper.generateIdTechnique();
        if (status === "PUBLIC") {
            status = common.PLAYLIST_STATUS.PUBLIC;
        }
        if (status === "UNLISTED") {
            status = common.PLAYLIST_STATUS.UNLISTED;
        }
        if (status === "PRIVATE") {
            status = common.PLAYLIST_STATUS.PRIVATE;
        }
        let document = new model({
            _id: _id,
            name: name,
            description: description,
            status: status,
            id_user: id_user,
            date_add: new Date(),
        });
        let result = await document.save();
        return result;
    },

    modify: async function(req) {
        let { find, upd } = req;

        let mod = {
            $set: {
                ...upd.$set,
            },
        };

        if (upd.$push) {
            mod.$push = upd.$push;
        }

        const query = model.findOneAndUpdate(find, mod, { new: true });
        const result = await query.exec();
        return result;
    },

    delete: async function(req) {
        let { _id } = req;
        let query = model.findByIdAndRemove(_id);
        let result = await query.exec();
        return result;
    },

    getVideos: async function(req) {
        let { id_playlist } = req;
        let result = await videoDao.getByPlaylistId();
        if (!result) {
            return {
                success: false,
                errorSet: result.errorSet,
            };
        }
        return result;
    },
};