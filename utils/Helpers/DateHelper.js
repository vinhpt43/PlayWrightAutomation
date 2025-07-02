class DateHelper {

    static getNumberOfDaysOfAMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    static getFirstDayOfAMonth(month, year) {
        return this.formatDateToYYYYMMDD(new Date(year, month - 1, 1));
    }

    static getLastDayOfAMonth(month, year) {
        return this.formatDateToYYYYMMDD(new Date(year, month - 1, this.getNumberOfDaysOfAMonth(month, year)));
    }

    static getNumberOfDaysOfCurrentMonth() {
        const today = new Date();
        return this.getNumberOfDaysOfAMonth(today.getMonth() + 1, today.getFullYear());
    }

    static getFirstDayOfCurrentMonth() {
        const today = new Date();
        return this.getFirstDayOfAMonth(today.getMonth() + 1, today.getFullYear());
    }

    static getLastDayOfCurrentMonth() {
        const today = new Date();
        return this.getLastDayOfAMonth(today.getMonth() + 1, today.getFullYear());
    }

    static getDayOfADate(date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = days[date.getDay()];
        return dayName;
    }

    static formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
}

module.exports = { DateHelper }