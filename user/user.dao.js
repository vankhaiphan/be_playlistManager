const { db, connection, Schema, ObjectID, dbHelper } = require("../src/db");
const bcrypt = require("bcrypt");
const { ROLE_STATUS } = require("../common");
const saltRounds = 10; // The higher the number, the longer it takes
const collection_name = "user";
const schema = new Schema({
    _id: String,
    id_creator: String,
    email: String,
    password: String,
    date_add: Date,
    activated: Boolean,
});
// schema.plugin(dataTables);
const model = db.model(collection_name, schema, `${collection_name}s`);

module.exports = {
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
        let { email, password, ads } = req;
        let _id = dbHelper.generateIdTechnique();

        // Crypting the password
        const salt = bcrypt.genSaltSync(saltRounds);
        let hashed = bcrypt.hashSync(password, salt);

        // Assign default role
        let roleSubs = ROLE_STATUS.USER_ROLE;

        // Assign advertiser role if required
        if (ads) {
            roleSubs = ROLE_STATUS.ADVERTISER_ROLE;
        }
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

    delete: async function(req) {
        let { _id } = req;
        let query = model.findByIdAndRemove(_id);
        let result = await query.exec();
        return result;
    },
};