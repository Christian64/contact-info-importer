const ContactInfo = require('../models/contactInfo')
const User = require('../models/users')
const File = require('../models/files')
const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')
const cardType = require('credit-card-type')
const { getSelectedData, isDataWrong } = require('../utils/csv')
const { verbalDate } = require('../utils/date')


const createContact = async (req, res) => {
    const tempFolderRoot = path.join(__dirname, `../../temp/${req.file.filename}`)
    fs.rename(tempFolderRoot, `${tempFolderRoot}.csv`, error => console.log(error))
    const contactUsers = []

    fs.createReadStream(path.join(__dirname, `../../temp/${req.file.filename}.csv`))
        .pipe(csv())
        .on('data', (data) => {
            const selectData = getSelectedData(data, req.body.fields)
            if (selectData['Credit Card']) {
                selectData['creditCardNetwork'] = cardType(selectData['Credit Card'])[0].niceType
            }
            const errorMessage = isDataWrong(selectData)
            if (errorMessage) {
                selectData['hasError'] = true
                selectData['errorDetail'] = errorMessage
            }
            contactUsers.push(selectData)
        })
        .on('end', async () => {
            for (const contactUser of contactUsers) {
                const user = await User.findById(req.session.id).select(['id', 'contacts'])
                const contactEmailAlradyExist = await ContactInfo.findOne({ email: contactUser.email, userId: req.session.id })
                if (!contactEmailAlradyExist) {
                    const contact = await ContactInfo.create({
                        ...contactUser,
                        userId: req.session.id,
                        hasError: false || contactUser['hasError'],
                        errorDetail: null || contactUser['errorDetail']
                    })
                    user.contacts.push(contact.id)
                    await user.save()
                }
            }
        })
    await File.create({
        userId: req.session.id,
        status: 'Finished',
        fileName: req.file.filename,
        fileOriginalName: req.file.originalname
    })
    res.json({ msg: 'Ok' })
}

const getContacts = async (req, res) => {
    try {
        const { limit, page, actives } = req.query
        const contactsParsed = []
        const contacts = await ContactInfo.find({ userId: req.session.id })
            .limit(limit)
            .skip(limit * page)
            .where({ hasError: actives })
            contacts.forEach(contact => {
                contact['dateOfBirth'] = verbalDate(contact.dateOfBirth)
                contactsParsed.push({
                    ...contact._doc,
                    dateOfBirth: verbalDate(contact['dateOfBirth'])
                })
            })

        res.json(contactsParsed)
    } catch (error) {
        console.log({ error })
        res.status(401).send('something was wrong')
    }
}


module.exports = {
    createContact,
    getContacts
}