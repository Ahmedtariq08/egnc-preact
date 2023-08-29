import { observer } from "mobx-react-lite";
import { ActionBar, ActionBarElement, Action } from "../../../common/action-bar/ActionBar";
import { Icons } from "../../../constants/iconsData";
import { useEffect } from 'react';
import { useAdminPanelStore } from "../../../modules/admin-panel/adminPanelStore";
import { ReorderColumnsPopup } from "../../../common/reorder-columns/ReorderColumns";
import { AddRemoveColumnsPopup } from "../../../common/add-remove/AddRemoveColumns";

export const UsersTab = observer(() => {
    const { userStore } = useAdminPanelStore();
    const { loadUserData, isLoading, popupHooks, openPopup, closePopup, columns,
        reorderColumns, addRemoveColumns } = userStore;

    useEffect(() => {
        loadUserData();
    }, [loadUserData]);

    const actions: ActionBarElement[] = [
        { type: Action.ReorderColumns, action: () => openPopup("reorder") },
        { type: Action.AddColumn, action: () => openPopup("addRemove") },
        { type: Action.Create, title: "Create User", action: () => { }, icon: Icons.blockIcons.createNew, hasStartSeperator: true, inActionMenu: { present: true, showIcon: true } },
        { type: Action.Update, title: "Update User", action: () => { }, icon: Icons.icons.updateUser, inActionMenu: { present: true, showIcon: true } },
        { type: Action.Reset, title: "Reset Password", action: () => { }, icon: Icons.icons.resetPassword, inActionMenu: { present: true, showIcon: true } },
    ]

    const displayFilter = (value: string) => {
        console.log(value);
    }

    return (
        <>
            <div class="oj-sm-margin-2x">
                <h5 class="left-pad">Users</h5>
                <div>
                    <ActionBar actions={actions} filterHandler={displayFilter} />

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
            </div>
        </>

    )

});