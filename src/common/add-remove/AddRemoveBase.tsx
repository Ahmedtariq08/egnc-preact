/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterFactory } from "ojs/ojdataprovider";
import { Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Popup } from "../popup/Popup";
import { CONSTANTS, SLOTS, TABLE, TEXT } from "./metadata";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import ListDataProviderView = require("ojs/ojlistdataproviderview");

export interface MetaData {
    selectedAttributes: any[];
    availableAttributes: any[];
}

export interface AddRemovePopupProps {
    show: boolean;
    metadata: MetaData;
    closePopup: () => void;
    okFunction: (metadata: MetaData) => void;
    popupTitle?: string; // default: Add Columns
    columnHeaders?: any[]; // default: Add Column headers
    rowIdentifier?: string; // default: 'Id'
}
/**
 * @description This Add Remove Attributes component is used only
 * for preact based containers only. Uses Custom popup
 */
export const AddRemovePopup = (props: AddRemovePopupProps) => {
    const {
        show,
        metadata,
        closePopup,
        okFunction,
        popupTitle = CONSTANTS.MODAL_TITLE_COLUMNS,
        columnHeaders = TABLE.COLUMNS_HEADERS,
        rowIdentifier = TABLE.ROW_IDENTIFIER,
    } = props;
    const [filter, setFilter] = useState("");
    const [disableAdd, setDisableAdd] = useState<boolean>(false);
    const [disableRemove, setDisableRemove] = useState<boolean>(false);

    // selected attributes
    const [selectedAttributes, setSelectedAttributes] = useState<any[]>([]);
    // available attributes
    const [availableAttributes, setAvailableAttributes] = useState<any[]>([]);
    const [selectedAvailableAttributes, setSelectedAvailableAttributes] = useState<any[]>([]);
    const [selectedSelectedAttributes, setSelectedSelectedAttributes] = useState<any[]>([]);
    const [availableAttributesDataprovider, setAvailableAttributesDataprovider] = useState(
        new ArrayDataProvider([], { idAttribute: rowIdentifier }),
    );
    const [selectedAttributesDataprovider, setSelectedAttributesDataprovider] = useState(
        new ArrayDataProvider([], { idAttribute: rowIdentifier }),
    );

    useEffect(() => {
        processColumnData();
    }, [metadata]);

    useEffect(() => {
        setDataProviders();
    }, [availableAttributes, selectedAttributes, filter]);

    useEffect(() => {
        setDisableAdd(isSelectionEmpty(selectedAvailableAttributes));
        setDisableRemove(isSelectionEmpty(selectedSelectedAttributes));
    }, [selectedAvailableAttributes, selectedSelectedAttributes]);

    const setDataProviders = () => {
        setAvailableAttributesDataprovider(getListwithFilterCriterion(availableAttributes));
        setSelectedAttributesDataprovider(getListwithFilterCriterion(selectedAttributes));
    };

    const processColumnData = () => {
        if (metadata) {
            setSelectedAttributes(metadata.selectedAttributes);
            setAvailableAttributes(metadata.availableAttributes);
            setDataProviders();
        }
    };

    const okAction = () => {
        okFunction({
            selectedAttributes,
            availableAttributes,
        });
        closePopup();
    };

    const cancelAction = () => {
        setSelectedAttributes(metadata.selectedAttributes);
        setAvailableAttributes(metadata.availableAttributes);
        closePopup();
    };

    const getListwithFilterCriterion = (attributes: any[]) => {
        const filterCriterion =
            filter.length > 0 ? FilterFactory.getFilter({ filterDef: { text: filter } }) : undefined;
        const arrayDataProvider = new ArrayDataProvider(attributes, {
            keyAttributes: rowIdentifier,
        });
        return new ListDataProviderView(arrayDataProvider, {
            filterCriterion,
        });
    };

    // ANCHOR - Selections
    const isSelectionEmpty = (selection: any[]) => {
        return !Array.isArray(selection) || selection.length === 0;
    };

    /**
     * @param event Caused by onSelectionChanged by oj-table with multiple selection
     * @returns Boolean : Whether previousValue and value have same selections
     */
    const isSelectionSame = (event: any) => {
        const { previousValue, value } = event.detail;
        let arraysAreSame: boolean = false;
        if (Array.isArray(previousValue) && Array.isArray(value)) {
            const previousKeys = previousValue.map((obj) => obj.startKey?.row).filter((e) => e !== undefined);
            const latestKeys = value.map((obj) => obj.startKey?.row).filter((e) => e !== undefined);
            arraysAreSame =
                previousKeys.length === latestKeys.length &&
                previousKeys.every((element) => latestKeys.includes(element));
        }
        const inversionIsSame = previousValue?.inverted === value?.inverted;
        return arraysAreSame && inversionIsSame;
    };

    /**
     * @param event onSelectionChanged by oj-table with multiple selection
     * @param mainArray Array binded to table
     * @param setSourceArray function to set selections of main array
     * @description Maintain selections of Available / Selected Attributes
     */
    const handleSelection = (event: any, mainArray: any[], setSourceArray: (array: any[]) => void) => {
        const value = event.detail.value;
        if (!isSelectionSame(event)) {
            const { inverted, length } = value;
            let tempArray: any[] = [];
            if (inverted as boolean) {
                // inverted is true only in case of select all
                if (length === 0) {
                    mainArray.forEach((element) => {
                        tempArray.push(element);
                    });
                } else {
                    const elementsToExclude = value.map((element: { startKey: { row: any } }) => {
                        return element.startKey.row;
                    });
                    tempArray = mainArray.filter((element) => {
                        return !elementsToExclude.includes(element[rowIdentifier]);
                    });
                }
            } else {
                const elementsToInclude = value.map((element: any) => {
                    return element.startKey.row;
                });
                tempArray = mainArray.filter((element) => {
                    return elementsToInclude.includes(element[rowIdentifier]);
                });
            }
            const filteredArray = tempArray.filter((e) => e !== undefined);
            setSourceArray(filteredArray); // undefined values caught when checkbox unchecked
        }
    };

    // Available to selected attributes
    const addSelectedAvailableAttributes = () => {
        refreshColumnSettings(
            availableAttributes,
            setAvailableAttributes,
            selectedAvailableAttributes,
            selectedAttributes,
            setSelectedAttributes,
        );
    };

    // selected to available attributes
    const removeSelectedSelectedAttributes = () => {
        refreshColumnSettings(
            selectedAttributes,
            setSelectedAttributes,
            selectedSelectedAttributes,
            availableAttributes,
            setAvailableAttributes,
        );
    };

    // Source to Target
    const refreshColumnSettings = (
        sourceCol: any[],
        setSourceCol: (arr: any[]) => void,
        selectedSourceCol: any[],
        targetCol: any[],
        setTargetCol: (arr: any[]) => void,
    ) => {
        if (!selectedSourceCol.length) {
            return;
        }
        const filteredSourceColumns = sourceCol.filter(
            (col) => !selectedSourceCol.map(({ Id }) => Id).includes(col.Id),
        ); // remove selected columns from source columns
        setSourceCol(filteredSourceColumns);
        const newTargetColumns = [...targetCol];
        selectedSourceCol.forEach((col) => {
            // push selected source columns into target if not already present
            if (!newTargetColumns.map(({ Id }) => Id).includes(col.Id)) {
                newTargetColumns.push(col);
            }
        });
        setTargetCol(newTargetColumns);
        resetSelections();
    };

    const resetSelections = () => {
        setSelectedAvailableAttributes([]);
        setSelectedSelectedAttributes([]);
    };

    // Elements
    const table = (
        id: string,
        ariaLabel: string,
        data: ArrayDataProvider<unknown, unknown>,
        onSelectionChanged: (event: any) => void,
    ) => {
        return (
            <oj-table
                id={id}
                aria-label={ariaLabel}
                data={data}
                columnsDefault={TABLE.COLUMNS_DEFAULT}
                columns={columnHeaders}
                selectionMode={TABLE.SELECTION}
                onselectionChanged={onSelectionChanged}
                class={TABLE.CLASS}
                style={TABLE.STYLE}
            ></oj-table>
        );
    };

    const title = (text: string) => {
        return <h6>{text}</h6>;
    };

    const button = (text: string, action: () => void, disable?: boolean, styleClass?: string) => {
        return (
            <oj-button class={styleClass} onClick={action} disabled={disable}>
                {text}
            </oj-button>
        );
    };

    const popupBody = () => {
        return (
            <div slot={SLOTS.BODY}>
                <div id="container">
                    <oj-input-text
                        id="filter"
                        style="width:300px"
                        spellcheck={false}
                        label-hint="Enter attribute name"
                        label-edge="inside"
                        value={filter}
                        placeholder="Type to Filter"
                        onrawValueChanged={(event) => {
                            setFilter(event.detail.value);
                        }}
                        clearIcon="always"
                    />

                    {title(TABLE.TITLE1)}

                    {table(TABLE.ID1, TABLE.TITLE1, availableAttributesDataprovider, (event: any) => {
                        handleSelection(event, availableAttributes, setSelectedAvailableAttributes);
                    })}

                    <oj-label class={TEXT.LABEL}></oj-label>

                    <div className="oj-flex oj-sm-justify-content-flex-end">
                        {button(
                            TEXT.BUTTON.ADD,
                            addSelectedAvailableAttributes,
                            disableAdd,
                            "oj-sm-margin-2x-horizontal",
                        )}
                        {button(TEXT.BUTTON.REMOVE, removeSelectedSelectedAttributes, disableRemove)}
                    </div>

                    {title(TABLE.TITLE2)}

                    {table(TABLE.ID2, TABLE.TITLE2, selectedAttributesDataprovider, (event: any) => {
                        handleSelection(event, selectedAttributes, setSelectedSelectedAttributes);
                    })}
                </div>
            </div>
        );
    };

    const popupFooter = () => {
        return (
            <Fragment>
                {button(TEXT.BUTTON.OK, okAction)}
                {button(TEXT.BUTTON.CANCEL, cancelAction)}
            </Fragment>
        );
    };

    return <Popup show={show} body={popupBody} footer={popupFooter} popupTitle={popupTitle} />;
};
