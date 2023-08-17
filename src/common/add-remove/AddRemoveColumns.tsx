import { Column } from "../[constants]/types";
import { AddRemovePopup, MetaData } from './AddRemoveBase';

// export const AddRemoveColumns = (props: AddRemoveProps) => {
//     return <AddRemove {...props} />
// }

export type ColumnsMetaData = {
    addedColumns: Column[],
    columnsToBeAdded: Column[],
}

export type AddRemoveColumnsPopupProps = {
    show: boolean;
    columnsMetaData: ColumnsMetaData
    closePopup: () => void,
    okFunction: (columnsMetaData: ColumnsMetaData) => void;

}

/**
 * @description This Add Remove Columns component is used only for preact based containers only. Uses Custom popup
 */
export const AddRemoveColumnsPopup = (props: AddRemoveColumnsPopupProps) => {
    const { show, closePopup, okFunction, columnsMetaData } = props;
    const { addedColumns, columnsToBeAdded } = columnsMetaData;
    const setColumns = (metadata: MetaData) => {
        okFunction({ addedColumns: metadata.selectedAttributes, columnsToBeAdded: metadata.availableAttributes });
    }
    return <AddRemovePopup
        metadata={{ selectedAttributes: addedColumns, availableAttributes: columnsToBeAdded }}
        show={show}
        closePopup={closePopup}
        okFunction={setColumns}
    />
}