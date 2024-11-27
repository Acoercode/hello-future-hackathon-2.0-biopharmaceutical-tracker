const daysBetween = (date1, date2) => {
    const list = [];
    let day = date1;
    while (day <= date2) {
        list.push(day.toISOString().substring(0, 10));
        const newDate = new Date(day);
        day = new Date(newDate.setDate(day.getDate() + 1));
    }
    return list;
};

module.exports = {
    daysBetween
};