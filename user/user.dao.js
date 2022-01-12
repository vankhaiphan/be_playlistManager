const { db, connection, Schema, ObjectID, dbHelper } = require("../src/db");
const bcrypt = require("bcrypt");
const { ROLE_STATUS } = require("../common");
const saltRounds = 10; // The higher the number, the longer it takes
const collection_name = "user";
const schema = new Schema({
    _id: String,
    id_creator: String,
    email: { type: String, unique: true },
    password: String,
    date_add: Date,
    activated: Boolean,
});

const model = db.model(collection_name, schema, `${collection_name}s`);

module.exports = {
    getSet: async function(req) {
        let query = model.find();
        let result = await query.exec();
        return result;
    },

    getById: async function(req) {
        let { _id } = req;
        let query = model.findById(_id);
        let result = await query.exec();
        return result;
    },

    getByEmail: async function(req) {
        let { email } = req;
        let query = model.findOne({ email });
        let result = await query.exec();
        return result;
    },

    save: async function(req) {
        await model.syncIndexes();
        let { email, password, ads } = req;
        let _id = dbHelper.generateIdTechnique();

        // Crypting the password
        const salt = bcrypt.genSaltSync(saltRounds);
        let hashed = bcrypt.hashSync(password, salt);

        // Assign default role
        let roleSubs = ROLE_STATUS.USER_ROLE;

        // Assign advertiser role if required
        if (ads === true) {
            roleSubs = ROLE_STATUS.ADVERTISER_ROLE;
        }
        console.log(roleSubs);
        let document = new model({
            _id: _id,
            id_creator: roleSubs,
            email: email,
            password: hashed,
            date_add: new Date(),
            activated: true,
        });

        let result = await document.save();
        return result;
    },

    modify: async function(req) {
        let { find, upd } = req;

        let mod = {
            $set: {
                ...upd.$set,
            },
        };

        if (upd.$push) {
            mod.$push = upd.$push;
        }

        const query = model.findOneAndUpdate(find, mod, { new: true });
        const result = await query.exec();
        return result;
    },

    modifyPassword: async function(req) {
        let { _id, oldPassword, newPassword } = req;

        let user = await this.getById({ _id });
        let hash = user.password;

        let decrypt = bcrypt.compareSync(oldPassword, hash);

        if (!decrypt) {
            return {
                success: false,
                errorSet: ["WRONG_PASSWORD"],
            };
        }

        // Crypting the password
        const salt = bcrypt.genSaltSync(saltRounds);
        let password = bcrypt.hashSync(newPassword, salt);

        let params = {
            find: {
                _id: _id,
            },
            upd: {
                $set: { password: password },
                $push: null,
            },
        };
        let modifyPass = await this.modify(params);

        let result = {
            success: true,
            data: modifyPass,
        };

        return result;
    },

    delete: async function(req) {
        let { _id } = req;
        let query = model.findByIdAndRemove(_id);
        let result = await query.exec();
        return result;
    },
};