import { areObjectsEqual, getYesNoString, isValidUrl } from "../generic";

describe("areObjectsEqual function", () => {
    it("should return true for equal objects", () => {
        const obj1 = { a: 1, b: 2, c: "hello" };
        const obj2 = { a: 1, b: 2, c: "hello" };
        expect(areObjectsEqual(obj1, obj2)).toBe(true);
    });

    it("should return false for objects with different values", () => {
        const obj1 = { a: 1, b: 2, c: "hello" };
        const obj2 = { a: 1, b: 2, c: "world" };
        expect(areObjectsEqual(obj1, obj2)).toBe(false);
    });

    it("should return false for objects with different keys", () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { a: 1, c: 2 };
        expect(areObjectsEqual(obj1, obj2)).toBe(false);
    });

    it("should return false for objects with different lengths", () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { a: 1, b: 2, c: 3 };
        expect(areObjectsEqual(obj1, obj2)).toBe(false);
    });

    it("should return true for both undefined objects", () => {
        expect(areObjectsEqual(undefined, undefined)).toBe(true);
    });

    it("should return false when one object is undefined", () => {
        const obj1 = { a: 1, b: 2 };
        expect(areObjectsEqual(obj1, undefined)).toBe(false);
    });

    it("should return false when one object is null", () => {
        const obj1 = { a: 1, b: 2 };
        const obj2: unknown = null;
        expect(areObjectsEqual(obj1, obj2 as undefined)).toBe(false);
    });
});

describe("getYesNoString function", () => {
    it('should return "Yes" for true boolean attribute', () => {
        const attr = true;
        expect(getYesNoString(attr)).toEqual("Yes");
    });

    it('should return "No" for false boolean attribute', () => {
        const attr = false;
        expect(getYesNoString(attr)).toEqual("No");
    });

    it("should return an empty string for undefined attribute", () => {
        const attr: unknown = undefined;
        expect(getYesNoString(attr as boolean)).toEqual("");
    });

    it("should return an empty string for null attribute", () => {
        const attr: unknown = null;
        expect(getYesNoString(attr as boolean)).toEqual("");
    });

    it("should return an empty string for non-boolean attributes", () => {
        const attr: unknown = "string";
        expect(getYesNoString(attr as boolean)).toEqual("");
    });

    it("should return an empty string for numeric attributes", () => {
        const attr: unknown = 42;
        expect(getYesNoString(attr as boolean)).toEqual("");
    });

    // it('should return "Yes" for boolean true as a string attribute', () => {
    //     const attr: unknown = "true";
    //     expect(getYesNoString(attr as boolean)).toEqual("Yes");
    // });

    // it('should return "No" for boolean false as a string attribute', () => {
    //     const attr: unknown = "false";
    //     expect(getYesNoString(attr as boolean)).toEqual("No");
    // });
});

describe("isValidUrl function", () => {
    it("should return true for a valid URL (http / https)", () => {
        const validUrls = [
            "https://www.example.com",
            "http://www.example.com",
            "https://sub.example.com/path",
            "http://localhost:8080",
            "http://127.0.0.1",
        ];

        validUrls.forEach((url) => {
            expect(isValidUrl(url)).toBe(true);
        });
    });

    it("should return false for an invalid URL", () => {
        const invalidUrls = ["not_a_url", "example.com", "htp://example.com", "invalid://url"];

        invalidUrls.forEach((url) => {
            const result = isValidUrl(url);
            if (result) {
                console.log(url);
            }
            expect(isValidUrl(url)).toBe(false);
        });
    });

    it("should return false for null input", () => {
        const url: unknown = null;
        expect(isValidUrl(url as string)).toBe(false);
    });

    it("should return false for undefined input", () => {
        const url: unknown = undefined;
        expect(isValidUrl(url as string)).toBe(false);
    });

    it("should return false for empty string input", () => {
        const url = "";
        expect(isValidUrl(url)).toBe(false);
    });
});
