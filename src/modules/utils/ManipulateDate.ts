import moment from "moment";

function transformStringInDate(date){
    return moment(date, "DD-MM-YYYY");
}

function addDaysInDate(date, day){
    return moment(date).add(day, "days");
}

function addHourAndMinute(date, hours, minutes){
    return moment(date).hours(hours).minutes(minutes);
}

function addWeeksInDate(date, week){
    return moment(date).add(week, "weeks");
}

function dateLocale(date = undefined) {
    return moment(date);
}

function dayOfWeek(date, day = undefined){
    return moment(date).day(day);
}

function differenceBetweenDates(dateStart, dateEnd) {
    return dateStart.diff(dateEnd);
}

function formatDate(date, format) {
    return moment(date).format(format)
}


export {
    addDaysInDate,
    addHourAndMinute,
    addWeeksInDate,
    dateLocale,
    dayOfWeek,
    differenceBetweenDates,
    formatDate,
    transformStringInDate,
}