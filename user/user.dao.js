const { db, connection, Schema, ObjectID, dbHelper } = require("../src/db");
// const dataTables = require("mongoose-datatable");
const bcrypt = require("bcrypt");
const saltRounds = 10; // The higher the number, the longer it takes
const collection_name = "user";
const schema = new Schema({
    _id: String,
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
        let { email, password } = req;
        let _id = dbHelper.generateIdTechnique();
        const salt = bcrypt.genSaltSync(saltRounds);
        let hashed = bcrypt.hashSync(password, salt);

        let document = new model({
            _id: _id,
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