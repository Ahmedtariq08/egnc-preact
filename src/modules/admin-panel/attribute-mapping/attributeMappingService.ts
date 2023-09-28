import { URLs, requests } from "../../../api";
import { Categories } from "../../../constants";

// ANCHOR - Interfaces / Types / Constants
export const CategorySelections = [
    Categories.ITEM,
    Categories.DECLARATION,
    Categories.SUBSTANCE,
    Categories.AFFECTED_OBJECT,
];
export const defaultCategorySelection = Categories.ITEM;

export interface Attribute {
    name: string;
    wfsid: number[];
    type: string;
    readonly: boolean | undefined;
    required: boolean | undefined;
    possibleValues: string[];
}

export interface MappedAttribute extends Attribute {
    attributeName: string;
}

export interface AttributeObject {
    attribute1: Attribute;
    attribute2: Attribute;
    attribute3: Attribute;
    attribute4: Attribute;
    attribute5: Attribute;
    attribute6?: Attribute; // additional attributes that won't show
    attribute7?: Attribute;
    attribute8?: Attribute;
    attribute9?: Attribute;
    attribute10?: Attribute;
}

// ANCHOR - Utility Functions
export const getEmptyAttribute = (): Attribute => {
    return {
        name: "",
        wfsid: [],
        type: "",
        readonly: undefined,
        required: undefined,
        possibleValues: [],
    };
};

export const getEmptyMappedAttribute = (): MappedAttribute => {
    const emptyAttribute = getEmptyAttribute();
    return { ...emptyAttribute, attributeName: "" };
};

const mapAttribute = (
    attr: Attribute,
    attributeName: string,
): MappedAttribute => {
    return { ...attr, attributeName };
};

/* function used to map response from api to array of attributes to show */
export const mapAttributes = (object: AttributeObject): MappedAttribute[] => {
    const mappedAttributes: MappedAttribute[] = [];
    for (let i = 1; i <= 10; i++) {
        const attributeName = `attribute${i}`;
        const obj = object[attributeName as keyof object];
        mappedAttributes.push(
            obj
                ? mapAttribute(obj, attributeName)
                : mapAttribute(getEmptyAttribute(), attributeName),
        );
    }
    return mappedAttributes;
};

// ANCHOR - APIs
const attributeMappingUrl = `${URLs.MAIN.PREFERENCE}/attributeMapping`;

export const attributeMappingApis = {
    getAttributes: async (value: string) =>
        await requests
            .get<AttributeObject>(`${attributeMappingUrl}/${value}`)
            .then((data) => {
                return mapAttributes(data);
            }),
};
