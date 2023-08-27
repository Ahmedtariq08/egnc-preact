/* Generic functions to be used across application */

export const areObjectsEqual = (obj1: object, obj2: object): boolean =>
    Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every((key) => obj1[key as keyof typeof obj1] === obj2[key as keyof typeof obj2]);

export const removeFunctionsFromObject = (object: object): object => {
    let descriptorObj: Object = Object.getOwnPropertyDescriptors(object);
    let outputMap: Map<string, any> = new Map();
    for (const [key, value] of Object.entries(descriptorObj)) {
        if (value.hasOwnProperty('value') && typeof value['value'] !== "function") {
            outputMap.set(key, object[key as keyof typeof object]);
        }
    }
    return Object.fromEntries(outputMap);
}


/* This function tests if nested object array with children is same at all levels,
e.g Questions, Homogenous Declaration, ones using tree data */
type ObjectWithChildren<T> = T & { children?: ObjectWithChildren<T> };
export const areObjectWithChildrenSame = (arr1: ObjectWithChildren<any>[], arr2: ObjectWithChildren<any>[]): any => {
    if (arr1.length !== arr2.length) {
        return false;
    }

    return arr1.every((obj1, index) => {
        const obj2 = arr2[index];

        // Compare properties at the current level
        if (!areObjectsEqual(obj1, obj2)) {
            return false;
        }

        // Recursively compare children arrays
        if (obj1.getChildren() && obj2.getChildren()) {
            return areObjectWithChildrenSame(obj1.getChildren(), obj2.getChildren());
        } else {
            // If one has children and the other doesn't, they are not equal
            return obj1.getChildren() === obj2.getChildren();
        }
    });
}

export const objectHasAllPropertiesOfClass = (object: Object, yourClass: any) => {
    const classWithOnlyProperties = removeFunctionsFromObject(new yourClass());
    return Object.keys(classWithOnlyProperties).every((key) => object[key as keyof typeof object] !== undefined)
}

export const ignoreAllCharacters = (event: any) => {
    let charCode = event.which ? event.which : event.keyCode;
    let char = String.fromCharCode(charCode);
    let replacedValue = char.replace(/[^]/g, "");
    if (char !== replacedValue) {
        event.preventDefault();
    }
};

export const deepCloneArray = (array: any[]) => {
    let newArray = JSON.parse(JSON.stringify(array));
    array.forEach((field, index) => {
        for (const key in field) {
            if (field[key] instanceof Function) {
                newArray[index][key] = field[key];
            }
        }
    });
    return newArray;
}

export const eatNonNumbers = (event: any) => {
    let charCode = event.which ? event.which : event.keyCode;
    let char = String.fromCharCode(charCode);
    // Only allow "+0123456789" (and non-display characters)
    let replacedValue = char.replace(/[^0-9\+]/g, "");
    if (char !== replacedValue) {
        event.preventDefault();
    }
};

// export const createColumnMappingForExport = (columns: Column[]) => {
//   return columns.reduce((columnMapping, column) => {
//     columnMapping[column.Id as keyof typeof columnMapping] = column.Name ?? column.headerText;
//     return columnMapping;
//   }, {});
// };

export const getYesNoString = (attr: boolean): string => {
    if (typeof attr == "boolean") {
        return attr == true ? "Yes" : "No";
    } else {
        return ""
    }
}

export const isValidUrl = (urlString: string): boolean => {
    try {
        return Boolean(new URL(urlString));
    }
    catch (e) {
        return false;
    }
}

export const isValidString = (value: string): boolean => {
    return ![null, undefined, ""].includes(value);
}

//This event updates the value from input into the hook on focus out - caters issue with onValueChanged
export const removeInputFocus = (elementId: string) => {
    document.getElementById(elementId)?.blur();
}

//Generate random 11 character string (e.g 'bxzjw1ezyvr'), can be used for random DOM element Ids
export const generateRandomString = (): string => {
    return Math.random().toString(36).substring(2);
}