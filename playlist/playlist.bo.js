const dao = require("./playlist.dao");

module.exports = {
    getByUserId: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};

        let { id_user } = req;
        let playlist = await dao.getByUserId({ id_user });
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

    getById: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};

        let [_id] = req;
        let playlist = await dao.getById({ _id });
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

    create: async function(req) {
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

    getVideos: async function(req) {
        let { _id } = req;
        let result = await dao.getVideos(_id);
        if (!result) {
            return {
                success: false,
                errorSet: result.errorSet,
            };
        }
        return result;
    },

    addVideo: async function(req) {
        let { _id, video } = req;
        let result = await dao.addVideo({ _id, video });
        if (!result) {
            return {
                success: false,
                errorSet: result.errorSet,
            };
        }
        return result;
    },

    updateThumbnail: async function(req) {
        let { _id } = req;
        let result = dao.updateThumbnail({ _id });
        if (!result) {
            return {
                success: false,
                errorSet: ["ERROR_UPDATE_THUMBNAIL"],
            };
        }
        return result;
    },

    countByIdUser: async function(req) {
        //Check input
        if (!req.id_user) {
            return {
                success: false,
                errorSet: ["INVALID_PARAMS"],
            };
        }

        // Create count request
        const request = {
            id_user: req.id_user,
        };
        const count = await dao.countByIdUser(request);

        return {
            success: true,
            errorSet: [],
            data: {
                count: count,
            },
        };
    },
};