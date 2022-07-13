const { model, Schema } = require('mongoose')
const fileSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    status: { type: String, default: 'On Hold' },
    fileName: String,
    fileOriginalName: String,
    createdAt: { type: Date, dafault: Date.now() },
    updatedAt: { type: Date, dafault: Date.now() }
})

module.exports = model('Files', fileSchema)