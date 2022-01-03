const { db, connection, Schema, ObjectID, dbHelper } = require("../src/db");
const collection_name = "playlist";
const
const schema = new Schema({
    _id: String,
    url: String,
    name: String,
    description: String,
    status: String,
    user_id: String,
    date_add: Date,
});
// schema.plugin(dataTables);
const model = db.model(collection_name, schema, `${collection_name}s`);

module.exports = {
    getByUserId: async function(req) {
        let { _id } = req;
        let query = model.findById(_id);
        let result = await query.exec();
        return result;
    },

    save: async function(req) {
        let { name, description, status, user_id } = req;

        let _id = dbHelper.generateIdTechnique();
        let document = new model({
            _id: _id,
            status: status,
            user_id: user_id,
            date_add: new Date(),
        })
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

    getVideos: async function(req) {},
};