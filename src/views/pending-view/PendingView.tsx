import { useStore } from "../../modules/store";
import { ActionBar, ActionBarElement, Action } from "../../common/action-bar/ActionBar";
import { useState, useEffect } from 'react';
import { ReorderColumnsPopup } from "../../common/reorder-columns/ReorderColumns";
import { AddRemoveColumnsPopup } from "../../common/add-remove/AddRemoveColumns";
import { DataTable } from "../../common/data-table/DataTable";
import { getReadonlyTemplates } from "../../utils/render";
import { PendingTemplates } from "../../modules/pending/pendingService";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

interface Props {
    isApprovals: boolean
}

enum Hooks {
    ReorderColumns = 'reorderColumnsHook',
    AddRemoveColumns = 'addRemoveColumnsHook',
    OpenConfirmation = 'openConfirmationHook'
}

export const PendingView = (props: Props) => {
    const { isApprovals } = props;
    const { pendingStore } = useStore();
    const { loadingData, loadPendingData, pendingDeclarations, columns, reorderColumns, addRemoveColumns } = pendingStore;
    const [dataProvider, setDataProvier] = useState(new MutableArrayDataProvider(pendingDeclarations, { keyAttributes: "id" }));

    const [popupHooks, setPopupHooks] = useState({
        [Hooks.AddRemoveColumns]: false,
        [Hooks.ReorderColumns]: false,
        [Hooks.OpenConfirmation]: false
    });

    useEffect(() => {
        loadPendingData(isApprovals);
    }, [isApprovals, loadPendingData]);

    const openPopup = (hook: Hooks) => { setPopupHooks({ ...popupHooks, [hook]: true }); };
    const closePopup = (hook: Hooks) => { setPopupHooks({ ...popupHooks, [hook]: false }) };

    const exportData = () => {
        console.log("Exporting data");
    }

    const refreshData = () => {
        console.log('refreshing data');
    }

    const deleteSelected = () => {
        console.log('deleting')
    }


    const actions: ActionBarElement[] = [
        { type: Action.Export, action: exportData },
        { type: Action.ReorderColumns, action: () => openPopup(Hooks.ReorderColumns), hasStartSeperator: true },
        { type: Action.AddColumn, action: () => openPopup(Hooks.AddRemoveColumns) },
        { type: Action.Refresh, action: refreshData, hasStartSeperator: true },
        { type: Action.Delete, action: deleteSelected }
    ]

    return (
        <div class='oj-sm-margin-4x-verticle oj-sm-margin-8x-horizontal'>
            <h4>Pending {isApprovals ? 'Approvals' : 'Requests'}</h4>
            <div class='oj-panel oj-sm-margin-2x'>
                <ActionBar actions={actions} />
                <DataTable
                    tableColumns={columns.addedColumns}
                    templates={getReadonlyTemplates(Object.values(PendingTemplates))}
                    tableDataProvider={dataProvider}
                />
            </div>
            <ReorderColumnsPopup
                showPopup={popupHooks[Hooks.ReorderColumns]}
                closePopup={() => closePopup(Hooks.ReorderColumns)}
                columns={columns.addedColumns}
                reorderAction={reorderColumns}
            />
            <AddRemoveColumnsPopup
                show={popupHooks[Hooks.AddRemoveColumns]}
                closePopup={() => closePopup(Hooks.AddRemoveColumns)}
                columnsMetaData={columns}
                okFunction={addRemoveColumns}
            />
        </div>
    )
}