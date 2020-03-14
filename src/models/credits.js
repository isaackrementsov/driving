const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreditSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    date: Date,
    description: String,
    amount: Number
});

const Credit = mongoose.model('Credit', CreditSchema);

module.exports = Credit;
