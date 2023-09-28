import "ojs/ojinputtext";
import "ojs/ojlabel";
import "ojs/ojselectcombobox";
import { useState } from "preact/hooks";
import { type ISearchField, ValidInputs, OjFilterDropdowns } from "./metadata";
import ArrayDataProvider = require("ojs/ojarraydataprovider");

const CLASSES = {
    SEARCH_FIELD: "oj-flex oj-flex-item oj-md-align-items-center oj-sm-padding-4x-horizontal",
    LABEL: "oj-typography-body-md oj-typography-bold",
};

export const AdvancedSearchFields = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const textChangeHandler = (event: any, label: string) => {
        const value = event.detail.value;
        const updatedArray: ISearchField[] = searchFields.map((field) => {
            console.log(field);
            return field.label === label ? { ...field, textProps: { ...field.textProps, value } } : field;
        });
        console.log(updatedArray);
        setSearchFields(updatedArray);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const ListChangeHandler = (event: any, label: string) => {
    //     const value = event.detail.value;
    //     const updatedArray: ISearchField[] = searchFields.map((field) => {
    //         console.log(field);
    //         return field.label === label
    //             ? { ...field, textProps: { ...field.textProps, value } }
    //             : field;
    //     });
    //     console.log(updatedArray);
    //     setSearchFields(updatedArray);
    // };

    const defaultFields: ISearchField[] = [
        {
            inputType: ValidInputs.SINGLE_LIST,
            filter: OjFilterDropdowns.StartEqualContain,
            label: "Queue",
            singleListProps: {
                onvalueChanged: (event) => {
                    textChangeHandler(event, "Queue");
                },
            },
        },
        {
            inputType: ValidInputs.TEXT,
            label: "Name",
            textProps: {
                onvalueChanged: (event) => {
                    textChangeHandler(event, "Name");
                },
            },
        },
        {
            inputType: ValidInputs.TEXT,
            label: "Location",
            textProps: {
                onvalueChanged: (event) => {
                    textChangeHandler(event, "Location");
                },
            },
        },
    ];

    const [searchFields, setSearchFields] = useState<ISearchField[]>(defaultFields);

    return (
        <>
            {Array.isArray(searchFields) &&
                searchFields.map((searchField) => {
                    return <DisplaySearchField searchField={searchField} key={searchField.label} />;
                })}
        </>
    );
};

const DisplaySearchField = (props: { searchField: ISearchField }) => {
    const { searchField } = props;
    // const [field, setField] = useState<ISearchField>(searchField);

    // useEffect(() => {
    //     console.log('field changed');
    //     console.log(field);
    // }, [field]);

    // const textChangeHandler = (event: any) => {
    //     const value = event.detail.value;
    //     console.log(value);
    //     setField((prevState: ISearchField) => { return { ...prevState, value: value } });
    // }

    const Label = () => {
        return (
            <div className={`oj-md-2 oj-md-justify-content-flex-end ${CLASSES.SEARCH_FIELD}`}>
                <oj-label class={CLASSES.LABEL}>{searchField.label}</oj-label>
            </div>
        );
    };

    const Filter = () => {
        const optionsDp =
            Array.isArray(searchField.filter) &&
            new ArrayDataProvider(searchField.filter, {
                keyAttributes: "value",
            });
        return optionsDp ? (
            <div className={`oj-md-3 ${CLASSES.SEARCH_FIELD}`}>
                <oj-combobox-one options={optionsDp}></oj-combobox-one>
            </div>
        ) : (
            <></>
        );
    };

    const InputElement = () => {
        const element = () => {
            switch (searchField.inputType) {
                case ValidInputs.TEXT:
                    return <oj-input-text {...searchField.textProps}></oj-input-text>;
                case ValidInputs.SINGLE_LIST:
                    return <oj-combobox-one {...searchField.singleListProps}></oj-combobox-one>;
            }
        };

        return <div className={`oj-md-3 ${CLASSES.SEARCH_FIELD}`}>{element()}</div>;
    };

    return (
        <div className="oj-flex-item" style={{ maxHeight: "60px", maxWidth: "50vw" }}>
            <div className="oj-flex oj-flex-direction-row">
                <Label />
                <Filter />
                <InputElement />
            </div>
        </div>
    );
};
