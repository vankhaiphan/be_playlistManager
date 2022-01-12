const dao = require("./history.dao");

module.exports = {
    getAll: async function() {
        let success = true;
        let errorSet = [];

        let result = {};

        let ads = await dao.getAll();
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

    getByUserId: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};

        let { id_user } = req;
        let adLog = await dao.getByUserId({ id_user });
        if (!adLog) {
            return {
                success: false,
                errorSet: ["RECORD_NOT_FOUND"],
            };
        }

        result = {
            status: 200,
            success: success,
            errorSet: errorSet,
            data: adLog,
        };
        return result;
    },

    getById: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};

        let { _id } = req;
        let adLog = await dao.getById({ _id });
        if (!adLog) {
            return {
                success: false,
                errorSet: ["RECORD_NOT_FOUND"],
            };
        }

        result = {
            status: 200,
            success: success,
            errorSet: errorSet,
            data: adLog,
        };
        return result;
    },

    create: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};

        let res = await dao.create(req);
        if (!res) {
            return {
                success: false,
                errorSet: ["CANNOT_CREATE_DATA"],
            };
        }

        result = {
            status: 200,
            success: success,
            errorSet: errorSet,
            data: res,
        };
        return result;
    },

    deleteByIdUser: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};

        let res = await dao.deleteByIdUser(req);
        if (!res) {
            return {
                success: false,
                errorSet: ["ERROR_DELETE_DATA"],
            };
        }

        result = {
            status: 200,
            success: success,
            errorSet: errorSet,
            data: res,
        };
        return result;
    },
};