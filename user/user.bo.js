const dao = require("./user.dao");
const bcrypt = require("bcrypt");
const playlist_bo = require("../playlist/playlist.bo");
const advertiser_bo = require("../advertiser/advertiser.bo");

module.exports = {
    getSet: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};

        let users = await dao.getSet();
        let userSet = [];

        for (let currentUser of users) {
            let _id = currentUser._id;
            let countPlaylist = await playlist_bo.countByIdUser({ id_user: _id });
            let countAds = await advertiser_bo.countByIdUser({ id_user: _id });

            let User = currentUser.toObject();
            User.nbPlaylists = countPlaylist.data.count;
            User.nbAds = countAds.data.count;
            userSet.push(User);
        }

        result = {
            status: 200,
            success: success,
            errorSet: errorSet,
            data: userSet,
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

    modifyPassword: async function(req) {
        let result = await dao.modifyPassword(req);
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