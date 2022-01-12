const { db, connection, Schema, ObjectID, dbHelper } = require("../src/db");
const collection_name = "playlist";
const common = require("../common");
const schema = new Schema({
    _id: String,
    url: String,
    name: String,
    description: String,
    status: String,
    id_user: String,
    thumbnail: String,
    date_add: Date,
    videos: [{ id_video: String, thumbnail: String }],
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

    getById: async function(req) {
        let { _id } = req;
        let query = model.find({ _id });
        let result = await query.exec();
        return result;
    },

    save: async function(req) {
        let { name, description, status, id_user } = req;

        // TO REVIEW
        let thumbnail = "";

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
            thumbnail: thumbnail,
            status: status,
            id_user: id_user,
            date_add: new Date(),
            videos: [],
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
        if (upd.$pull) {
            mod.$pull = upd.$pull;
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
        let videos = 0;
        let playlist = await this.getById(req);
        if (playlist.length != 0) {
            videos = playlist[0].videos;
        }
        return videos;
    },

    addVideo: async function(req) {
        let { _id, id_video, thumbnail } = req;
        let prepare = {
            id_video: id_video,
            thumbnail: thumbnail,
        };

        let query = model.findOneAndUpdate({ _id: _id }, { $push: { videos: prepare } });
        let result = await query.exec();
        return result;
    },

    countByIdUser: async function(req) {
        let query = model.countDocuments(req);
        let result = await query.exec();
        return result;
    },

    updateThumbnail: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};
        let { _id } = req;

        let playlist = await this.getById({ _id });

        if (playlist[0].videos.length != 0) {
            const query = model.findOneAndUpdate({ _id: _id }, { thumbnail: playlist[0].videos[0].thumbnail });
            const res = await query.exec();
        }
        result = {
            success: success,
            errorSet: errorSet,
        };
        return result;
    },
};