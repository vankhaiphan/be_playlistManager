const { db, connection, Schema, ObjectID, dbHelper } = require("../src/db");
const dataTables = require("mongoose-datatables");

const schema = new Schema({
    _id: String,
    email: String,
    password: String,
    date_add: Date,
    activated: Boolean,
});

schema.plugin(dataTables);
const model = db.model(collection_name, schema, `${collection_name}s`);

module.exports = {
    getById: async function(req) {
        let { _id } = req;
        let query = model.findById({ _id });
        let result = await query.exec();
        return result;
    },

    save: async function(req) {
        let { email, password } = req;
        let _id = dbHelper.generateIdTechnique();

        bcrypt.hash(password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
        });

        let document = new model({
            _id: _id,
            email: email,
            password: password,
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