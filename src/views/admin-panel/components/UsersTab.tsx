import { observer } from "mobx-react-lite";
import { useEffect } from 'react';
import { Action, ActionBar, ActionBarElement } from "../../../common/action-bar/ActionBar";
import { AddRemoveColumnsPopup } from "../../../common/add-remove/AddRemoveColumns";
import { DataTable } from "../../../common/data-table/DataTable";
import { Popup } from "../../../common/popup/Popup";
import { ReorderColumnsPopup } from "../../../common/reorder-columns/ReorderColumns";
import { TableRowSkeleton } from "../../../components/skeleton/Skeleton";
import { Icons } from "../../../constants/iconsData";
import { tableTemplates } from "../../../constants/templates";
import { useAdminPanelStore } from "../../../modules/admin-panel/adminPanelStore";
import { getReadonlyTemplates } from "../../../utils/render";


export const UsersTab = observer(() => {
    const { userStore } = useAdminPanelStore();
    const { loadUserData, openPopup, closePopup, reorderColumns, addRemoveColumns, rowChangedHandler, setFilter } = userStore;
    const { usersDp, isLoading, popupHooks, columns, isRowSelected } = userStore;

    useEffect(() => {
        loadUserData();
    }, [loadUserData]);

    const actions: ActionBarElement[] = [
        { type: Action.ReorderColumns, action: () => openPopup("reorder") },
        { type: Action.AddColumn, action: () => openPopup("addRemove") },
        { type: Action.Create, title: "Create User", action: () => { }, icon: Icons.blockIcons.createNew, hasStartSeperator: true, inActionMenu: { present: true, showIcon: true } },
        { type: Action.Update, title: "Update User", disable: !isRowSelected, action: () => { }, icon: Icons.icons.updateUser, inActionMenu: { present: true, showIcon: true } },
        { type: Action.Reset, title: "Reset Password", disable: !isRowSelected, action: () => openPopup("resetPassword"), icon: Icons.icons.resetPassword, inActionMenu: { present: true, showIcon: true } },
    ]

    return (
        <>
            <div class="oj-sm-margin-2x">
                <h5 class="left-pad">Users</h5>
                <div>
                    <ActionBar
                        actions={actions}
                        filterHandler={setFilter}
                    />
                    <div className={'oj-sm-margin-2x-top'}>
                        {isLoading ? <TableRowSkeleton count={8} /> :
                            <DataTable
                                tableColumns={columns.addedColumns}
                                tableDataProvider={usersDp}
                                templates={getReadonlyTemplates(Object.values(tableTemplates.ADMIN_PANEL.USERS))}
                                rowChangedHandler={rowChangedHandler}
                                height={550}
                            />}
                    </div>
                </div>
                <ReorderColumnsPopup
                    showPopup={popupHooks.reorder}
                    closePopup={() => closePopup("reorder")}
                    columns={columns.addedColumns}
                    reorderAction={reorderColumns}
                />
                <AddRemoveColumnsPopup
                    show={popupHooks.addRemove}
                    closePopup={() => closePopup("addRemove")}
                    columnsMetaData={columns}
                    okFunction={addRemoveColumns}
                />
                <ResetPassword />
            </div>
        </>

    )
});

const ResetPassword = observer(() => {
    const { userStore: { popupHooks, closePopup, selectedUser, resetPassword } } = useAdminPanelStore();

    const resetAction = () => {
        closePopup("resetPassword");
        resetPassword();
    }

    const body = () => {
        return <div><p>This will reset the password for <b>{selectedUser?.name}</b> and send the new one
            to <b>{selectedUser?.email}</b>. Do you wish to continue?</p></div>
    }
    const footer = () => {
        return (
            <>
                <oj-button onojAction={resetAction}>Reset</oj-button>
                <oj-button onojAction={() => closePopup("resetPassword")}>Cancel</oj-button>
            </>
        )
    }
    return <Popup show={popupHooks.resetPassword} popupTitle={"Reset Password"} body={body} footer={footer} ></Popup>
});