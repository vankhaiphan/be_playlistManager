const dao = require("./user.dao");
const bcrypt = require("bcrypt");
const playlist_bo = require("../playlist/playlist.bo");

module.exports = {
    getSet: async function(req) {
        let success = true;
        let errorSet = [];
        let result = {};

        let userSet = [];

        //Params in request
        let { nbByPage, start, orderBy, orderASC } = req.body;
        // Treat params
        // Setup default pagination params
        if (!start) start = 0;
        if (!nbByPage) nbByPage = 20;

        // Treat sort params
        // By default sort by last created date
        let _orderASC = orderASC ? "1" : "-1";
        let _orderBy = orderBy || "date_add";
        let sort = {};
        sort[_orderBy] = _orderASC;

        // Treat find params
        // user get only their project
        let find = {};
        if (id_user) {
            find["id_user"] = id_user;
        }

        // if search params is specify, filter project by title
        let search_obj;

        if (typeof search !== "undefined") {
            search_obj = {
                value: search,
                fields: ["title"],
            };
        }

        // Params for dao
        let params = {
            search,
            start,
            nbByPage,
            sort: sort,
            find: find,
        };
        let table = await dao.getSet(params);

        let users = await dao.getSet();
        let playlist = await playlist_bo.getByUserId();
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