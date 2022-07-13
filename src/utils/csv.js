const getSelectedData = (data, selectedData) => {
    const result = {}
    selectedData.forEach((value, _) => {
        result[toCamelCase(value)] = data[value]
    })
    return result
}

const isDataWrong = (data) => {
    const keys = Object.keys(data)
    let message
    for (const key of keys) {
        const keyCamelCase = toCamelCase(key)
        if (keyCamelCase === 'name') {
            if (!/-/.test(data[keyCamelCase]) === false) message = 'Invalid Name'
        }
        if (keyCamelCase === 'phone') {
            if (/\(\+\d{2}\)[\s|-]((\d{3}|\d{2})[\s|-]|){3}\d{2}/g.test(data[keyCamelCase]) === false) message = 'Invalid Phone Number'
        }
        if (keyCamelCase === 'dateOfBirth') {
            if (/\d{4}[/|-]\d{2}[/|-]\d{2}/.test(data[keyCamelCase]) === false) message = 'Invalid Date of Birth'
        }
        if (keyCamelCase === 'email') {
            if (/^[\w|\d]+\@\w+\.\w+$/.test(data[keyCamelCase]) === false) message = 'Invalid Email'
        }
        if (keyCamelCase === 'address') {
            if (Boolean(data[keyCamelCase]) === false) message = 'Invalid Address'
        }
    }
    return message
}

const toCamelCase = (string) => {
    return string.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

module.exports = { isDataWrong, getSelectedData }