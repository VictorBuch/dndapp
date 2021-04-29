const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    addedSpells: {
        type: [String]
    }
},{
    timestamps: true,
    collection: 'users'
})

module.exports = mongoose.model('User', userSchema);