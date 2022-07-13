const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contacts: [{ type: Schema.Types.ObjectId, ref: 'Contacts' }],
    files: [{ type: Schema.Types.ObjectId, ref: 'Files' }]
})

const userModel = model('Users', userSchema)

module.exports = userModel