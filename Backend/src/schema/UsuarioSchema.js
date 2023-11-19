const {Schema} = require('mongoose');


export const UserSchema = new Schema({
    id: Number,
    email: String,
    name: String,
    password: String,
    token: String
})