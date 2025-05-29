class DateHelper {

    static getFirstDayOfMonth(month, year) {
        return new Date(year, month, 1);
    }

    static getFirstDayOfCurrentMonth() {
        const today = new Date();
        return this.getFirstDayOfMonth(today.getMonth(), today.getFullYear());
    }

    static getDayOfADate(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = days[date.getDay()];
        return dayName;
    }

    static getNumberOfDaysOfAMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    static getNumberOfDaysOfCurrentMonth() {
        const today = new Date();
        return this.getNumberOfDaysOfAMonth(today.getMonth(), today.getFullYear());
    }
}

module.exports = { DateHelper }