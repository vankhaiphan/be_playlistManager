const dao = require("./user.dao");
const bcrypt = require("bcrypt");

module.exports = {
    getById: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};

        let { _id } = req;
        let user = await dao.getById({ _id });
        if (!user) {
            return {
                success: false,
                errorSet: ["USER_NOT_FOUND"],
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

    getByEmail: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};

        let { email } = req;
        let user = await dao.getByEmail({ email });
        if (!user) {
            return {
                success: false,
                errorSet: ["USER_NOT_FOUND"],
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

    // TO REVIEW
    create: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};

        let user = await dao.save(req);
        result = {
            status: 200,
            success: success,
            errorSet: errorSet,
            data: user,
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

    authenticate: async function(req, res) {
        const { email, password } = req;

        let findEmail = await dao.getByEmail({ email });
        if (!findEmail) {
            return {
                success: false,
                errorSet: ["EMAIL_NOT_FOUND"],
            };
        }
        let result = bcrypt.compareSync(password, findEmail.password);
        if (!result) {
            return {
                success: false,
                errorSet: ["AUTHENTICATION_FAILED"],
                data: result,
            };
        }
        return {
            success: true,
            errorSet: [],
            data: result,
        };
    },
};