import { observer } from "mobx-react-lite";
import { ActionBar, ActionBarElement, Action } from "../../../common/action-bar/ActionBar";
import { Icons } from "../../../constants/iconsData";
import { useEffect, useState } from 'react';
import { useAdminPanelStore } from "../../../modules/admin-panel/adminPanelStore";
import { ReorderColumnsPopup } from "../../../common/reorder-columns/ReorderColumns";
import { AddRemoveColumnsPopup } from "../../../common/add-remove/AddRemoveColumns";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import ListDataProviderView = require("ojs/ojlistdataproviderview");
import { Constants } from "../../../constants/constants";
import { FilterFactory } from "ojs/ojdataprovider";
import { sortDataWithDates } from "../../../utils/dateUtils";
import { DataTable } from "../../../common/data-table/DataTable";
import { tableTemplates } from "../../../constants/templates";
import { getReadonlyTemplates } from "../../../utils/render";
import { TableRowSkeleton } from "../../../components/skeleton/Skeleton";

const CONSTANTS = {
    CREATE_USER: "Create User",
    UPDATE_USER: "Update User",
    RESET_PASSWORD: "Reset Password",
    TABLE_TEXT: Constants.MESSAGES.NO_DATA,
    KEYATTR_USERS: 'id',
    RESETMODAL_ID: "resetPasswordModal",
    SORT_KEY1: 'lastModifiedDate',
    SORT_KEY2: 'createdDate',
}

export const UsersTab = observer(() => {
    const { userStore } = useAdminPanelStore();
    const { loadUserData, openPopup, closePopup, reorderColumns, addRemoveColumns, rowChangedHandler, isRowSelected } = userStore;
    const { users, isLoading, popupHooks, columns } = userStore;

    const [usersDP, setUsersDP] = useState(new ArrayDataProvider(users, { keyAttributes: CONSTANTS.KEYATTR_USERS }));

    useEffect(() => {
        loadUserData();
    }, [loadUserData]);

    useEffect(() => {
        sortDataWithDates(users, CONSTANTS.SORT_KEY1, CONSTANTS.SORT_KEY2);
        applyFilterCriterion('');
    }, [users]);

    const actions: ActionBarElement[] = [
        { type: Action.ReorderColumns, action: () => openPopup("reorder") },
        { type: Action.AddColumn, action: () => openPopup("addRemove") },
        { type: Action.Create, title: CONSTANTS.CREATE_USER, action: () => { }, icon: Icons.blockIcons.createNew, hasStartSeperator: true, inActionMenu: { present: true, showIcon: true } },
        { type: Action.Update, title: CONSTANTS.UPDATE_USER, disable: !isRowSelected, action: () => { }, icon: Icons.icons.updateUser, inActionMenu: { present: true, showIcon: true } },
        { type: Action.Reset, title: CONSTANTS.RESET_PASSWORD, disable: !isRowSelected, action: () => { }, icon: Icons.icons.resetPassword, inActionMenu: { present: true, showIcon: true } },
    ]

    const applyFilterCriterion = (filter: string) => {
        let filterCriterion = (filter) ? FilterFactory.getFilter({ filterDef: { text: filter } }) : undefined;
        const arrayDataProvider = new ArrayDataProvider(users, { keyAttributes: CONSTANTS.KEYATTR_USERS });
        setUsersDP(new ListDataProviderView(arrayDataProvider, { filterCriterion: filterCriterion }));
    };

    return (
        <>
            <div class="oj-sm-margin-2x">
                <h5 class="left-pad">Users</h5>
                <div>
                    <ActionBar actions={actions} filterHandler={applyFilterCriterion} />
                    <div className={'oj-sm-margin-2x-top'}>
                        {isLoading ? <TableRowSkeleton count={8} /> :
                            <DataTable
                                tableColumns={columns.addedColumns}
                                tableDataProvider={usersDP}
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
            </div>
        </>

    )

});