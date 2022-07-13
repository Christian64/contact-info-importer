const month = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
} 

const verbalDate = (date) => {
    const newDate = new Date(date)
    return `${newDate.getFullYear()} ${month[newDate.getMonth()]} ${newDate.getDate()}`
}

module.exports = {
    verbalDate
}

