const dao = require("./playlist.dao");

module.exports = {
    getByUserId: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};

        let [_id] = req;
        let playlist = await dao.getByUserId({ _id });
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

    add: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};

        let playlist = await dao.save(req);
        result = {
            status: 200,
            success: success,
            errorSet: errorSet,
            data: playlist,
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

    getVideos: async function(req) {},
};