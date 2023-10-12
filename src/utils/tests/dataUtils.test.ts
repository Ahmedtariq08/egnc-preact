import {
    convertIsoString,
    dateFormatter,
    dateFormatterForRequest,
    dateTimeToDate,
    sortDataWithDates,
} from "../dateUtils";

describe("dateTimeToDate", () => {
    it("should return the date part when given a date with time", () => {
        const input = "2023-09-28 15:30:00";
        const expectedOutput = "2023-09-28";
        expect(dateTimeToDate(input)).toEqual(expectedOutput);
    });

    it("should return the date part when given a date with time and milliseconds", () => {
        const input = "2023-09-28 15:30:00.123";
        const expectedOutput = "2023-09-28";
        expect(dateTimeToDate(input)).toEqual(expectedOutput);
    });

    it("should return the input date if it does not contain a date separator", () => {
        const input = "20230928 15:30:00";
        expect(dateTimeToDate(input)).toEqual(input);
    });

    it("should return the input date if it contains a date separator but no time separator", () => {
        const input = "2023-09-28";
        expect(dateTimeToDate(input)).toEqual(input);
    });

    it("should return the input date if it is an empty string", () => {
        const input = "";
        expect(dateTimeToDate(input)).toEqual(input);
    });

    it("should return null if date is null", () => {
        const nullValue: unknown = null;
        expect(dateTimeToDate(nullValue as string)).toEqual(nullValue);
    });

    it("should return undefined if date is undefined", () => {
        const nullValue: unknown = undefined;
        expect(dateTimeToDate(nullValue as string)).toEqual(nullValue);
    });
});

describe("dateFormatterForRequest", () => {
    it('should format a date string with "T" separator to include time', () => {
        const input = "2023-09-28T15:30:00";
        const expectedOutput = "2023-09-28 00:00:00";
        expect(dateFormatterForRequest(input)).toEqual(expectedOutput);
    });

    it('should format a date string without "T" separator to include time', () => {
        const input = "2023-09-28";
        const expectedOutput = "2023-09-28 00:00:00";
        expect(dateFormatterForRequest(input)).toEqual(expectedOutput);
    });

    it("should return undefined when the input date is empty", () => {
        const input = "";
        expect(dateFormatterForRequest(input)).toBeUndefined();
    });

    it("should return undefined when the input date is null", () => {
        const input: unknown = null;
        expect(dateFormatterForRequest(input as string)).toBeUndefined();
    });

    it("should return undefined when the input date is undefined", () => {
        const input: unknown = undefined;
        expect(dateFormatterForRequest(input as string)).toBeUndefined();
    });

    it("should handle input with time but no date part", () => {
        const input = "T15:30:00";
        const expectedOutput = " 00:00:00";
        expect(dateFormatterForRequest(input)).toEqual(expectedOutput);
    });

    it('should handle input with multiple "T" separators', () => {
        const input = "2023-09-28T15:30:00T12:00:00";
        const expectedOutput = "2023-09-28 00:00:00";
        expect(dateFormatterForRequest(input)).toEqual(expectedOutput);
    });
});

describe("dateFormatter", () => {
    it("should format a valid date string with time correctly", () => {
        const input = "2023-02-23 00:00:00";
        const expectedOutput = "February 23, 2023";
        expect(dateFormatter(input)).toEqual(expectedOutput);
    });

    it("should format a valid date string without time correctly", () => {
        const input = "2023-02-23";
        const expectedOutput = "February 23, 2023";
        expect(dateFormatter(input)).toEqual(expectedOutput);
    });

    it("should handle an invalid date format string and return input date", () => {
        const input = "2023/02/23";
        expect(dateFormatter(input)).toEqual(input);
    });

    it("should handle invalid input and return the input date", () => {
        const input = "invalid-date";
        expect(dateFormatter(input)).toEqual(input);
    });

    it("should handle null input and return null", () => {
        const input = null;
        expect(dateFormatter(input)).toBeNull();
    });

    it("should handle input with extra characters and still format it correctly", () => {
        const input = "2023-02-23Textra-characters-here 00:00:00";
        const expectedOutput = "February 23, 2023";
        expect(dateFormatter(input)).toEqual(expectedOutput);
    });

    it("should truncate year if greater than 4 digits", () => {
        const input = "10000-02-23 00:00:00";
        const expectedOutput = "February 23, 1000"; // Year truncated to 4 digits
        expect(dateFormatter(input)).toEqual(expectedOutput);
    });

    it("should truncate day if greater than 2 digits", () => {
        const input = "2023-02-9999 00:00:00";
        const expectedOutput = "February 99, 2023"; // Day truncated to 2 digits
        expect(dateFormatter(input)).toEqual(expectedOutput);
    });

    it("should add [Incorrect Month] if month is greater than 12", () => {
        const input = "2023-13-23 00:00:00";
        const expectedOutput = "[Incorrect Month] 23, 2023"; // Invalid month
        expect(dateFormatter(input)).toEqual(expectedOutput);
    });
});

describe("convertIsoString", () => {
    // Correct dates
    it("should convert [2023-3-14] string correctly to ISO string", () => {
        const input = "2023-3-14";
        const expectedOutput = "2023-03-14T00:00:00.000Z";
        expect(convertIsoString(input)).toEqual(expectedOutput);
    });

    it("should convert [2023/3/14] string correctly to ISO string", () => {
        const input = "2023/3/14";
        const expectedOutput = "2023-03-14T00:00:00.000Z";
        expect(convertIsoString(input)).toEqual(expectedOutput);
    });

    it("should convert [14 March, 2023] string correctly to ISO string", () => {
        const input = "14 March, 2023";
        const expectedOutput = "2023-03-14T00:00:00.000Z";
        expect(convertIsoString(input)).toEqual(expectedOutput);
    });

    it("should convert [2023-3-14 15:30:00] string correctly to ISO string", () => {
        const input = "2023-3-14 15:30:00";
        const expectedOutput = "2023-03-14T15:30:00.000Z";
        expect(convertIsoString(input)).toEqual(expectedOutput);
    });

    it("should handle a valid date string with local time offset correctly", () => {
        const input = "2023-09-28 15:30:00+02:00";
        const expectedOutput = "2023-09-28T15:30:00.000Z";
        expect(convertIsoString(input)).toEqual(expectedOutput);
    });

    // Invalid Date
    it("should return original date if format is not supported [14-03-2023]", () => {
        const input = "14-03-2023";
        expect(convertIsoString(input)).toEqual(input);
    });

    it("should handle an invalid date string and return the same string", () => {
        const input = "invalid-date";
        expect(convertIsoString(input)).toEqual(input);
    });

    it("should handle null input and return an empty string", () => {
        const input: unknown = null;
        expect(convertIsoString(input as string)).toEqual("");
    });

    it("should handle empty input and return an empty string", () => {
        const input = "";
        expect(convertIsoString(input)).toEqual("");
    });
});

describe("sortDataWithDates", () => {
    it("should sort an array of objects by a single date key that is present", () => {
        const array = [{ date: "2023-09-28" }, { date: "2023-09-27" }, { date: "2023-09-29" }];
        sortDataWithDates(array, "date");
        const expectedArray = [{ date: "2023-09-29" }, { date: "2023-09-28" }, { date: "2023-09-27" }];
        expect(array).toEqual(expectedArray);
    });

    it("should not sort an array of objects by a single date key that not is present", () => {
        const array = [{ date: "2023-09-28" }, { date: "2023-09-27" }, { date: "2023-09-29" }];
        sortDataWithDates(array, "notpresent");
        expect(array).toEqual(array);
    });

    it("should sort an array of objects by first key given both keys are present", () => {
        const array = [
            { date1: "2023-09-28", date2: "2023-09-29" },
            { date1: "2023-09-27", date2: "2023-09-28" },
            { date1: "2023-09-29", date2: "2023-09-27" },
        ];
        sortDataWithDates(array, "date1", "date2");
        const expectedArray = [
            { date1: "2023-09-29", date2: "2023-09-27" },
            { date1: "2023-09-28", date2: "2023-09-29" },
            { date1: "2023-09-27", date2: "2023-09-28" },
        ];
        expect(array).toEqual(expectedArray);
    });

    it("should sort an array of objects by second key if first key is not present", () => {
        const array = [
            { date1: "2023-09-28", date2: "2023-09-29" },
            { date1: "2023-09-27", date2: "2023-09-28" },
            { date1: "2023-09-29", date2: "2023-09-27" },
        ];
        sortDataWithDates(array, "notpresent", "date2");
        const expectedArray = [
            { date1: "2023-09-28", date2: "2023-09-29" },
            { date1: "2023-09-27", date2: "2023-09-28" },
            { date1: "2023-09-29", date2: "2023-09-27" },
        ];
        expect(array).toEqual(expectedArray);
    });

    it("should handle null date values", () => {
        const array = [{ date: "2023-09-28" }, { date: null }, { date: "2023-09-27" }];
        sortDataWithDates(array, "date");
        const expectedArray = [{ date: "2023-09-28" }, { date: "2023-09-27" }, { date: null }];
        expect(array).toEqual(expectedArray);
    });

    it("should handle empty arrays", () => {
        const array: unknown[] = [];
        sortDataWithDates(array, "date");
        expect(array).toEqual([]);
    });
});
