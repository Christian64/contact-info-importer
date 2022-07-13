const { model, Schema } = require('mongoose')

const contactInfoSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    name: String,
    dateOfBirth: Date,
    phone: Number,
    address: String,
    creditCard: String,
    creditCardNetwork: String,
    email: String,
    hasError: { type: Boolean, default: false },
    errorDetail: { type: String, default: null }
})

const contactInfoModel = model('Contacts', contactInfoSchema)
module.exports = contactInfoModel