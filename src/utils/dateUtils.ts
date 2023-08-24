const timeSeperator = " ";
const dateSeperator = "-";
const months = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];

/**
 * @param date 2023-02-23 00:00:00
 * @returns 2023-02-23
 */
export const dateTimeToDate = (date: string): string => {
    if (date && date.includes(dateSeperator)) {
        return date.includes(timeSeperator) ? date.split(timeSeperator)[0] : date.substring(0, 10).trim();
    }
    return date;
}

/**
 * @param date 2023-02-23 / 2023-02-23T00:00:
 * @returns 2023-02-23 00:00:00
 */
export const dateFormatterForRequest = (date: string): string | undefined => {
    if (date) {
        if (date.includes('T'))
            return date.split('T')[0] + " 00:00:00";
        else
            return date + " 00:00:00";
    }
}

/**
 * @param date 2023-02-23 00:00:00
 * @returns February 23, 2023
 */
export const dateFormatter = (date: string | null): string | null => {
    let outputDate = date;
    if (date) {
        try {
            if (date.includes(timeSeperator)) {
                date = date.split(timeSeperator)[0];
            }
            if (date.includes(dateSeperator)) {
                let splitDate = date.split(dateSeperator);
                let year = splitDate[0];
                year = year.length > 4 ? year.substring(0, 4) : year;
                let month = months[parseInt(splitDate[1]) - 1];
                let day = splitDate[2];
                day = day.length > 2 ? day.substring(0, 2) : day;
                outputDate = `${month} ${day}, ${year}`;
            }
        } catch (error) {
            outputDate = date;
        }
    }
    return outputDate;
}

/**
 * @param dateStr 
 * @returns ISO string version of the date
 */
export const convertIsoString = (dateStr: string): string => {
    let result = dateStr;
    if (dateStr) {
        try {
            const date = new Date(dateStr);
            result = date.toISOString();
        } catch (error) {
            result = dateStr;
        }
    } else {
        result = ""
    }
    return result;
}

/**
 * @usage Sorts the array passed.
 * @param array Input array that has to be sorted
 * @param dateKey1 sort on the basis of this key
 * @param dateKey2 optional - takes this key into consideration as well
 */
export const sortDataWithDates = (array: any[], dateKey1: string, dateKey2?: string): void => {
    array.sort((a, b) => {
        const getDateValue = (item: any, key: string) => {
            const date = item[key];
            return date === null ? 0 : new Date(date).getTime();
        };
        const date1 = dateKey2 ? getDateValue(a, dateKey1) || getDateValue(a, dateKey2) : getDateValue(a, dateKey1);
        const date2 = dateKey2 ? getDateValue(b, dateKey1) || getDateValue(b, dateKey2) : getDateValue(b, dateKey1);
        return date2 - date1;
    });
};