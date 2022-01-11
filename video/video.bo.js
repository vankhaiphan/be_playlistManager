const dao = require("./video.dao");
const playlist_bo = require("../playlist/playlist.bo");

module.exports = {
    getAllByPlaylistId: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};

        let { id_playlist } = req;
        let playlist = await dao.getAllByPlaylistId({ id_playlist });
        if (!playlist) {
            return {
                success: false,
                errorSet: ["PLAYLIST_NOT_FOUND"],
            };
        }
        result = {
            status: 200,
            success: success,
            errorSet: errorSet,
            data: playlist,
        };
        return result;
    },

    save: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};

        let video = await dao.save(req);
        result = {
            status: 200,
            success: success,
            errorSet: errorSet,
            data: video,
        };
        return result;
    },

    removeFromPlaylist: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};

        let remove = await dao.removeFromPlaylist(req);
        result = {
            status: 200,
            success: success,
            errorSet: errorSet,
            data: remove,
        };
        return result;
    },

    modify: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};

        let { _id, ...data } = req;
        let params = {
            find: {
                _id: _id,
            },
            upd: {
                $set: { data },
                $push: null,
            },
        };

        if (data) {
            params.upd.$set = data;
        }

        let user = await dao.modify(params);

        result = {
            success: success,
            errorSet: errorSet,
            data: user,
        };
        return result;
    },

    delete: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};

        let user = await dao.delete(req);
        if (!user) {
            return {
                success: false,
                errorSet: ["ID_NOT_FOUND"],
            };
        }
        result = {
            status: 200,
            success: success,
            errorSet: errorSet,
            data: user,
        };
        return result;
    },
};