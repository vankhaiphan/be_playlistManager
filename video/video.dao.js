const { db, connection, Schema, ObjectID, dbHelper } = require("../src/db");
const collection_name = "video";
const playlistBo = require("../playlist/playlist.bo");
const schema = new Schema({
    _id: String,
    videoId: { type: String, unique: true },
    videoUrl: String,
    title: String,
    channelId: String,
    channelUrl: String,
    channelTitle: String,
    description: String,
    publishedAt: String,
    thumbnail: String,
    playlists: [String],
    date_add: Date,
});
const model = db.model(collection_name, schema, `${collection_name}s`);

module.exports = {
    getByVideoId: async function(req, res) {
        let { videoId } = req;
        let query = model.find({ videoId });
        let result = await query.exec();
        return result;
    },

    getAllByPlaylistId: async function(req) {
        let { id_playlist } = req;
        let query = model.find({ playlists: id_playlist });
        let result = await query.exec();
        return result;
    },

    // search: async function(req) {},
    countByCustomCondition: async function(req) {
        let query = model.count(req);
        let result = await query.exec();
        return result;
    },

    addToPlaylist: async function(req) {
        let { _id, thumbnail, playlists } = req;
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
            await playlistBo.addVideo({ _id: playlists[i], id_video: _id, thumbnail });
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
        let _id = dbHelper.generateIdTechnique();
        const playlists = req.playlists;

        const { videoId, videoUrl, title, channelId, channelUrl, channelTitle, description, publishedAt, thumbnail } = req;

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
            date_add: new Date(),
            playlists: [],
        });

        let res = {};
        try {
            res = await document.save();
        } catch (exception) {
            if (exception.name === "MongoError" && exception.code === 11000) {
                let resId = await this.getByVideoId({ videoId });
                await this.addToPlaylist({ _id: resId[0]._id, thumbnail, playlists });
            } else {
                return {
                    success: false,
                    errorSet: ["VIDEO_SAVE_FAILED"],
                };
            }
        }

        await this.addToPlaylist({ _id, thumbnail, playlists });

        result = {
            success: success,
            errorSet: errorSet,
            data: res,
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
        if (upd.$pull) {
            mod.$pull = upd.$pull;
        }
        const query = model.findOneAndUpdate(find, mod, { new: true });
        const result = await query.exec();
        return result;
    },
};