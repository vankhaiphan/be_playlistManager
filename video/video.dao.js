const { db, connection, Schema, ObjectID, dbHelper } = require("../src/db");
const collection_name = "video";
const playlist_bo = require("../playlist/playlist.bo");
const schema = new Schema({
    _id: String,
    videoUrl: String,
    title: String,
    channelId: String,
    channelUrl: String,
    channelTitle: String,
    description: String,
    publishedAt: String,
    thumbnails: String,
    playlists: [String],
});
const model = db.model(collection_name, schema, `${collection_name}s`);

module.exports = {
    getAllByPlaylistId: async function(req) {
        let { id_playlist } = req;
        let query = model.find({ playlists: id_playlist });
        let result = await query.exec();
        return result;
    },

    // search: async function(req) {},

    addToPlaylist: async function(req) {
        let { _id, playlists } = req;
        let success = true;
        let errorSet = [];

        for (let i = 0; i < playlists.length; i = i + 1) {
            let query = model.findOneAndUpdate({ _id: _id }, { $push: { playlists: playlists[i] } });
            let result = await query.exec();
            if (!result) {
                return {
                    success: false,
                    errorSet: ["CANNOT_UPDATE"],
                };
            }
        }
        result = {
            success: success,
            errorSet: errorSet,
        };

        return result;
    },

    removeFromPlaylist: async function(req) {
        let { _id, playlist } = req;

        let query = model.findOneAndUpdate({ _id: _id }, { $pull: { playlists: playlist } });
        let result = await query.exec();
        return result;
    },

    save: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};
        // console.log("id", req);
        let _id = dbHelper.generateIdTechnique();
        const playlists = req.playlists;
        const { videoUrl, title, channelId, channelUrl, channelTitle, description, publishedAt, thumbnails } = req;
        let document = new model({
            _id: _id,
            url: videoUrl,
            title: title,
            channelId: channelId,
            channelUrl: channelUrl,
            channelTitle: channelTitle,
            description: description,
            publishedAt: publishedAt,
            thumbnails: thumbnails,
            playlists: [],
        });

        let res = await document.save();
        if (!res) {
            return {
                success: false,
                errorSet: ["VIDEO_SAVE_FAILED"],
            };
        }

        let add = await this.addToPlaylist({ _id, playlists });
        if (!add) {
            return {
                success: false,
                errorSet: ["ADD_TO_PLAYLIST_FAILED"],
            };
        }
        result = {
            success: success,
            errorSet: errorSet,
        };
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
};