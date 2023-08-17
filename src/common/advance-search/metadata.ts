import { InputTextIntrinsicProps } from "@oracle/oraclejet/ojinputtext"
import { ComboboxOneIntrinsicProps } from "@oracle/oraclejet/ojselectcombobox"
import { ComboboxManyIntrinsicProps } from "@oracle/oraclejet/ojselectcombobox"

//This type can be moved to utils
export type OjOption = {
    value: unknown,
    label: string
}

export enum ValidInputs {
    TEXT = 'text',
    NUMBER = 'number',
    SINGLE_LIST = 'singleList',
    MULTI_LIST = 'multipleList',
    DATE = 'date',
}

export const OjFilterDropdowns = {
    StartEqualContain: [{ value: "start", label: "Starts With" }, { value: "equals", label: "Equals" }, { value: "contains", label: "Contains" }],
    TrueFalse: [{ value: true, label: "True" }, { value: false, label: "False" }],
    ContainsNullNot: [{ value: "contains", label: "Contains" }, { value: "null", label: "Is Null" }, { value: "isNotNull", label: "Is Not Null" }],
    YesNo: [{ value: true, label: "Yes" }, { value: false, label: "No" }],
}

export interface ISearchField {
    label: string,  //unique identifier
    inputType: ValidInputs
    filter?: OjOption[] //if present it will show filter dropdown in searchFields
    textProps?: InputTextIntrinsicProps
    singleListProps?: ComboboxOneIntrinsicProps //pass if single selection list 
    multiListProps?: ComboboxManyIntrinsicProps
}

// export interface ITextSearchField extends IBaseSearchField {
//     value: string | undefined
//     textProps?: InputTextIntrinsicProps
// }
// export interface ISingleListSearchField extends IBaseSearchField {
//     value: any[]
//     singleListProps?: ComboboxOneIntrinsicProps
// }

// export type ISearchField = ITextSearchField | ISingleListSearchField;

// const test: ISearchField = {
//     label: "Hello",
//     inputType: ValidInputs.TEXT,
//     value: undefined,
// }