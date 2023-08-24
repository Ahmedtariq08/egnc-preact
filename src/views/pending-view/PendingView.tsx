import { observer } from "mobx-react-lite";
import { useEffect, useState } from 'react';
import { Action, ActionBar, ActionBarElement } from "../../common/action-bar/ActionBar";
import { AddRemoveColumnsPopup } from "../../common/add-remove/AddRemoveColumns";
import { DataTable } from "../../common/data-table/DataTable";
import { LoaderCircle } from "../../common/loader/LoaderCircle";
import { ReorderColumnsPopup } from "../../common/reorder-columns/ReorderColumns";
import { PendingTemplates } from "../../modules/pending/pendingService";
import { useStore } from "../../modules/store";
import { getReadonlyTemplates } from "../../utils/render";
import { Declaration } from "../../models/categories/declaration";
import { Paths, getRedirectionPath, navigateToPath } from "../../routes/redirection";
import Skeleton from "react-loading-skeleton";

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
    const { loadingData, loadPendingData, pendingDeclarations, columns,
        reorderColumns, addRemoveColumns, dataProvider } = pendingStore;

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
        console.log('deleting')
    }


    const actions: ActionBarElement[] = [
        { type: Action.Export, action: exportData },
        { type: Action.ReorderColumns, action: () => openPopup(Hooks.ReorderColumns), hasStartSeperator: true },
        { type: Action.AddColumn, action: () => openPopup(Hooks.AddRemoveColumns) },
        { type: Action.Refresh, action: () => loadPendingData(isApprovals), hasStartSeperator: true },
        { type: Action.Delete, action: deleteSelected }
    ]

    const getTemplates = () => {
        const { requestId, ...readonlyTemplates } = PendingTemplates
        const idTemplate = <template slot={requestId} render={(data) => {
            const row = data.item.data as Declaration;
            return <a onClick={() => navigateToPath(Paths.Declaration, { id: row.id })}
                href={getRedirectionPath(Paths.Declaration, { id: row.id })}
                class="oj-link-standalone">
                <label>{row.id}</label>
            </a>
        }} />;
        const readOnlyTemplates = getReadonlyTemplates(Object.values(readonlyTemplates));
        return [idTemplate, ...readOnlyTemplates];
    }

    return (
        <div style={{ margin: '2rem 4rem' }}>
            <h4>Pending {isApprovals ? 'Approvals' : 'Requests'}</h4>
            <div class='oj-panel oj-sm-margin-2x'>
                <ActionBar
                    actions={actions}
                />

                {loadingData ?
                    <Skeleton count={15} height={35} style={{ margin: '4px 0' }} /> :
                    <DataTable
                        tableColumns={columns.addedColumns}
                        templates={getTemplates()}
                        tableDataProvider={dataProvider}
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
        </div>
    )
})