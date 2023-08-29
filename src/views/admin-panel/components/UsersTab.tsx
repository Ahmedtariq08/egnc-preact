import { observer } from "mobx-react-lite";
import { ActionBar, ActionBarElement, Action } from "../../../common/action-bar/ActionBar";
import { Icons } from "../../../constants/iconsData";
import { useEffect } from 'react';
import { useAdminPanelStore } from "../../../modules/admin-panel/adminPanelStore";

export const UsersTab = observer(() => {
    const { userStore: { loadUserData, isLoading } } = useAdminPanelStore();

    useEffect(() => {
        loadUserData();
    }, [loadUserData]);

    const actions: ActionBarElement[] = [
        { type: Action.ReorderColumns, action: () => { } },
        { type: Action.AddColumn, action: () => { } },
        {
            type: Action.Create, title: "Create User", action: () => { }, icon: Icons.blockIcons.createNew,
            hasStartSeperator: true, inActionMenu: { present: true, showIcon: true }
        },
        {
            type: Action.Update, title: "Update User", action: () => { }, icon: Icons.icons.updateUser,
            inActionMenu: { present: true, showIcon: true }
        },
        {
            type: Action.Reset, title: "Reset Password", action: () => { }, icon: Icons.icons.resetPassword,
            inActionMenu: { present: true, showIcon: true }
        },
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
            </div>
        </>

    )

});