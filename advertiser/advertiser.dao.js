const { db, connection, Schema, ObjectID, dbHelper } = require("../src/db");
const collection_name = "ad";
const schema = new Schema({
    _id: String,
    id_user: String,
    fileName: String,
    date_add: Date,
});
// schema.plugin(dataTables);
const model = db.model(collection_name, schema, `${collection_name}s`);

module.exports = {

    getSet: async function(req){
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

    getByIdUser: async function(req) {
        let { id_user } = req;
        let query = model.find({ id_user });
        let result = await query.exec();
        return result;
    },

    create: async function(req) {
        let { fileName, id_user } = req;

        let _id = dbHelper.generateIdTechnique();
        let document = new model({
            _id: _id,
            id_user: id_user,
            fileName: fileName,
            date_add: new Date(),
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

    count: async function(req) {
        let query = model.countDocuments();
        let result = await query.exec();
        return result;
    },

    countByIdUser: async function(req) {
        let query = model.countDocuments(req);
        let result = await query.exec();
        return result;
    },

    getRandom: async function(req) {
        let query = model.findOne().skip(req);
        let result = await query.exec();
        return result;
    },
};