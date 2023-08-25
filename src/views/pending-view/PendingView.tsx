import { observer } from "mobx-react-lite";
import { useEffect, useState } from 'react';
import Skeleton from "react-loading-skeleton";
import { Action, ActionBar, ActionBarElement } from "../../common/action-bar/ActionBar";
import { AddRemoveColumnsPopup } from "../../common/add-remove/AddRemoveColumns";
import { DataTable } from "../../common/data-table/DataTable";
import { ReorderColumnsPopup } from "../../common/reorder-columns/ReorderColumns";
import { Declaration } from "../../models/categories/declaration";
import { PendingTemplates } from "../../modules/pending/pendingService";
import { useStore } from "../../modules/store";
import { Pages, getRedirectionPath, navigateToPath } from "../../routes/redirection";
import { getReadonlyTemplates } from "../../utils/render";
import { CustomConfirmationPopup } from "../../common/confirmation-popup/ConfirmationPopup";

interface Props {
    isApprovals: boolean
}

enum Hooks {
    ReorderColumns = 'reorderColumnsHook',
    AddRemoveColumns = 'addRemoveColumnsHook',
    OpenConfirmation = 'openConfirmationHook'
}

export const PendingView = observer((props: Props) => {
    const { isApprovals } = props;
    const { pendingStore } = useStore();
    const { loadingData, loadPendingData, withdrawRequest, columns,
        reorderColumns, addRemoveColumns, dataProvider } = pendingStore;

    const [selectedDeclaration, setSelectedDeclaration] = useState<Declaration>();

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

    const deleteSelected = () => {
        if (selectedDeclaration) {
            withdrawRequest(selectedDeclaration.id);
        }
    }


    const getActions = (): ActionBarElement[] => {
        const baseActions: ActionBarElement[] = [
            { type: Action.Export, action: exportData },
            { type: Action.ReorderColumns, action: () => openPopup(Hooks.ReorderColumns), hasStartSeperator: true },
            { type: Action.AddColumn, action: () => openPopup(Hooks.AddRemoveColumns) },
            { type: Action.Refresh, action: () => loadPendingData(isApprovals), hasStartSeperator: true },
        ];
        return isApprovals ? baseActions : [...baseActions,
        { type: Action.Delete, action: () => openPopup(Hooks.OpenConfirmation), disable: selectedDeclaration === undefined }];
    }

    //ANCHOR - Table
    const getTemplates = () => {
        const { requestId, ...readonlyTemplates } = PendingTemplates
        const idTemplate = <template slot={requestId} render={(data) => {
            const row = data.item.data as Declaration;
            return <a onClick={() => navigateToPath(Pages.Declaration, { id: row.id })}
                href={getRedirectionPath(Pages.Declaration, { id: row.id })}
                class="oj-link-standalone">
                <label>{row.id}</label>
            </a>
        }} />;
        const readOnlyTemplates = getReadonlyTemplates(Object.values(readonlyTemplates));
        return [idTemplate, ...readOnlyTemplates];
    }

    const rowChangeHandler = (event: any) => {
        const { key, data } = event.detail.value;
        if (data) {
            setSelectedDeclaration(data as Declaration);
        }
    }

    return (
        <div style={{ margin: '1rem 0rem' }}>
            <h4>Pending {isApprovals ? 'Approvals' : 'Requests'}</h4>
            <div class='oj-panel oj-sm-margin-2x'>
                <ActionBar
                    actions={getActions()}
                />

                {loadingData ?
                    <Skeleton count={15} height={35} style={{ margin: '4px 0' }} /> :
                    <DataTable
                        tableColumns={columns.addedColumns}
                        templates={getTemplates()}
                        tableDataProvider={dataProvider}
                        rowChangedHandler={rowChangeHandler}
                    />}
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
            <CustomConfirmationPopup
                show={popupHooks[Hooks.OpenConfirmation]}
                closePopup={() => closePopup(Hooks.OpenConfirmation)}
                message="Are you sure you want to withdraw this request?"
                okAction={deleteSelected}
            />
        </div>
    )
});


const WithdrawConfirmation = (props: { declaration: Declaration }) => {
    const { declaration } = props;


}