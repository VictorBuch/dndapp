const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema for users in the database
let userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    addedSpells: { //array for storing spell URL's i
        type: [String]
    }
},{
    timestamps: true,
    collection: 'users'
})

module.exports = mongoose.model('User', userSchema);