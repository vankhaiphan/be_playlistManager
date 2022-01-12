const dao = require("./user.dao");
const bcrypt = require("bcrypt");
const playlist_bo = require("../playlist/playlist.bo");

module.exports = {
    getSet: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};

        let users = await dao.getSet();
        let res = users.map(function(o) {
            o.isActive = true;
            return o;
        });
        console.log(res);
        for (let i = 0; i < users.length; i = i + 1) {
            let _id = users[i]._id;
            let count = await playlist_bo.countByIdUser({ id_user: _id });
            users[i].nbPlaylist = count.data.count;
        }

        result = {
            status: 200,
            success: success,
            errorSet: errorSet,
            data: users,
        };
        return result;
    },

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
        let { email } = req.email;

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
        let secure = bcrypt.compareSync(password, findEmail.password);
        if (!secure) {
            return {
                success: false,
                errorSet: ["AUTHENTICATION_FAILED"],
                data: secure,
            };
        }

        return {
            success: true,
            errorSet: [],
            data: findEmail,
        };
    },
};