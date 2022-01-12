const { db, connection, Schema, ObjectID, dbHelper } = require("../src/db");
const collection_name = "ad";

const common = require("../common");
const schema = new Schema({
    _id: String,
    id_user: String,
    fileName: String,
    date_add: Date,
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

    },

    delete: async function(req) {

    },

    getRandom: async function(req) {

    },


};