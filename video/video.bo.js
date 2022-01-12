const dao = require("./video.dao");
const playlistDao = require("../playlist/playlist.dao");

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

    removeVideoFromPlaylist: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};

        let { _id, id_playlist } = req;

        let params = {
            find: {
                _id: _id,
            },
            upd: {
                $pull: {
                    playlists: id_playlist,
                },
            },
        };

        let paramsPlaylist = {
            find: {
                _id: id_playlist,
            },
            upd: {
                $pull: {
                    videos: { id_video: _id },
                },
            },
        };

        video = await dao.modify(params);
        playlist = await playlistDao.modify(paramsPlaylist);
        result = {
            success: success,
            errorSet: errorSet,
            data: video,
            playlist,
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