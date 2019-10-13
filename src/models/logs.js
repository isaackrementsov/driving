const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    date: Date,
    rides: [Number]
});

const Log = mongoose.model('Log', LogSchema);

module.exports = Log;
