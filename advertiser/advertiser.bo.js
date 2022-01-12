const dao = require("./advertiser.dao");

module.exports = {
    getSet: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};

        let ads = await dao.getSet();
        if (!ads) {
            return {
                success: false,
                errorSet: ["CANNOT_GET_DATA"],
            };
        }
        result = {
            success: success,
            errorSet: errorSet,
            data: ads,
        };
        return result;
    },

    getById: async function(req, res) {
        let success = true;
        let errorSet = [];
        let result = {};

        let { _id } = req;
        let ad = await dao.getById({ _id });
        if (!ad) {
            return {
                success: false,
                errorSet: ["AD_NOT_FOUND"],
            };
        }

        result = {
            status: 200,
            success: success,
            errorSet: errorSet,
            data: ad,
        };
        return result;
    },

    getByUserID: async function(req, res) {
        let success = true;
        let errorSet = [];
        let result = {};

        let { id_user } = req;
        let ad = await dao.getByIdUser({ id_user });
        if (!ad) {
            return {
                success: false,
                errorSet: ["AD_NOT_FOUND"],
            };
        }

        result = {
            status: 200,
            success: success,
            errorSet: errorSet,
            data: ad,
        };
        return result;
    },

    create: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};

        let advert = await dao.create(req);
        result = {
            status: 200,
            success: success,
            errorSet: errorSet,
            data: advert,
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

        let ad = await dao.modify(params);

        result = {
            success: success,
            errorSet: errorSet,
            data: ad,
        };
        return result;
    },

    delete: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};

        let ad = await dao.delete(req);
        if (!ad) {
            return {
                success: false,
                errorSet: ["ID_NOT_FOUND"],
            };
        }
        result = {
            status: 200,
            success: success,
            errorSet: errorSet,
            data: ad,
        };
        return result;
    },
    count: async function() {
        // Create count request
        const count = await dao.count();

        return {
            success: true,
            errorSet: [],
            data: {
                count: count,
            },
        };
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

    getRandom: async function() {
        let totalRecord = await this.count();
        let random = Math.floor(Math.random() * totalRecord);
        let result = await dao.getRandom(random);
        return result;
    },
};