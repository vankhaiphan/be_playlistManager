const dao = require("./advertiser.dao");

module.exports = {
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

    getRandom: async function() {
        let totalRecord = await this.count();
        let random = Math.floor(Math.random() * totalRecord);
        let result = await dao.getRandom(random);
        return result;
    },
};